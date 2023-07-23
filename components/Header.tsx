export function Header() {
  return (
    <header className="bg-background w-full p-4">
      <nav className="flex items-center justify-between max-w-screen-lg mx-auto">
        <a href="/" aria-label="Home">
          <img
            src="/gmaltez-full-logo.svg"
            alt="GMaltez.dev logo"
            height={23} width={110}
          />
        </a>
        <div className="pt-2 sm:pt-4 gap-3 flex flex-row">
          <Link href="/posts" label="Posts" />
          <Link href="/about" label="About" />
          <Link href="/changelog" label="Changelog" />
        </div>
      </nav>
    </header>
  );
}

function Link(props: { href: string; label: string; }) {
  return (
    <a
      href={props.href}
      aria-label={props.label}
      className="text-xs sm:text-base text-text-primary hover:text-primary"
    >
      {props.label}
    </a>
  );
}