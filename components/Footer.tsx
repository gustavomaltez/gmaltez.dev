export function Footer() {
  return (
    <footer className="mt-4 w-full">
      <div className="flex flex-col gap-2 max-w-screen-lg mx-auto">
        <hr className="border-text-secondary border-opacity-50" />
        <div
          className="flex flex-col sm:flex-row m-2 items-center justify-center 
          sm:justify-between gap-4 sm:mx-5 sm:my-3"
        >
          <p className="text-text-secondary text-xs sm:text-sm text-center">
            Made with ❤️ and ☕ by Gustavo Maltez. <br />
            © 2023 Gustavo Maltez. All rights reserved. <br />
          </p>
          <a href="https://fresh.deno.dev" className="justify-self-end hover:animate-pulse">
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
  );
}