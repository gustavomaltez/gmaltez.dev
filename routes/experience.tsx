import { Head } from "@components";
import ExperienceTimeline from "@islands/ExperienceTimeline.tsx";
import TechnicalExpertiseCarousel from "@islands/TechnicalExpertiseCarousel.tsx";

type ExperienceItem = {
  company: string;
  role: string;
  startDate: Date;
  endDate: Date | null;
  achievements: string[];
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    company: "SOAP Health",
    role: "Technical Lead",
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

export default function Experience() {
  return (
    <>
      <Head title="Experience" />
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Which Professional Am I?
          </h1>
          <p className="text-base sm:text-lg text-text-secondary">
            I deliver client solutions through high-quality, maintainable code.
            With 5+ years of experience as a full-stack engineer working with
            TypeScript, JavaScript, React, and Node.js, I thrive on solving
            real-world problems through software. I'm passionate about
            optimizing systems to help developers move faster while ensuring
            code that stands the test of time.
          </p>
        </div>
        <hr className="border-text-tertiary/50" />

        <TechnicalExpertiseCarousel />

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Professional Experience
          </h1>
          <p className="text-base sm:text-lg text-text-secondary">
            My journey as a software developer, from trainee to technical lead,
            working on challenging projects and growing my expertise in modern
            web technologies.
          </p>
        </div>
        <hr className="border-text-tertiary/50" />
        <ExperienceTimeline experiences={experiences} />
      </section>
    </>
  );
}
