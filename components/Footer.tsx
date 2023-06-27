export function Footer() {
  return (
    <footer className="mt-4 w-full">
      <div className="flex flex-col gap-2 max-w-screen-lg mx-auto">
        <hr className="border-[#a3a3a3] border-opacity-50" />
        <div
          className="flex flex-col sm:flex-row m-2 items-center justify-center 
          sm:justify-between gap-4 sm:mx-5 sm:my-3"
        >
          <p className="text-[#a3a3a3] text-xs sm:text-sm text-center">
            Made with ❤️ and ☕ by Gustavo Maltez. <br />
            © 2023 Gustavo Maltez. All rights reserved. <br />
            Web illustrations by {' '}
            <a href="https://storyset.com/web" className="hover:text-secondary">
              Storyset
            </a>
          </p>
          <a href="https://fresh.deno.dev" className="justify-self-end hover:animate-pulse">
            <img
              className="h-5 sm:h-8"
              src="https://fresh.deno.dev/fresh-badge.svg"
              alt="Made with Fresh"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}