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
  let content = '';
  const metadata: Record<string, string> = {};

  let isReadingMetadata = false;
  const lines = text.split('\n');

  for (const line of lines) {
    if (line === '---') {
      isReadingMetadata = !isReadingMetadata;
    } else if (isReadingMetadata) {
      const [key, value] = line.split(': ');
      metadata[key] = value;
    } else {
      content += line + '\n';
    }
  }
  return { metadata, content };
}