export function Header() {
  return (
    <header className="bg-background mx-auto max-w-screen-lg flex gap-3 justify-between">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="text-xl font-bold">GMaltez.dev</div>
          <div className="space-x-4">
            <a href="/" className="text-text hover:text-accent">Home</a>
            <a href="#" className="text-text hover:text-accent">Posts</a>
            <a href="#" className="text-text hover:text-accent">Changelog</a>
          </div>
        </nav>
      </div>
    </header>
  );
}