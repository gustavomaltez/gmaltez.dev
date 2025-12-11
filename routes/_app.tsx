import ProgressBar from "@islands/ProgressBar.tsx";
import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="en">
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
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body class="bg-background text-text-primary min-h-screen flex flex-col min-w-[350px] max-w-screen">
        <header
          data-testid="header"
          class="w-full p-4"
        >
          <nav
            aria-label="Main navigation"
            data-testid="main-nav"
            class="flex items-center justify-between max-w-(--breakpoint-lg) mx-auto"
          >
            <a
              href="/"
              aria-label="Home"
              data-testid="logo-link"
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
                testId="nav-posts"
              />
              <Link
                href="/about"
                label="About"
                testId="nav-about"
              />
              <Link
                href="/experience"
                label="Experience"
                testId="nav-experience"
              />
              <Link
                href="/gustavo_maltez_resume.pdf"
                label="Resume"
                testId="nav-resume"
              />
            </div>
          </nav>
        </header>
        <ProgressBar />
        <main
          data-testid="main-content"
          class="m-4 max-w-(--breakpoint-lg) flex gap-6 flex-col h-full flex-1 lg:mx-auto px-2 lg:px-0"
        >
          <Component />
        </main>
        <footer
          data-testid="footer"
          class="mt-4 w-full"
        >
          <div class="flex flex-col gap-2 max-w-(--breakpoint-lg) mx-auto">
            <hr class="border-text-tertiary/50" />
            <div class="flex flex-col sm:flex-row m-2 items-center justify-center 
              sm:justify-between gap-4 sm:mx-5 sm:my-3">
              <p class="text-text-tertiary text-xs sm:text-sm text-center">
                Made with ❤️ and ☕ by Gustavo Maltez. <br />
                © {new Date().getFullYear()}{" "}
                Gustavo Maltez. All rights reserved. <br />
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
        <script
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap";
                document.head.appendChild(link);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
});

type LinkProps = Readonly<{
  href: string;
  label: string;
  testId?: string;
}>;

function Link({ href, label, testId }: LinkProps) {
  return (
    <a
      href={href}
      data-testid={testId}
      class="text-xs sm:text-base text-text-primary hover:text-primary py-2 px-1"
    >
      {label}
    </a>
  );
}
