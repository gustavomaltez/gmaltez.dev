// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/about.tsx";
import * as $2 from "./routes/auth/github.ts";
import * as $3 from "./routes/blog/[slug].tsx";
import * as $4 from "./routes/changelog.tsx";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/posts.tsx";
import * as $$0 from "./islands/Changelog.tsx";
import * as $$1 from "./islands/PostSearch.tsx";
import * as $$2 from "./islands/ProgressBar.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/about.tsx": $1,
    "./routes/auth/github.ts": $2,
    "./routes/blog/[slug].tsx": $3,
    "./routes/changelog.tsx": $4,
    "./routes/index.tsx": $5,
    "./routes/posts.tsx": $6,
  },
  islands: {
    "./islands/Changelog.tsx": $$0,
    "./islands/PostSearch.tsx": $$1,
    "./islands/ProgressBar.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
