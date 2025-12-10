export * from "./markdown.ts";

/**
 * Extracts a file's metadata and content from a string.
 * - The file's metadata is expected to be in YAML format.
 * - The file's content is expected to be in Markdown format.
 *
 * @example
 * const text = `---
 * title: Hello World
 * snippet: This is a snippet.
 * ---
 * # Hello World
 * This is a paragraph.`;
 * const { metadata, content } = extractTextMetadata(text);
 * console.log(metadata); // { title: 'Hello World', snippet: 'This is a snippet.' }
 * console.log(content); // '# Hello World\nThis is a paragraph.\n'
 *
 * @param text A string containing a file's content.
 * @returns An object containing the file's metadata and content.
 */
export function extractTextMetadataAndContent(text: string) {
  let content = "";
  const metadata: Record<string, string> = {};

  let isReadingMetadata = false;
  const lines = text.split("\n");
  let currentKey = "";

  for (const line of lines) {
    if (line === "---") {
      isReadingMetadata = !isReadingMetadata;
    } else if (isReadingMetadata) {
      const colonIndex = line.indexOf(": ");
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex);
        currentKey = key;
        metadata[currentKey] = line.slice(colonIndex + 2);
      } else if (currentKey) {
        metadata[currentKey] += "\n" + line;
      }
    } else {
      content += line + "\n";
    }
  }

  return { metadata, content };
}

/**
 * Retrieves the estimated reading time of a text.
 * - The average reading time is considered to be 200 words per minute.
 * @param text A string containing the text to be analyzed.
 * @returns The estimated reading time in minutes.
 */
export function getEstimatedReadingTime(text: string) {
  const numberOfWords = text.split(/\s/g).length;
  return Math.ceil(numberOfWords / 200);
}
