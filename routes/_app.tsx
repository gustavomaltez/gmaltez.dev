import { type PageProps } from '$fresh/server.ts';

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>GMALTEZ.DEV | HOME</title>
        <meta
          name='author'
          content='Gustavo Maltez'
        />
        <meta
          name='description'
          content="Gustavo Maltez's personal website"
        />
        <meta
          name='keywords'
          content={
            'Gustavo Maltez, GMaltez, GMaltez.dev, GMaltez.dev blog, GMaltez.dev posts'
          }
        />
        <meta
          property='og:title'
          content='GMALTEZ.DEV | HOME'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:locale'
          content='en_US'
        />
        <meta
          property='og:url'
          content='https://gmaltez.dev'
        />
        <meta
          property='og:image'
          content='https://gmaltez.dev/og.svg'
        />
        <meta
          property='og:description'
          content="Gustavo Maltez's personal website"
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <link
          rel='icon'
          href='/favicon.svg'
        />
        <link
          rel='stylesheet'
          href='/styles.css'
        />
      </head>
      <body class='bg-background text-text-primary min-h-screen flex flex-col min-w-[350px]'>
        <header class='w-full p-4'>
          <nav class='flex items-center justify-between max-w-screen-lg mx-auto'>
            <a
              href='/'
              aria-label='Home'
            >
              <img
                src='/gmaltez-full-logo.svg'
                alt='GMaltez.dev logo'
                height={23}
                width={110}
              />
            </a>
            <div class='pt-2 sm:pt-4 gap-3 flex flex-row'>
              <Link
                href='/'
                label='Posts'
              />
              <Link
                href='/about'
                label='About'
              />
            </div>
          </nav>
        </header>
        <main class='w-full m-4 max-w-screen-lg flex gap-6 flex-col h-full flex-1 lg:mx-auto'>
          <Component />
        </main>
        <footer class='mt-4 w-full'>
          <div class='flex flex-col gap-2 max-w-screen-lg mx-auto'>
            <hr class='border-text-tertiary border-opacity-50' />
            <div
              class='flex flex-col sm:flex-row m-2 items-center justify-center 
              sm:justify-between gap-4 sm:mx-5 sm:my-3'
            >
              <p class='text-text-tertiary text-xs sm:text-sm text-center'>
                Made with ❤️ and ☕ by Gustavo Maltez. <br />
                © 2024 Gustavo Maltez. All rights reserved. <br />
              </p>
              <a
                href='https://fresh.deno.dev'
                class='justify-self-end hover:animate-pulse'
              >
                <img
                  src='https://fresh.deno.dev/fresh-badge.svg'
                  alt='Made with Fresh'
                  width='177'
                  height='33'
                />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

function Link(props: { href: string; label: string }) {
  return (
    <a
      href={props.href}
      aria-label={props.label}
      class='text-xs sm:text-base text-text-white hover:text-primary'
    >
      {props.label}
    </a>
  );
}
