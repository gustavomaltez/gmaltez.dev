type Props = {
  content: string;
  author: {
    name: string;
    image: string;
  };
};

export function Comment(props: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-2'>
        <img
          className='rounded-md h-10 w-10'
          src={props.author.image}
          alt='Profile picture'
        />
        <div className='flex flex-col'>
          <p className='text-text-primary font-bold text-sm'>
            {props.author.name}
          </p>
          <p
            className='text-text-secondary text-xs flex flex-row items-center 
            justify-start gap-2'
          >
            <div className='w-1.5 h-1.5 rounded-full bg-text-tertiary' />
            7 days ago
          </p>
        </div>
      </div>
      <p className='text-text-primary'>{props.content}</p>
    </div>
  );
}