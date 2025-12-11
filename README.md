<p align='center'>
  <img alt='Repository size' src='https://img.shields.io/github/languages/code-size/gustavomaltez/gmaltez.dev?style=for-the-badge'>
  <img alt='Language' src='https://img.shields.io/github/languages/top/gustavomaltez/gmaltez.dev?style=for-the-badge'>
  <img alt='Website' src='https://img.shields.io/website?up_message=Online&up_color=%230f9d58&down_message=Offline&down_color=%23da3633&url=https%3A%2F%2Fgmaltez.dev%2F&style=for-the-badge'>
  <img alt='Last commit' src='https://img.shields.io/github/last-commit/gustavomaltez/gmaltez.dev?style=for-the-badge'>
  <img alt='License' src='https://img.shields.io/github/license/gustavomaltez/gmaltez.dev?style=for-the-badge'>
</p>

# gmaltez.dev

My personal blog and portfolio. Built with Deno + Fresh. No database, just markdown files.

🔗 **[gmaltez.dev](https://gmaltez.dev/)**

## 🛠️ Stack

- **Runtime:** [Deno](https://deno.com/)
- **Framework:** [Fresh](https://fresh.deno.dev/) (file-based routing, islands architecture)
- **UI:** Preact + TypeScript + Tailwind CSS v4
- **Validation:** Zod
- **Syntax Highlighting:** PrismJS
- **Testing:** Deno test + Playwright (E2E)

## 🚀 Running Locally

```bash
# Clone it
git clone git@github.com:gustavomaltez/gmaltez.dev.git
cd gmaltez.dev

# Install deps
deno install

# Run it
deno task dev
```

That's it. Open [localhost:5173](http://localhost:5173).

## 📜 Scripts

```bash
deno task dev        # Start dev server
deno task build      # Production build
deno task check      # Format + lint + type check
deno task e2e        # Run Playwright tests
deno test            # Run unit tests
```

## 🧪 Testing

**Unit tests** with Deno's built-in test runner:

```bash
deno test
```

**E2E tests** with Playwright (page objects, accessibility, user journeys):

```bash
deno task e2e           # Run all
deno task e2e:headed    # Watch the browser
deno task e2e:debug     # Step through tests
```

## 🤝 Contributing

Fork it, change it, PR it. Happy to review.

Questions? Hit me up on [LinkedIn](https://www.linkedin.com/in/gustavommaltez/).

## 📄 License

MIT. Use it however you want, just give credit. Please don't copy my posts - write your own, it's more fun.
