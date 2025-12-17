// @ts-types="@types/markdown-it"
import MarkdownIt from "markdown-it";
// @ts-types="@types/prismjs"
import Prism from "prismjs";

// Prism language components (side-effect imports, no types needed)
// @ts-types="@types/prismjs"
import "prismjs/components/prism-jsx.js";
// @ts-types="@types/prismjs"
import "prismjs/components/prism-typescript.js";
// @ts-types="@types/prismjs"
import "prismjs/components/prism-tsx.js";
// @ts-types="@types/prismjs"
import "prismjs/components/prism-diff.js";
// @ts-types="@types/prismjs"
import "prismjs/components/prism-json.js";
// @ts-types="@types/prismjs"
import "prismjs/components/prism-bash.js";
// @ts-types="@types/prismjs"
import "prismjs/components/prism-yaml.js";

// Types -----------------------------------------------------------------------

type RenderOptions = Readonly<{
  proxyAssets?: boolean;
}>;

// Constants -------------------------------------------------------------------

const ALLOWED_URL_PROTOCOLS = ["http:", "https:", "mailto:"];
const ASSETS_ORIGIN = "https://assets.gmaltez.dev/";
const ASSETS_PROXY_PATH = "/api/assets/";

// Module ----------------------------------------------------------------------

export const Markdown = {
  render,
};

// Renderer Setup --------------------------------------------------------------

function createRenderer() {
  const md = new MarkdownIt({
    html: false, // Disable raw HTML for security
    linkify: true, // Auto-convert URLs to links
    typographer: true, // Smart quotes and dashes
    highlight: highlightCode,
  });

  // Custom rules - type assertions needed due to markdown-it's complex internal types
  // deno-lint-ignore no-explicit-any
  md.renderer.rules.heading_open = renderHeadingOpen as any;
  // deno-lint-ignore no-explicit-any
  md.renderer.rules.heading_close = renderHeadingClose as any;
  // deno-lint-ignore no-explicit-any
  md.renderer.rules.link_open = renderLinkOpen as any;

  return md;
}

const renderer = createRenderer();

// Main Render Function --------------------------------------------------------

function render(content: string, options: RenderOptions = {}): string {
  const { proxyAssets = false } = options;

  let html = renderer.render(content);

  // Process images with optional asset proxying
  html = processImages(html, proxyAssets);

  // Add Tailwind classes to elements
  html = addTailwindClasses(html);

  return html;
}

// Code Highlighting -----------------------------------------------------------

function highlightCode(code: string, lang: string): string {
  // markdown-it wraps the result in <pre><code>, so we only return the inner content
  if (!lang) {
    return escapeHtml(code);
  }

  const language = lang.toLowerCase();
  const grammar = Prism.languages[language];

  if (!grammar) {
    return escapeHtml(code);
  }

  const highlighted = Prism.highlight(code, grammar, language);
  return addLineNumbers(highlighted);
}

function addLineNumbers(code: string): string {
  // Remove trailing newline that creates empty last line
  const trimmedCode = code.endsWith("\n") ? code.slice(0, -1) : code;
  const lines = trimmedCode.split("\n");
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNumber = i + 1;
    result.push(
      `<span class="code-line"><span class="line-number">${lineNumber}</span><span class="line-content">${
        lines[i]
      }</span></span>`,
    );
  }

  return result.join("");
}

// Header Rendering ------------------------------------------------------------

let currentHeadingText = "";

// Using 'unknown' for markdown-it internal types to avoid namespace issues
function renderHeadingOpen(
  tokens: unknown[],
  idx: number,
  options: unknown,
  _env: unknown,
  self: { renderToken: (t: unknown[], i: number, o: unknown) => string },
): string {
  const tokenList = tokens as Array<
    {
      type?: string;
      content?: string;
      attrSet?: (k: string, v: string) => void;
    }
  >;
  const token = tokenList[idx];
  const nextToken = tokenList[idx + 1];

  if (nextToken?.type === "inline" && nextToken.content) {
    currentHeadingText = nextToken.content;
    const slug = generateSlug(currentHeadingText);
    token.attrSet?.("id", slug);
  }

  return self.renderToken(tokens, idx, options);
}

function renderHeadingClose(
  tokens: unknown[],
  idx: number,
  _options: unknown,
  _env: unknown,
  _self: unknown,
): string {
  const tokenList = tokens as Array<
    { tag?: string; type?: string; content?: string }
  >;
  const token = tokenList[idx];
  const tag = token.tag;
  const slug = generateSlug(currentHeadingText);

  // Wrap heading content in anchor link
  const prevInline = tokenList[idx - 1];
  if (prevInline?.type === "inline") {
    prevInline.content = `<a href="#${slug}">${prevInline.content}</a>`;
  }

  currentHeadingText = "";
  return `</${tag}>`;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Link Rendering with URL Sanitization ----------------------------------------

function renderLinkOpen(
  tokens: unknown[],
  idx: number,
  options: unknown,
  _env: unknown,
  self: { renderToken: (t: unknown[], i: number, o: unknown) => string },
): string {
  const tokenList = tokens as Array<
    {
      attrIndex?: (k: string) => number;
      attrs?: [string, string][];
      attrSet?: (k: string, v: string) => void;
    }
  >;
  const token = tokenList[idx];
  const hrefIndex = token.attrIndex?.("href") ?? -1;

  if (hrefIndex >= 0) {
    const href = token.attrs?.[hrefIndex]?.[1] || "";

    if (!isUrlSafe(href)) {
      token.attrSet?.("href", "#");
    }
  }

  return self.renderToken(tokens, idx, options);
}

function isUrlSafe(url: string): boolean {
  // Allow relative URLs
  if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?")) {
    return true;
  }

  try {
    const parsed = new URL(url);
    return ALLOWED_URL_PROTOCOLS.includes(parsed.protocol);
  } catch {
    // If URL parsing fails, it might be a relative URL without leading slash
    // Only allow if it doesn't contain dangerous patterns
    const dangerous = ["javascript:", "data:", "vbscript:"];
    const lowerUrl = url.toLowerCase();
    for (const pattern of dangerous) {
      if (lowerUrl.includes(pattern)) {
        return false;
      }
    }
    return true;
  }
}

// Image Processing ------------------------------------------------------------

function processImages(html: string, proxyAssets: boolean): string {
  // Match img tags and process src attributes
  return html.replace(
    /<img\s+([^>]*?)src="([^"]*)"([^>]*?)>/gi,
    (_match, before, src, after) => {
      const safeSrc = isUrlSafe(src) ? src : "#";
      const proxiedSrc = proxyAssets
        ? safeSrc.replace(ASSETS_ORIGIN, ASSETS_PROXY_PATH)
        : safeSrc;

      return `<img ${before}src="${proxiedSrc}"${after} loading="lazy">`;
    },
  );
}

// Tailwind Class Injection ----------------------------------------------------

function addTailwindClasses(html: string): string {
  const classMap: Record<string, string> = {
    "<p>": '<p class="text-base sm:text-lg">',
    "<h1": '<h1 class="text-primary"',
    "<h2": '<h2 class="text-primary"',
    "<h3": '<h3 class="text-primary"',
    "<h4": '<h4 class="text-primary"',
    "<h5": '<h5 class="text-primary"',
    "<h6": '<h6 class="text-primary"',
    "<a ": '<a class="text-primary hover:underline" ',
    "<img ": '<img class="rounded-lg my-6 w-full" ',
    "<ul>": '<ul class="list-disc">',
    "<ol>": '<ol class="list-decimal">',
    "<blockquote>":
      '<blockquote class="border-l-4 border-primary pl-4 italic text-tertiary">',
  };

  let result = html;
  for (const [search, replace] of Object.entries(classMap)) {
    result = result.split(search).join(replace);
  }

  return result;
}

// Utilities -------------------------------------------------------------------

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
