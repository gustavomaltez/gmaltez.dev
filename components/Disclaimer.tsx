type Props = {
  title: string;
  content: string;
  className?: string;
  variation?: 'red' | 'green';
};

export function Disclaimer(props: Props) {
  const { primary, secondary, tertiary } = getColors(props.variation);
  const className = props.className ?? '';
  return (
    <div className={`border-[${primary}] bg-[${secondary}] border p-4 shadow flex flex-col rounded-xl ${className}`}>
      <h2 className={`text-2xl font-bold text-[${primary}] mb-2 text-center`}>
        {props.title}
      </h2>
      <p className={`text-[${tertiary}] text-center`}>
        {props.content}
      </p>
    </div>
  );
}

const variations = {
  red: ['#ff3b6b', '#4b2f36', '#d997b1'],
  green: ['#00f5d4', '#2b3a34', '#b0dab9'],
};

function getColors(variation: 'red' | 'green' = 'red') {
  const [primary, secondary, tertiary] = variations[variation];
  return { primary, secondary, tertiary };
}