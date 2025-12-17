import { define } from "../../../utils.ts";

const ASSETS_ORIGIN = "https://assets.gmaltez.dev";
const ENABLE_ASSET_PROXY = Deno.env.get("ENABLE_ASSET_PROXY") === "true";

export const handler = define.handlers({
  async GET(ctx) {
    // Only available when explicitly enabled via ENABLE_ASSET_PROXY=true
    if (!ENABLE_ASSET_PROXY) {
      return new Response("Not found", { status: 404 });
    }

    const path = ctx.params.path;
    const targetUrl = `${ASSETS_ORIGIN}/${path}`;

    const response = await fetch(targetUrl, {
      headers: {
        "Referer": "https://gmaltez.dev",
      },
    });

    if (!response.ok) {
      return new Response("Asset not found", { status: response.status });
    }

    const contentType = response.headers.get("content-type") ||
      "application/octet-stream";

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  },
});
