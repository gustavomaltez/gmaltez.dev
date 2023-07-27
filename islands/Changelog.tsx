import { useEffect, useRef, useState } from "https://esm.sh/preact@10.13.1/hooks";

type Release = {
  date: string;
  version: string;
  changes: string[];
  description: string;
};

type ChangelogProps = {
  items: Release[];
};

// ToDo: Refactor this component, break the logic and clean up the code.

export default function Changelog(props: ChangelogProps) {
  return (
    <ul className="flex flex-col my-4">
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

function Release(data: Release & { index: number; isLast: boolean; }) {
  const [listSize, setListSize] = useState(0);
  const dotRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => {
        if (!dotRef.current) return;
        dotRef.current.classList.add("pulse");
        dotRef.current.classList.replace("bg-gray-500", "bg-primary");
      }, (data.index - 1) * 250 + 300),
      setTimeout(() => {
        if (!timelineRef.current) return;
        timelineRef.current.style.height = `100%`;
      }, data.index * 250)
    ];

    const resizeObserver = new ResizeObserver(() => updateSize());
    if (listRef.current) resizeObserver.observe(listRef.current);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  function updateSize() {
    const list = listRef.current;
    if (!list || list.getAttribute("prev-width") === list.scrollWidth.toString()) return;

    let elementsHeight = 0;
    for (const element of listRef.current.children)
      elementsHeight += element.clientHeight;

    listRef.current.setAttribute("prev-width", listRef.current.scrollWidth.toString());
    setListSize(elementsHeight);
  }

  return (
    <li className="relative flex flex-col items-start">
      <div
        hidden={data.isLast}
        className={`absolute top-0 left-[0.31rem] bottom-0 h-full w-0.5 bg-gray-500`}
      />
      <div
        ref={timelineRef}
        hidden={data.isLast}
        className={`absolute top-0 left-[0.31rem] bottom-0 h-0 w-0.5 bg-primary
        transition-[height] duration-1000 ease-in-out`}
      />
      <div
        ref={dotRef}
        onMouseEnter={e => e.currentTarget.classList.add("pulse")}
        className="absolute top-0 h-3 w-3 bg-gray-500 rounded-full"
        onAnimationEnd={e => e.currentTarget.classList.remove("pulse")}
      />
      <div className="ml-5 -mt-[1.31rem] py-3 flex flex-col items-start transition-all duration-500">
        <h2 className="text-xl font-bold">{data.version}</h2>
        <p>{data.description}</p>
        <ul
          ref={listRef}
          className="flex flex-col transition-all"
          onAnimationEnd={e => e.currentTarget.style.transitionDuration = "0ms"}
          style={{
            opacity: isExpanded ? 1 : 0,
            height: `${isExpanded ? listSize : 0}px`,
            transitionDuration: `${(data.changes.length * 200) + 400}ms`,
          }}
        >
          {data.changes.map((change, index) => (
            <li
              key={change}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
              onAnimationEnd={e => e.currentTarget.classList.remove("opacity-0")}
              className={`text-text-secondary opacity-0 ${isExpanded ? "swipe" : ""}`}
            >
              - {change}
            </li>
          ))}
        </ul>
        <button
          hidden={isExpanded}
          onClick={() => setIsExpanded(true)}
          className={`text-primary font-bold transition-all duration-500 
          ${isExpanded ? "opacity-0" : "opacity-100"} cursor-pointer z-10`}
        >
          View changes
        </button>
      </div>
    </li>
  );
}