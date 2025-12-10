// @ts-types="@types/prismjs"
import Prism from "prismjs";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-diff.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-yaml.js";

// Module ----------------------------------------------------------------------

export const Markdown = {
  render,
};

// Methods ---------------------------------------------------------------------

/**
 * Renders a Markdown string into HTML.
 * @param content The Markdown string to be rendered.
 * @returns The HTML representation of the Markdown string.
 */
function render(content: string) {
  // Replace code blocks with placeholders
  const { output, blocks } = preProcessCodeBlocks(content);
  content = output;
  content = content.replace(
    /^(#+)\s*(.*?)$/gm,
    (_, hashes, text) => parseHeader(text, hashes.length),
  );

  // Split content into paragraphs
  content = content
    .split(/\n\s*\n/g)
    .filter((p) => p.trim() !== "")
    .map((paragraph) => {
      if (
        paragraph.match(/\uFFFFCODE_BLOCK_(\d+)\uFFFF/g) ||
        paragraph.match(/<h[1-6].*?<\/h[1-6]>/g) ||
        paragraph.trim().length === 0
      ) {
        return paragraph;
      }
      return `<p class="text-base sm:text-lg text-text-secondary">${paragraph.trim()}</p>`;
    })
    .join("");

  // Convert unordered lists
  content = content.replace(/^\s*[-+*]\s+(.*)/gim, "<li>$1</li>");
  content = content.replace(/<\/li>\n<li>/gim, "</li><li>");
  content = content.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

  // Convert ordered lists
  content = content.replace(/^\s*\d+\.\s+(.*)/gim, "<li>$1</li>");
  content = content.replace(/<\/li>\n<li>/gim, "</li><li>");
  content = content.replace(/(<li>.*<\/li>)/gim, "<ol>$1</ol>");

  // Convert inline code
  content = content.replace(/`(.*?)`/gim, "<code>$1</code>");

  // Convert links
  content = content.replace(
    /\[([^\]]+)]\(([^)]+)\)/gim,
    '<a href="$2" class="text-primary hover:underline">$1</a>',
  );

  // Convert bold text
  content = content.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");

  // Convert italic text
  content = content.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // Replace code block placeholders with actual code blocks
  content = content.replace(/\uFFFFCODE_BLOCK_(\d+)\uFFFF/g, (_, index) => {
    const codeBlock = blocks[parseInt(index)];
    return `<pre>${codeBlock}</pre>`;
  });

  return sanitize(content);
}

// Sanitization ----------------------------------------------------------------

function sanitize(text: string) {
  return text
    .replace(/<script[^>]*>([\S\s]*?)<\/script>/gi, "")
    .replace(/<style[^>]*>([\S\s]*?)<\/style>/gi, "")
    .replace(/<iframe[^>]*>([\S\s]*?)<\/iframe>/gi, "")
    .replace(/<object[^>]*>([\S\s]*?)<\/object>/gi, "")
    .replace(/<embed[^>]*>([\S\s]*?)<\/embed>/gi, "")
    .replace(/<applet[^>]*>([\S\s]*?)<\/applet>/gi, "")
    .replace(/<meta[^>]*>([\S\s]*?)<\/meta>/gi, "")
    .replace(/<link[^>]*>([\S\s]*?)<\/link>/gi, "")
    .replace(/<base[^>]*>([\S\s]*?)<\/base>/gi, "")
    .replace(/<form[^>]*>([\S\s]*?)<\/form>/gi, "");
}

// Header Parsing --------------------------------------------------------------

function parseHeader(text: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
  const slug = generateSlug(text);
  return `<h${level} id="${slug}" class="text-text-primary"><a href="#${slug}">${text}</a></h${level}>`;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Code Parsing ----------------------------------------------------------------

function preProcessCodeBlocks(text: string) {
  const blocks: string[] = [];
  const output = text.replace(/```\s*([\s\S]*?)\s*```/gim, (_, block) => {
    blocks.push(insertLineNumbers(syntaxHighlight(block)));
    return `\uFFFFCODE_BLOCK_${blocks.length - 1}\uFFFF`;
  });
  return { output, blocks };
}

function syntaxHighlight(code: string) {
  const language = code.split("\n")[0].replace("```", "").trim();
  code = code.replace(language, "");

  if (!Prism.languages[language]) {
    return `NO SYNTAX HIGHLIGHTING CONFIGURED FOR ${language}`;
  }

  return Prism.highlight(code, Prism.languages[language], language);
}

function insertLineNumbers(code: string) {
  return code
    .split("\n")
    .filter((_, index) => index !== 0 || _.trim() !== "")
    .map(
      (line, index) => `<span class="line-number" >${index + 1}</span>${line}`,
    )
    .join("\n");
}
