import { useEffect, useRef, useState } from 'preact/hooks';

type Release = {
  date: string;
  version: string;
  changes: string[];
  description: string;
};

export default function Changelog(props: { items: Release[]; }) {
  return (
    <ul className='flex flex-col my-4'>
      {props.items.map((item, index) => (
        <Release
          {...item}
          index={index}
          key={item.version}
          isLast={index === props.items.length - 1}
        />
      ))}
    </ul>
  );
}

// Internal Sub-Components -----------------------------------------------------

function Release(data: Release & { index: number; isLast: boolean; }) {
  const { size, ref } = useResponsiveListSize();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className='relative flex flex-col items-start'>
      <DotTimeline isLast={data.isLast} index={data.index} />
      <div
        className='ml-5 -mt-[1.31rem] py-3 flex flex-col items-start transition-all 
        duration-500'
      >
        <h2 className='text-xl font-bold flex items-center'>
          {data.version}
          <span className='text-text-secondary ml-2 font-normal text-sm mt-0.5'>
            ({Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(data.date))})
          </span>
        </h2>
        <p>{data.description}</p>
        <ul
          ref={ref}
          className='flex flex-col transition-all'
          onAnimationEnd={e => e.currentTarget.style.transitionDuration = '0ms'}
          style={{
            opacity: isExpanded ? 1 : 0,
            height: `${isExpanded ? size : 0}px`,
            transitionDuration: `${(data.changes.length * 200)}ms`,
          }}
        >
          {data.changes.map((change, index) => (
            <li
              key={change}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
              onAnimationEnd={e => e.currentTarget.classList.remove('opacity-0')}
              className={`text-text-secondary opacity-0 ${isExpanded ? 'swipe' : ''}`}
            >
              - {change}
            </li>
          ))}
        </ul>
        <button
          hidden={isExpanded}
          onClick={() => setIsExpanded(true)}
          className={`text-primary font-bold transition-all duration-500 
          ${isExpanded ? 'opacity-0' : 'opacity-100'} cursor-pointer z-10`}
        >
          View changes
        </button>
      </div>
    </li>
  );
}

function DotTimeline(props: { isLast: boolean; index: number; }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeouts = [setupDotAnimation(), setupTimelineAnimation()];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  function setupDotAnimation() {
    return setTimeout(() => {
      if (!dotRef.current) return;
      dotRef.current.classList.add('pulse');
      dotRef.current.classList.replace('bg-gray-500', 'bg-primary');
    }, ((props.index - 1) * 250) + 600);
  }

  function setupTimelineAnimation() {
    return setTimeout(() => {
      if (!timelineRef.current) return;
      timelineRef.current.style.height = `100%`;
    }, props.index * 250);
  }

  return (
    <>
      <div
        hidden={props.isLast}
        className='absolute top-0 left-[0.31rem] bottom-0 h-full w-0.5 bg-gray-500'
      />
      <div
        ref={timelineRef}
        hidden={props.isLast}
        className={`absolute top-0 left-[0.31rem] bottom-0 h-0 w-0.5 bg-primary
        transition-[height] duration-1000 ease-in-out`}
      />
      <div
        ref={dotRef}
        onMouseEnter={e => e.currentTarget.classList.add('pulse')}
        className='absolute top-0 h-3 w-3 bg-gray-500 rounded-full'
        onAnimationEnd={e => e.currentTarget.classList.remove('pulse')}
      />
    </>
  );
}

// Internal hooks --------------------------------------------------------------

function useResponsiveListSize() {
  const [size, setSize] = useState(0);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => updateSize());
    if (ref.current) resizeObserver.observe(ref.current);
  }, []);

  function canUpdateSize(list: HTMLUListElement): boolean {
    return list.getAttribute('prev-width') !== list.scrollWidth.toString();
  }

  function setPreviousWidth(list: HTMLUListElement) {
    list.setAttribute('prev-width', list.scrollWidth.toString());
  }

  function updateSize() {
    const list = ref.current;
    if (!list || !canUpdateSize(list)) return;
    let height = 0;
    for (const { clientHeight } of list.children) height += clientHeight;
    setPreviousWidth(list);
    setSize(height);
  }

  return { size, ref };
}