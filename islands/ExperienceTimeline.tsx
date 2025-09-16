// Data ------------------------------------------------------------------------

const experiences: Experience[] = [
  {
    company: "SOAP Health",
    role: "Technical Lead",
    countryCode: "US",
    startDate: new Date("2025-08-01"),
    endDate: null,
    description:
      "Led the technical direction of the team, mentoring developers to enhance code quality and maintainability while coordinating cross-team collaboration on the core SOAP Health project.",
    achievements: [
      "Led the technical direction of the team, mentoring developers to enhance code quality and maintainability",
      "Managed technical debt and enforced best practices for sustainable project development",
      "Coordinated cross-team collaboration on the core SOAP Health project, driving architectural decisions",
      "Conducted hiring interviews, evaluating candidates' technical skills and problem-solving abilities",
    ],
  },
  {
    company: "SOAP Health",
    role: "Full Stack Software Engineer",
    countryCode: "US",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2025-09-01"),
    description:
      "Acted as technical reference for the team, focusing on performance optimization, tooling development, and architectural improvements while mentoring other developers and enforcing best practices.",
    achievements: [
      "Improved the monorepo build pipeline by replacing Babel/Webpack with a custom ESBuild pipeline and TypeScript analyzer using the TS compiler API on Node worker threads, reducing build times by 88% (from 3m to 20s)",
      "Acted as technical reference: mentoring, pair programming, refactoring sessions, enforcing best practices, and supporting hiring by reviewing take-home projects and technical writing",
      "Developed an internal UI component management tool integrated via ESBuild plugin, displaying props, changelogs, test results, usage references, and documentation, accelerated developer iteration and debugging",
      "Implemented declarative questionnaire flow tests and GenAI-assisted instructions to auto-generate tests from business rules, reduced repetitive boilerplate, lowered human error, and cut test development time by 60%",
      "Enforced declarative coding patterns across the codebase, reduced duplication, improved readability, and decreased long-term maintenance/testing costs",
      "Maintained and enhanced the 3D virtual doctor engine: UnityJS to BabylonJS migration, built new BabylonJS features, prototyped improvements in ThreeJS, and created variations of the 3D character model using Blender",
      "Improved questionnaire flow abstraction for dynamic, declarative navigation based on user responses, enabling AI-generated question sequences for medical diagnosis",
      "Built a low-cost, Dockerized custom intent detection system using an open-source LLM with caching, reduced third-party AI usage costs and improved response times",
      "Led integrations with US EHR systems (Athena Health) and other third-party APIs for STT/TTS, authentication, and clinical workflows",
      "Implemented Sentry for APIs and React/Remix apps with a custom ESBuild plugin, monitored errors in staging/production, logged locally during development",
    ],
  },
  {
    company: "SOAP Health",
    role: "Software Engineer",
    countryCode: "US",
    startDate: new Date("2021-04-01"),
    endDate: new Date("2023-06-01"),
    description:
      "Developed and maintained a React-based medical questionnaire application with a 3D virtual assistant, contributing to both front-end features and integrations while working on AI-driven questionnaire flows.",
    achievements: [
      "Developed and maintained a React-based medical questionnaire application with a 3D virtual assistant, contributing to both front-end features and integrations",
      "Migrated the 3D virtual character engine from UnityJS to BabylonJS with a framework-agnostic JavaScript abstraction, improving maintainability and integration flexibility",
      "Enhanced the 3D virtual human model using Blender, creating variations and allowing users to select their preferred avatar in the application",
      "Replaced the previous speech-to-text abstraction with a WebSocket streaming solution, enabling real-time transcription and intent detection using Google STT and Dialogflow, reducing latency and API costs",
      "Designed and implemented login, password recovery, and passwordless access flows using challenge responses for secure onboarding",
      "Implemented Feature Flags management across the admin panel and app, enabling trunk-based development and continuous feature delivery",
      "Optimized API traffic and application performance by implementing a client-side caching abstraction with data versioning stored in local storage",
      "Performed Prisma migrations and data normalization to maintain data integrity and system scalability",
      "Built an in-house metrics collector and dashboard with MongoDB, Remix, and Recharts to track user interactions and system performance",
      "Contributed to CI/CD pipelines, deployment workflows, and maintainable, testable code to ensure high code quality and reliability",
      "Worked on AI-driven questionnaire flows, dynamically generating questions based on user responses, processing medical assessments, and allowing answers via voice or UI",
    ],
  },
  {
    company: "Include Jr",
    role: "Full Stack Software Developer",
    countryCode: "BR",
    startDate: new Date("2020-07-01"),
    endDate: new Date("2021-05-01"),
    description:
      "Developed full-stack client applications using ReactJS, Node.js, and ElectronJS with TypeScript and JavaScript while managing the full software development lifecycle from requirement gathering to deployment.",
    achievements: [
      "Developed full-stack client applications using ReactJS, Node.js, and ElectronJS with TypeScript and JavaScript",
      "Designed user interfaces from Figma mockups and gathered requirements through close collaboration with clients to ensure smooth delivery",
      "Built a client management platform for a solar energy company, integrating front-end interfaces with backend services and deploying on Digital Ocean",
      "Created a ticket/sticker customization desktop application, enabling users to select components, colors, sizes, edit/save templates, and generate sequential PDFs at scale",
      "Participated in the trainee program, gaining experience in client communication, requirement analysis, and detailed software specification writing",
      "Managed the full software development lifecycle from requirement gathering to deployment, maintaining and improving applications for client needs",
      "Developed teamwork, coordination, and problem-solving skills while supporting live projects",
      "Ensured code quality, maintainability, and scalability across all projects",
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
