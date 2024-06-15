import Prism from 'prism';
import 'prism/components/prism-jsx.js?no-check';
import 'prism/components/prism-typescript.js?no-check';
import 'prism/components/prism-tsx.js?no-check';
import 'prism/components/prism-diff.js?no-check';
import 'prism/components/prism-json.js?no-check';
import 'prism/components/prism-bash.js?no-check';
import 'prism/components/prism-yaml.js?no-check';

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

  // Convert headings
  content = content.replace(/^# (.*$)/gim, (_, x) => parseHeader(x, 1));
  content = content.replace(/^## (.*$)/gim, (_, x) => parseHeader(x, 2));
  content = content.replace(/^### (.*$)/gim, (_, x) => parseHeader(x, 3));
  content = content.replace(/^#### (.*$)/gim, (_, x) => parseHeader(x, 4));
  content = content.replace(/^##### (.*$)/gim, (_, x) => parseHeader(x, 5));
  content = content.replace(/^###### (.*$)/gim, (_, x) => parseHeader(x, 6));

  // Remove empty lines
  content = content.replace(/^\s*[\r\n]/gm, '');

  // Convert paragraphs
  content = content.replace(/^(?!<.*?>)((?:.|\n)*?)(?=\n|$)/gim, (_, x) =>
    x.match(/\uFFFFCODE_BLOCK_(\d+)\uFFFF/g)
      ? x
      : `<p class="text-base sm:text-lg text-text-primary opacity-90">${x}</p>`
  );

  // Convert unordered lists
  content = content.replace(/^\s*[-+*]\s+(.*)/gim, '<li>$1</li>');
  content = content.replace(/<\/li>\n<li>/gim, '</li><li>');
  content = content.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

  // Convert ordered lists
  content = content.replace(/^\s*\d+\.\s+(.*)/gim, '<li>$1</li>');
  content = content.replace(/<\/li>\n<li>/gim, '</li><li>');
  content = content.replace(/(<li>.*<\/li>)/gim, '<ol>$1</ol>');

  // Convert inline code
  content = content.replace(/`(.*?)`/gim, '<code>$1</code>');

  // Convert bold text
  content = content.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Convert italic text
  content = content.replace(/\*(.*?)\*/gim, '<em>$1</em>');

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
    .replace(/<script[^>]*>([\S\s]*?)<\/script>/gi, '')
    .replace(/<style[^>]*>([\S\s]*?)<\/style>/gi, '')
    .replace(/<iframe[^>]*>([\S\s]*?)<\/iframe>/gi, '')
    .replace(/<object[^>]*>([\S\s]*?)<\/object>/gi, '')
    .replace(/<embed[^>]*>([\S\s]*?)<\/embed>/gi, '')
    .replace(/<applet[^>]*>([\S\s]*?)<\/applet>/gi, '')
    .replace(/<meta[^>]*>([\S\s]*?)<\/meta>/gi, '')
    .replace(/<link[^>]*>([\S\s]*?)<\/link>/gi, '')
    .replace(/<base[^>]*>([\S\s]*?)<\/base>/gi, '')
    .replace(/<form[^>]*>([\S\s]*?)<\/form>/gi, '');
}

// Header Parsing --------------------------------------------------------------

function parseHeader(text: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
  const slug = generateSlug(text);
  return `<h${level} id="${slug}"><a href="#${slug}">${text}</a></h${level}>`;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
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
  const language = code.split('\n')[0].replace('```', '').trim();
  code = code.replace(language, '');

  if (!Prism.languages[language])
    return `NO SYNTAX HIGHLIGHTING CONFIGURED FOR ${language}`;

  return Prism.highlight(code, Prism.languages[language], language);
}

function insertLineNumbers(code: string) {
  return code
    .split('\n')
    .filter((_, index) => index !== 0 || _.trim() !== '')
    .map(
      (line, index) => `<span class="line-number" >${index + 1}</span>${line}`
    )
    .join('\n');
}
