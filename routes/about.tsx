import { Head } from '@components';

export default function About() {
  return (
    <>
      <Head title='About' />
      <section className='flex flex-col justify-items-center gap-3'>
        <div className='flex flex-col items-center justify-center gap-5 sm:flex-row sm:justify-start mb-3 mt-2'>
          <img
            height='95'
            width='95'
            className='rounded-full'
            alt='Picture of the author (Gustavo Maltez)'
            src='https://github.com/gustavomaltez.png'
          />
          <h1 className='text-2xl sm:text-3xl font-bold'>
            Hello! <br className='hidden sm:block' />
            I'm Gustavo Maltez :)
          </h1>
        </div>
        <hr className='border-text-tertiary border-opacity-50' />
        <p className='text-base sm:text-lg text-text-secondary'>
          Welcome to my personal website, here I share my thoughts and
          experiences about coding, software development, English, and a few
          other topics. I'm a 23-year-old software developer from Brazil who is
          truly passionate about programming and technology.
        </p>
        <p className='text-base sm:text-lg text-text-secondary'>
          I embarked on my programming journey at the age of 14, driven by my
          curiosity to understand how to create Minecraft servers and plugins.
          My first programming experience was with Java, though I haven't used
          it much since then. However, it was when I turned 16 that I really
          started honing my coding skills, thanks to my first encounters with
          Arduino and C++. Back then, I developed several projects using
          Arduino, and this sparked a new interest in me to create a mobile app
          for controlling my Arduino projects. This desire led me to learn React
          Native, and ever since, I've delved into React and found my true
          passion for web development.
        </p>
        <p className='text-base sm:text-lg text-text-secondary'>
          In 2019, I began my bachelor's degree in Software Engineering at the
          Federal University of Ceará (UFC). A few months into my college
          journey, I seized an exciting opportunity and landed my first job as a
          software developer at IncludeJr, a college-run software house. I
          dedicated around 9 months to this role, gaining valuable experience
          and skills. Later, I transitioned to a position at a US-based company,
          where I currently work as a full-stack software developer.
        </p>
        <p className='text-base sm:text-lg text-text-secondary'>
          After three years of college, I made the decision to take a break and
          concentrate on my career as a software developer. Programming is not
          just a job for me; it's my true passion and what motivates me to wake
          up every day, eager to work and explore new horizons in technology. I
          thrive on embracing fresh challenges that push my boundaries and allow
          me to grow both professionally and personally.
        </p>
        <p className='text-base sm:text-lg text-text-secondary'>
          At this stage in my life, my ultimate goal is to develop software that
          positively impacts people's lives, making the world a better place
          through innovative solutions. I believe in the transformative power of
          technology and its potential to bring about positive change, and I am
          committed to using my skills and knowledge to contribute to this
          vision.
        </p>
        <p className='text-base sm:text-lg text-text-secondary'>
          Besides my passion for software development, I also have a deep love
          for teaching and sharing knowledge with others. This strong desire to
          impart what I've learned led me to create this blog. Through it, my
          primary goal is to share my experiences and expertise with fellow
          developers, empowering them to grow and excel in their journeys.
          Additionally, I see writing as an excellent means to improve my
          English skills, and this blog serves as a platform for honing my
          language proficiency. I sincerely hope you find value in the content I
          provide, and I welcome you to reach out to me with any questions or
          suggestions you may have.
        </p>
      </section>
    </>
  );
}
