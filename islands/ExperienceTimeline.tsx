// Data ------------------------------------------------------------------------

const experiences: Experience[] = [
  {
    company: "SOAP Health",
    role: "Technical Lead",
    countryCode: "US",
    startDate: new Date("2025-08-01"),
    endDate: null,
    description:
      "Leading technical initiatives and architectural decisions while mentoring team members and driving best practices across the engineering organization.",
    achievements: [
      "Leading technical strategy and architecture decisions",
      "Mentoring engineers and establishing coding standards",
      "Driving technical excellence and innovation initiatives",
      "Collaborating with stakeholders on technical roadmap",
    ],
  },
  {
    company: "SOAP Health",
    role: "Full Stack Software Engineer",
    countryCode: "US",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2025-09-01"),
    description:
      "After 2 years working as a Junior Software Engineer at SOAP, my hard work and dedication were recognized and I was promoted to be a technical reference for the team. I moved to a more technical, hands-on role: solving complex issues, managing technical debt, improving the developer experience, and helping other developers write clear, maintainable, and test-covered code.",
    achievements: [
      "Improved build pipeline performance by replacing Babel + Webpack with ESBuild, reducing React app rebuilds from 1+ minute to seconds and monorepo builds from 5 minutes to under 1 minute",
      "Built a custom UI component management tool integrated directly into the app, providing faster iteration cycles than Storybook with component metadata, test results, and usage tracking",
      "Created declarative questionnaire flow tests enabling high-confidence testing with unit test speed and E2E coverage",
      "Enforced declarative coding patterns across the codebase, reducing repetition, maintenance costs, and improving code readability",
      "Maintained and improved the 3D virtual character engine, working with UnityJS, BabylonJS, and building POCs with ThreeJS",
      "Participated in hiring process including technical interviews and code reviews",
      "Led refactoring sessions and pair programming to improve team code quality",
    ],
  },
  {
    company: "SOAP Health",
    role: "Junior Software Engineer",
    countryCode: "US",
    startDate: new Date("2021-04-01"),
    endDate: new Date("2023-06-01"),
    description:
      "Worked on different components within SOAP's software ecosystem, focusing on a React-based medical questionnaire where users interact with a 3D virtual doctor through voice and clicks. Maintained and improved the engine orchestrating communication between STT, TTS, intent detection, and the 3D scene.",
    achievements: [
      "Gained expertise with modern web technologies: Webpack, Babel, ESBuild, TailwindCSS, SASS, JEST, Vite, Vitest, Storybook, Remix",
      "Worked with backend technologies: Firebase, PostgreSQL, PrismaORM, Node.js, Docker",
      "Developed proficiency in React (class and functional components), package management, and Git workflows",
      "Built proof-of-concept applications and researched new technologies for existing problems",
      "Gained hands-on experience with databases, GCP, and deployment workflows",
      "Solved real-world challenges in a startup environment with direct client impact",
    ],
  },
  {
    company: "IncludeJr (Federal University of Ceará)",
    role: "Full Stack Software Developer",
    countryCode: "BR",
    startDate: new Date("2020-11-01"),
    endDate: new Date("2021-05-01"),
    description:
      "After completing the trainee program, I was approved to work as a Software Developer creating solutions using ReactJS, Node.js, and ElectronJS with JavaScript and TypeScript.",
    achievements: [
      "Developed a solar energy client management platform collaborating with backend developer, handling UI design in Figma, client requirements gathering, and frontend development",
      "Built a solo project for customizing and printing tickets at scale using ElectronJS, React, and TypeScript",
      "Created a Figma-like interface allowing users to customize components, colors, sizes, and generate sequential tickets",
      "Gained experience in the complete software development lifecycle from client consultation to deployment",
      "Developed strong collaboration and coordination skills working with team members and clients",
    ],
  },
  {
    company: "IncludeJr (Federal University of Ceará)",
    role: "Trainee",
    countryCode: "BR",
    startDate: new Date("2020-09-01"),
    endDate: new Date("2020-10-31"),
    description:
      "During the two-month trainee program, I gained valuable hands-on experience in several areas of software development while applying college knowledge in real-world scenarios.",
    achievements: [
      "Developed client communication and lead generation skills",
      "Learned to write detailed software requirements and specifications",
      "Enhanced teamwork and collaboration abilities",
      "Gained broader understanding of the software development process",
      "Balanced soft skills (client communication) with hard skills (requirements and coding)",
    ],
  },
];

// Components ------------------------------------------------------------------

// TODO(@gustavomaltez): Add animations when scrolling into view
// I'm leaving it as a island because I plan to add animations and interactivity soon

export default function ExperienceTimeline() {
  return (
    <>
      <div className="relative flex flex-col gap-4 md:gap-8 -ml-4 sm:m-0">
        <div className="absolute left-6 top-6 bottom-0 w-0.5 
          bg-text-tertiary opacity-30" />
        {experiences.map((experience) => (
          <div
            key={`${experience.company}-${experience.role}-${experience.startDate}`}
            className="timeline-item relative
            translate-y-4 transition-all duration-700 ease-out"
          >
            <div className="absolute top-2 left-6 w-6 h-6 bg-primary rounded-full 
              shadow-lg transform -translate-x-1/2 timeline-dot" />
            <div className="ml-12 bg-background-secondary rounded-lg
              p-3 sm:p-4 shadow-lg border border-text-tertiary/20">
              <div className="flex flex-col sm:flex-row sm:items-center 
                sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                    {experience.role}
                  </h3>
                  <p className="text-base sm:text-lg text-primary font-semibold">
                    <span className="flex items-center gap-2">
                      <img
                        src={`https://flagsapi.com/${experience.countryCode}/flat/32.png`}
                        alt={experience.countryCode + " flag"}
                        className="mt-0.5 inline-block w-5 h-5 align-middle rounded shadow"
                        loading="lazy"
                      />
                      {experience.company}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-row gap-2 sm:gap-0 sm:flex-col items-center sm:items-end w-full">
                    <span className="text-sm sm:text-base text-text-tertiary">
                      {formatExperienceDateRange({
                        startDate: experience.startDate,
                        endDate: experience.endDate,
                      })}
                    </span>
                    <span className="text-xs text-text-tertiary opacity-75">
                      {calculateExperienceDuration({
                        startDate: experience.startDate,
                        endDate: experience.endDate,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-text-secondary 
                mb-4 leading-relaxed">
                {experience.description}
              </p>
              <div>
                <h4 className="text-sm sm:text-base font-semibold 
                  text-text-primary mb-2">
                  Key Achievements & Responsibilities:
                </h4>
                <ul className="space-y-2">
                  {experience.achievements.map(
                    (achievement) => (
                      <li
                        key={achievement}
                        className="text-sm sm:text-base text-text-secondary 
                        flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5 text-xs">●</span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Helpers ---------------------------------------------------------------------

function calculateExperienceDuration(
  { startDate, endDate }: {
    startDate: Date;
    endDate: Date | null;
  },
) {
  const startDateNormalized = typeof startDate === "string"
    ? new Date(startDate)
    : startDate;
  const endDateNormalized = endDate
    ? typeof endDate === "string" ? new Date(endDate) : endDate
    : new Date();

  const timeDifferenceInMilliseconds = Math.abs(
    endDateNormalized.getTime() - startDateNormalized.getTime(),
  );
  const totalDurationInMonths = Math.ceil(
    timeDifferenceInMilliseconds / MILLISECONDS_PER_MONTH,
  );

  if (totalDurationInMonths < MONTHS_PER_YEAR) {
    return `${totalDurationInMonths} month${
      totalDurationInMonths > 1 ? "s" : ""
    }`;
  }

  const totalYears = Math.floor(totalDurationInMonths / MONTHS_PER_YEAR);
  const remainingMonths = totalDurationInMonths % MONTHS_PER_YEAR;

  if (remainingMonths === 0) {
    return `${totalYears} year${totalYears > 1 ? "s" : ""}`;
  }

  return `${totalYears} year${
    totalYears > 1 ? "s" : ""
  } ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
}

function formatExperienceDateRange(
  { startDate, endDate }: {
    startDate: Date;
    endDate: Date | null;
  },
) {
  const startDateNormalized = typeof startDate === "string"
    ? new Date(startDate)
    : startDate;

  const formattedStartDate = startDateNormalized.toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" },
  );

  if (!endDate) return `${formattedStartDate} - Present`;

  const endDateNormalized = typeof endDate === "string"
    ? new Date(endDate)
    : endDate;
  const formattedEndDate = endDateNormalized.toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" },
  );

  return `${formattedStartDate} - ${formattedEndDate}`;
}

// Types -----------------------------------------------------------------------

type Experience = {
  company: string;
  role: string;
  startDate: Date;
  endDate: Date | null;
  achievements: string[];
  description: string;
  countryCode: "US" | "BR";
};

// Constants -------------------------------------------------------------------

const MONTHS_PER_YEAR = 12;
const MILLISECONDS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.44;
