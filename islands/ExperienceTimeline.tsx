// Components ------------------------------------------------------------------

// TODO(@gustavomaltez): Add animations when scrolling into view
// I'm leaving it as a island because I plan to add animations and interactivity soon

export default function ExperienceTimeline(
  { experiences }: {
    experiences: Experience[];
  },
) {
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
                    {experience.company}
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
};

// Constants -------------------------------------------------------------------

const MONTHS_PER_YEAR = 12;
const MILLISECONDS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.44;
