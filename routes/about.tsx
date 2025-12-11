import { Head } from "@components";

export default function About() {
  return (
    <>
      <Head title="About" />
      <section class="flex flex-col justify-items-center gap-3">
        <div class="flex flex-col items-center justify-center gap-5 sm:flex-row sm:justify-start mb-3 mt-2">
          <img
            height="95"
            width="95"
            class="rounded-full"
            alt="Picture of the author (Gustavo Maltez)"
            src="https://github.com/gustavomaltez.png?size=190"
          />
          <h1 class="text-2xl sm:text-3xl font-bold">
            Hello! <br class="hidden sm:block" />
            I'm Gustavo Maltez :)
          </h1>
        </div>
        <hr class="border-text-tertiary/50" />
        <p class="text-base sm:text-lg text-text-secondary">
          Welcome to my personal website. I write about coding, software
          development, English, and whatever else is on my mind. I'm a
          24-year-old software developer from Brazil who's really passionate
          about programming and technology.
        </p>
        <p class="text-base sm:text-lg text-text-secondary">
          I started programming at 14 because I wanted to figure out how to
          create Minecraft servers and plugins. Java was my first language,
          though I haven't used it much since then. At 16, I really got serious
          about coding when I discovered Arduino and C++. I built a bunch of
          Arduino projects, which made me want to create a mobile app to control
          them. That's how I learned React Native, and from there I dove into
          React and found my passion for web development.
        </p>
        <p class="text-base sm:text-lg text-text-secondary">
          In 2019, I started studying Software Engineering at the Federal
          University of Ceará (UFC). A few months in, I got my first job as a
          software developer at IncludeJr, a student-run software house. I
          worked there for about 11 months, learning a ton. After that, I joined
          a US-based startup where I spent over four years working as a
          full-stack software developer. Currently, I'm a senior software
          engineer at Makai Digital.
        </p>
        <p class="text-base sm:text-lg text-text-secondary">
          After three years of college, I decided to drop out and focus on my
          career as a software developer. Programming isn't just a job for me,
          it's what I love doing. It's what gets me excited to wake up every day
          and tackle new challenges. I like pushing my limits and growing both
          as an engineer and as a person.
        </p>
        <p class="text-base sm:text-lg text-text-secondary">
          My goal is to build software that actually helps people. I believe
          technology can make a real difference in people's lives, and I want to
          use what I know to contribute to that. It's what drives me.
        </p>
        <p class="text-base sm:text-lg text-text-secondary">
          I also love teaching and sharing what I've learned with other
          developers. That's why I created this blog. I want to share my
          experiences and help other developers grow in their own journeys.
          Plus, writing helps me improve my English, which I learned mostly on
          the job. I hope you find something useful here, and feel free to reach
          out if you have questions or suggestions.
        </p>
      </section>
    </>
  );
}
