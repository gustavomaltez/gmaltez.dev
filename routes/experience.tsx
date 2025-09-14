import { Head } from "@components";
import ExperienceTimeline from "@islands/ExperienceTimeline.tsx";
import TechnicalExpertiseCarousel from "@islands/TechnicalExpertiseCarousel.tsx";

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
        <ExperienceTimeline />
      </section>
    </>
  );
}
