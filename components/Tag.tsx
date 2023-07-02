type TagProps = {
  tag: string;
};

export function Tag(props: TagProps) {
  const { backgroundColor, textColor } = getTagColors(props.tag);
  return (
    <a
      className={`rounded-md px-2 cursor-pointer text-[${textColor}] bg-[${backgroundColor}] `}
      href={`/blog/tags/${props.tag}`}
    >
      {props.tag}
    </a>
  );
}

const tags: Record<string, [string, string]> = {
  'javascript': ['#f7df1e', '#000000'],
  'typescript': ['#007acc', '#ffffff'],
  'react': ['#61dafb', '#000000'],
  'tailwindcss': ['#06b6d4', '#ffffff'],
  'css': ['#264de4', '#ffffff'],
  'html': ['#e34f26', '#ffffff'],
  'nodejs': ['#339933', '#ffffff'],
  'express': ['#000000', '#ffffff'],
  'mongodb': ['#47a248', '#ffffff'],
  'postgresql': ['#336791', '#ffffff'],
  'mysql': ['#4479a1', '#ffffff'],
  'sqlite': ['#003b57', '#ffffff'],
  'git': ['#f05032', '#ffffff'],
  'github': ['#181717', '#ffffff'],
};

function getTagColors(tag: string) {
  const color = tags[tag.toLowerCase()];
  if (color) return { backgroundColor: color[0], textColor: color[1] };
  else return { backgroundColor: getRandomHexColor(tag), textColor: '#ffffff' };
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