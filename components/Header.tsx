export function Header() {
  return (
    <header className="bg-background w-full p-4">
      <nav className="flex items-center justify-between max-w-screen-lg mx-auto">
        <a href="/">
          <img src="/gmaltez-full-logo.svg" className="h-6 sm:h-auto" />
        </a>
        <div className="pt-2 sm:pt-4 gap-3 flex flex-row">
          <a href="/posts" className="text-xs sm:text-base text-text hover:text-primary">Posts</a>
          <a href="/about" className="text-xs sm:text-base text-text hover:text-primary">About</a>
          <a href="/changelog" className="text-xs sm:text-base text-text hover:text-primary">Changelog</a>
        </div>
      </nav>
    </header>
  );
}