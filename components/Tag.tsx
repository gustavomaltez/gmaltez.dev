export function Tag(props: { tag: string }) {
  return (
    <a
      aria-label={`Tag: ${props.tag}`}
      class='rounded-md p-1 cursor-pointer hover:opacity-90 transition-all duration-200'
      style={{ color: getTagColor(props.tag) }}
    >
      #{props.tag}
    </a>
  );
}

const COLORS = [
  '#f7df1e',
  '#007acc',
  '#61dafb',
  '#06b6d4',
  '#264de4',
  '#e34f26',
  '#339933',
  '#ffffff',
  '#ff5722',
  '#ff9800',
  '#8bc34a',
  '#ffeb3b',
  '#4caf50',
  '#9c27b0',
  '#03a9f4',
  '#673ab7',
  '#e91e63',
  '#cddc39',
  '#00bcd4',
  '#ff4081',
  '#3f51b5',
  '#ffb300',
  '#00e676',
  '#d500f9',
  '#ff6d00',
  '#795548',
  '#ffc107',
  '#1de9b6',
  '#8e24aa',
  '#aa00ff',
] as const;

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++)
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}
