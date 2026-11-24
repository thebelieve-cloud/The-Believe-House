#!/usr/bin/env node
// Publishes a single blog post to the WordPress backend via the REST API.
// Reads credentials from env (WP_USER, WP_APP_PASSWORD). Never hard-code secrets here.
//
// Usage: node scripts/publish-post.mjs <article.json>
//
// article.json shape:
// {
//   "title": "…",
//   "slug": "ban-sampran-…",
//   "contentHtml": "<p>…</p>",
//   "excerpt": "meta description ~150 chars",
//   "focusKeyword": "บ้านสามพราน",
//   "imagePath": "asset/S__71909380.jpg",   // relative to repo root, optional
//   "imageAlt": "…",
//   "status": "draft"                          // draft | publish | pending
// }

import { readFile } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";

// Load .env.local (gitignored) so WP_USER / WP_APP_PASSWORD are available
// without relying on Next.js. No-op if the file is absent.
try {
  process.loadEnvFile(resolve(process.cwd(), ".env.local"));
} catch {}

const REST_BASE = process.env.WP_REST_URL || "https://backend.thebelievehouse.com/wp-json";
const USER = process.env.WP_USER;
const APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!USER || !APP_PASSWORD) {
  console.error(
    "Missing credentials. Set WP_USER and WP_APP_PASSWORD in the environment (e.g. .env.local)."
  );
  process.exit(1);
}

const authHeader = "Basic " + Buffer.from(`${USER}:${APP_PASSWORD}`).toString("base64");

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

async function uploadMedia(imagePath, altText) {
  const abs = resolve(process.cwd(), imagePath);
  const buf = await readFile(abs);
  const name = basename(imagePath);
  const type = MIME[extname(imagePath).toLowerCase()] || "application/octet-stream";

  const res = await fetch(`${REST_BASE}/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(name)}"`,
    },
    body: buf,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Media upload failed (${res.status}): ${JSON.stringify(json)}`);
  }
  // Best-effort: set alt text on the media item for SEO/accessibility.
  if (altText) {
    await fetch(`${REST_BASE}/wp/v2/media/${json.id}`, {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({ alt_text: altText }),
    }).catch(() => {});
  }
  return json.id;
}

async function createPost(article, featuredMediaId) {
  const body = {
    title: article.title,
    slug: article.slug,
    content: article.contentHtml,
    excerpt: article.excerpt || "",
    status: article.status || "draft",
    // Yoast picks these up when its meta is REST-exposed; excerpt is the safe fallback.
    meta: {
      _yoast_wpseo_title: article.title,
      _yoast_wpseo_metadesc: article.excerpt || "",
      _yoast_wpseo_focuskw: article.focusKeyword || "",
    },
  };
  if (featuredMediaId) body.featured_media = featuredMediaId;

  const res = await fetch(`${REST_BASE}/wp/v2/posts`, {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Post create failed (${res.status}): ${JSON.stringify(json)}`);
  }
  return json;
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node scripts/publish-post.mjs <article.json>");
    process.exit(1);
  }
  const article = JSON.parse(await readFile(resolve(process.cwd(), file), "utf8"));

  if (!article.title || !article.contentHtml) {
    console.error("article.json must include at least `title` and `contentHtml`.");
    process.exit(1);
  }

  let mediaId;
  if (article.imagePath) {
    try {
      mediaId = await uploadMedia(article.imagePath, article.imageAlt);
      console.log(`Uploaded image -> media id ${mediaId}`);
    } catch (e) {
      console.warn(`Image upload skipped: ${e.message}`);
    }
  }

  const post = await createPost(article, mediaId);
  console.log(
    `OK: created post #${post.id} (status: ${post.status})\n` +
      `  edit:    ${REST_BASE.replace(/\/wp-json$/, "")}/wp-admin/post.php?post=${post.id}&action=edit\n` +
      `  preview: ${post.link}`
  );
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
