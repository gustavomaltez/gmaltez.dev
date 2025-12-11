import ProgressBar from "@islands/ProgressBar.tsx";
import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link
          rel="icon"
          href="/favicon.svg"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="bg-background text-text-primary min-h-screen flex flex-col min-w-[350px] max-w-screen">
        <header class="w-full p-4">
          <nav class="flex items-center justify-between max-w-(--breakpoint-lg) mx-auto">
            <a
              href="/"
              aria-label="Home"
            >
              <img
                src="/gmaltez-full-logo.svg"
                alt="gmaltez.dev logo"
                height={23}
                width={110}
              />
            </a>
            <div class="pt-2 sm:pt-4 gap-3 flex flex-row">
              <Link
                href="/"
                label="Posts"
              />
              <Link
                href="/about"
                label="About"
              />
              <Link
                href="/experience"
                label="Experience"
              />
              <Link
                href="/gustavo_maltez_resume.pdf"
                label="Resume"
              />
            </div>
          </nav>
        </header>
        <ProgressBar />
        <main class="m-4 max-w-(--breakpoint-lg) flex gap-6 flex-col h-full flex-1 lg:mx-auto px-2 lg:px-0">
          <Component />
        </main>
        <footer class="mt-4 w-full">
          <div class="flex flex-col gap-2 max-w-(--breakpoint-lg) mx-auto">
            <hr class="border-text-tertiary/50" />
            <div class="flex flex-col sm:flex-row m-2 items-center justify-center 
              sm:justify-between gap-4 sm:mx-5 sm:my-3">
              <p class="text-text-tertiary text-xs sm:text-sm text-center">
                Made with ❤️ and ☕ by Gustavo Maltez. <br />
                © {new Date().getFullYear()} Gustavo Maltez. All rights reserved. <br />
              </p>
              <a
                href="https://fresh.deno.dev"
                class="justify-self-end hover:animate-pulse"
              >
                <img
                  src="https://fresh.deno.dev/fresh-badge.svg"
                  alt="Made with Fresh"
                  width="177"
                  height="33"
                />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
});

type LinkProps = Readonly<{
  href: string
  label: string
}>

function Link({ href, label }: LinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      class="text-xs sm:text-base text-text-primary hover:text-primary"
    >
      {label}
    </a>
  );
}
