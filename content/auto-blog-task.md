---
name: believe-auto-blog
description: Generate and publish one SEO blog draft for The Believe House (Sampran) every Mon & Fri 09:00
---

<!--
สำเนาคำสั่งของ Claude scheduled task "believe-auto-blog" (ทุกจันทร์/ศุกร์ 09:00)
ถ้าจะตั้งบนเครื่องใหม่: สร้าง scheduled task ใหม่ใน Claude แล้ววางเนื้อหาไฟล์นี้
และแก้ WORKING DIRECTORY ด้านล่างให้เป็น path ของโฟลเดอร์โปรเจกต์บนเครื่องนั้น
อย่าเปิดให้ทำงานพร้อมกันสองเครื่อง ไม่อย่างนั้นจะได้ draft ซ้ำ
-->

You are generating one SEO blog article for "The Believe House" — a housing development (บ้านจัดสรร) in สามพราน — and publishing it to WordPress AS A DRAFT for human review. Do NOT publish it live.

WORKING DIRECTORY (cd here first): <path to the project folder on this computer>

STEPS:
1. Read `content/article-brief.md` — it contains the target keywords, the rotating topic pool, the image pool, and the required article structure. Follow it closely.

2. Avoid duplicate topics. Fetch the titles of existing posts so you don't repeat one:
   curl -s https://backend.thebelievehouse.com/graphql -H "Content-Type: application/json" -d '{"query":"{posts(first:50){nodes{title slug}}}"}'
   Pick the next topic from the brief's rotation pool that is NOT already covered by an existing title. Also check `content/pending/` for JSON files already generated recently and avoid repeating those topics/images.

3. Write a genuinely useful ~700–900 word Thai article (quality over keyword-stuffing — Google penalises thin scaled content). Requirements from the brief:
   - Title contains a primary keyword (บ้านสามพราน / บ้านจัดสรร สามพราน / บ้าน สามพราน) near the front, < 60 chars.
   - A primary keyword appears naturally in the first ~100 characters of the body.
   - 3–5 <h2> sections, short paragraphs, at least one <ul> list.
   - One internal link to https://thebelievehouse.com with descriptive anchor text.
   - A closing CTA to contact / visit the project (tel 0909492492).
   - Natural keyword density (~0.5–1.5%). Do not stuff.

4. Pick a rotating image from the `asset/` folder (see the brief's image pool). Do NOT reuse the image used in the most recent `content/pending/` JSON. Write truthful alt text that includes a keyword when natural.

5. Write the article to `content/pending/<YYYY-MM-DD>-<slug>.json` matching the publish-post.mjs contract exactly:
   { "title", "slug", "contentHtml", "excerpt" (140–155 chars, includes a primary keyword), "focusKeyword", "imagePath", "imageAlt", "status": "draft" }

6. Publish it as a draft:
   node scripts/publish-post.mjs content/pending/<that-file>.json
   The script reads WordPress credentials from `.env.local` (already configured) and creates the post with status=draft.

7. Report the created draft's edit URL (printed by the script) so it can be reviewed and published manually.

IMPORTANT: status must be "draft". Never set it to "publish". If the publish script errors (e.g. auth), report the exact error and stop — do not retry blindly.