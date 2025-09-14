import { useEffect, useState } from "preact/hooks";

// Data ------------------------------------------------------------------------

const categories: Category[] = [
  {
    name: "Frontend",
    technologies: [
      "React",
      "JavaScript",
      "TypeScript",
      "TailwindCSS",
      "React Router DOM",
    ],
  },
  {
    name: "Backend & Runtime",
    technologies: ["Node.js", "Deno", "PrismaORM"],
  },
  {
    name: "Frameworks",
    technologies: ["Remix", "Fresh.js"],
  },
  {
    name: "Build Tools",
    technologies: ["ESBuild", "Webpack", "Vite"],
  },
  {
    name: "Testing & Monitoring",
    technologies: [
      "Jest",
      "Vitest",
      "Playwright",
      "React Testing Library",
      "Sentry",
    ],
  },
  {
    name: "Cloud & APIs",
    technologies: [
      "GCP",
      "Firebase",
      "Google Speech-To-Text",
      "Google Text-to-Speech",
    ],
  },
];

// Components ------------------------------------------------------------------

export default function TechnicalExpertiseCarousel() {
  const [state, setState] = useState<State>({
    index: 0,
    isAutoPlaying: true,
    resolution: globalThis.innerWidth,
    items: getItemsByIndex(0),
  });

  function next() {
    setState(() => {
      const index = (state.index + 1) % categories.length;
      return {
        isAutoPlaying: false,
        resolution: globalThis.innerWidth,
        index: index,
        items: getItemsByIndex(index),
      };
    });
  }

  function previous() {
    setState(() => {
      const index = (state.index - 1 + categories.length) %
        categories.length;
      return {
        isAutoPlaying: false,
        resolution: globalThis.innerWidth,
        index: index,
        items: getItemsByIndex(index),
      };
    });
  }

  useEffect(() => {
    function resizeListener() {
      // Avoid unnecessary rerenders by updating state only when crossing the threshold
      if (
        (state.resolution < RESOLUTION_THRESHOLD &&
          globalThis.innerWidth < RESOLUTION_THRESHOLD) ||
        (state.resolution >= RESOLUTION_THRESHOLD &&
          globalThis.innerWidth >= RESOLUTION_THRESHOLD)
      ) return;

      setState((state) => ({
        ...state,
        items: getItemsByIndex(state.index),
      }));
    }

    globalThis.addEventListener("resize", resizeListener);

    if (!state.isAutoPlaying) return;

    const interval = setInterval(() => next(), 5000);

    return () => {
      clearInterval(interval);
      globalThis.removeEventListener("resize", resizeListener);
    };
  }, [state.isAutoPlaying]);

  return (
    <div className="flex flex-col gap-1 bg-background-secondary rounded-lg p-4 pt-2 shadow-lg border 
    border-text-tertiary/20">
      <h2 className="text-lg sm:text-xl font-bold text-text-primary text-center">
        Technical Expertise
      </h2>
      <div className="flex justify-center">
        <div className="max-w-5xl w-full relative flex items-center">
          <Arrow
            direction="left"
            onClick={previous}
          />
          <div className="mx-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {state.items.map((category) => (
                <Category
                  key={category.name}
                  name={category.name}
                  technologies={category.technologies}
                />
              ))}
            </div>
          </div>
          <Arrow
            direction="right"
            onClick={next}
          />
        </div>
      </div>
    </div>
  );
}

function Category(
  { name, technologies }: Category,
) {
  return (
    <div>
      <h3 className="text-base font-semibold text-primary mb-2">
        {name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs bg-background rounded-full 
            text-text-secondary border border-text-tertiary/30"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function Arrow(
  { direction, onClick }: {
    direction: "left" | "right";
    onClick: () => void;
  },
) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute ${
        direction === "left" ? "left-0" : "right-0"
      } cursor-pointer top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full
      bg-background hover:bg-text-tertiary/20 shadow-lg hover:shadow-xl`}
    >
      <svg
        className="w-5 h-5 text-text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

// Helpers ---------------------------------------------------------------------

function getItemsByIndex(index: number) {
  const items = [];
  const size = globalThis.innerWidth < RESOLUTION_THRESHOLD ? 1 : 3;
  for (let i = 0; i < size; i++) {
    const position = (index + i) % categories.length;
    items.push(categories[position]);
  }
  return items;
}

// Types -----------------------------------------------------------------------

type Category = {
  name: string;
  technologies: string[];
};

type State = {
  index: number;
  items: Category[];
  resolution: number;
  isAutoPlaying: boolean;
};

// Constants -------------------------------------------------------------------

const RESOLUTION_THRESHOLD = 768;
