type TagProps = {
  tag: string;
};

export function Tag(props: TagProps) {
  return (
    <a
      aria-label={`Tag: ${props.tag}`}
      href={`/posts?tags=${props.tag}`}
      className={`rounded-md p-1 cursor-pointer text-[${getTagColor(props.tag)}]
      hover:opacity-90 transition-all duration-200`}
    >
      #{props.tag}
    </a>
  );
}

const tags: Record<string, string> = {
  'javascript': '#f7df1e',
  'typescript': '#007acc',
  'react': '#61dafb',
  'tailwindcss': '#06b6d4',
  'css': '#264de4',
  'html': '#e34f26',
  'nodejs': '#339933',
  'express': '#000000',
  'mongodb': '#47a248',
  'postgresql': '#336791',
  'mysql': '#4479a1',
  'sqlite': '#003b57',
  'git': '#f05032',
  'github': '#181717',
};

function getTagColor(tag: string) {
  const color = tags[tag.toLowerCase()];
  return color ?? getRandomHexColor(tag);
}

function getRandomHexColor(input: string) {
  const asciiInput = getAsciiArrayFromText(input);
  const generatedSeed = getNumericConstantFromAsciiArray(asciiInput);
  return `#${generatedSeed.toString(16).slice(0, 6)}`;
}

function getAsciiArrayFromText(text: string) {
  return text.split('').map(value => value.charCodeAt(0));
}

function getNumericConstantFromAsciiArray(array: number[]) {
  // In order to generate more distinct values, we need to use a higher power
  // of the ascii value. The higher the power, the more distinct the values.
  return array.reduce((acc, value) => acc + Math.pow(value, 10), 0);
}