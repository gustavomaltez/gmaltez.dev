export function Footer() {
  return (
    <footer className="mt-4 w-full">
      <div className="flex flex-col gap-2 max-w-screen-lg mx-auto">
        <hr className="border-[#a3a3a3] border-opacity-50" />
        <div className="flex flex-row m-4 justify-between">
          <p className="text-[#a3a3a3] text-sm">
            Made with ❤️ and ☕ by Gustavo Maltez. <br />
            © 2023 Gustavo Maltez. All rights reserved.
          </p>
          <a href="https://fresh.deno.dev" className="justify-self-end">
            <img
              width="197"
              height="37"
              src="https://fresh.deno.dev/fresh-badge.svg"
              alt="Made with Fresh"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}