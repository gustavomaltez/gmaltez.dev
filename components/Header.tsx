export function Header() {
  return (
    <header className="bg-background w-full py-4">
      <nav className="flex items-center justify-between max-w-screen-lg mx-auto">
        <img src="/gmaltez-full-logo.svg" />
        <div className="pt-4 gap-3 flex flex-row">
          <a href="/" className="text-text hover:text-primary">Home</a>
          <a href="#" className="text-text hover:text-primary">Posts</a>
          <a href="#" className="text-text hover:text-primary">Changelog</a>
        </div>
      </nav>
    </header>
  );
}