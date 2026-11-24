# Article brief — The Believe House (บ้านจัดสรร สามพราน)

Reference used by the scheduled blog task. Goal: publish genuinely useful,
locally-relevant articles that promote the project and rank for Sampran home
keywords — **not** thin keyword-stuffed filler (Google penalises scaled content abuse).

## Business context
- Project: **The Believe House** — housing development (หมู่บ้านจัดสรร) in สามพราน, Nakhon Pathom.
- Frontend: https://thebelievehouse.com  ·  Blog lives under /blog.
- Tone: warm, trustworthy, helpful to home buyers. Thai language.

## Target keywords
Primary (use naturally, do not stuff):
- `บ้านสามพราน`
- `บ้านจัดสรร สามพราน`
- `บ้าน สามพราน`

Secondary / long-tail (rotate as fits the topic):
- หมู่บ้านสามพราน, บ้านเดี่ยวสามพราน, บ้านใหม่สามพราน, โครงการบ้านสามพราน,
  บ้านใกล้ถนนเพชรเกษม, บ้านนครปฐม, ซื้อบ้านสามพราน, บ้านพร้อมอยู่สามพราน,
  ทำเลสามพราน, ผ่อนบ้านสามพราน, บ้านทาวน์โฮมสามพราน

## Rotating topic pool (pick the next one not already on the blog)
1. ทำไมทำเลสามพรานน่าอยู่ — เดินทาง เข้าเมือง สิ่งอำนวยความสะดวก
2. รีวิวโครงการ The Believe House สามพราน — จุดเด่นที่ควรรู้ก่อนตัดสินใจ
3. บ้านจัดสรร สามพราน vs ปลูกบ้านเอง — ข้อดีข้อเสียเทียบชัด
4. เช็กลิสต์เลือกซื้อบ้านสามพรานให้คุ้มที่สุด
5. ขั้นตอนขอสินเชื่อ/ผ่อนบ้านสามพราน ฉบับมือใหม่
6. วัสดุก่อสร้างคุณภาพของ The Believe House (อิฐแดง ฯลฯ)
7. ไลฟ์สไตล์รอบสามพราน — ตลาด ร้านอาหาร โรงเรียน โรงพยาบาล
8. การเดินทางจากสามพรานเข้ากรุงเทพฯ — เส้นทางและเวลา
9. ฟังก์ชันบ้านที่ครอบครัวยุคใหม่ต้องการ
10. ทำเลใกล้เพชรเกษม/พุทธมณฑล ดีอย่างไรต่อการลงทุน
11. ดูแลบ้านใหม่ปีแรก — เคล็ดลับสำหรับเจ้าของบ้านสามพราน
12. เปรียบเทียบบ้านเดี่ยว vs ทาวน์โฮม ในย่านสามพราน
13. งบเท่าไหร่ถึงมีบ้านสามพรานเป็นของตัวเอง
14. คำถามที่พบบ่อยก่อนซื้อบ้านจัดสรร สามพราน
15. สิ่งแวดล้อมและความปลอดภัยในหมู่บ้านสามพราน
> Before writing, fetch existing post titles (GraphQL, see task prompt) and skip
> any topic already covered. If all covered, write a fresh angle on a primary keyword.

## Image pool (repo `asset/`, committed) — rotate, don't reuse the same one twice in a row
- `asset/หมู่บ้านสามพราน.png` — overview of the development
- `asset/S__71909380.jpg` … `asset/S__71909388.jpg` — project / house photos
- `asset/venita.jpg`, `asset/vera.jpg` — house model exteriors
- `asset/the believe customer1.jpg` … `customer3.jpg` — happy customers / handover
Alt text: describe the project truthfully and include a keyword when natural,
e.g. "บ้านจัดสรร สามพราน โครงการ The Believe House".

## Article structure (aim ~700–900 words)
- **Title**: compelling, contains a primary keyword near the front. < 60 chars if possible.
- **Slug**: lowercase ascii, keyword-based, hyphenated (e.g. `ban-jansan-sampran-checklist`).
- **First paragraph**: include a primary keyword naturally within the first ~100 characters.
- **3–5 `<h2>` sections**, short paragraphs, at least one `<ul>` list.
- **One internal link** to https://thebelievehouse.com (or /#contact) with descriptive anchor.
- **Closing CTA** inviting the reader to contact / visit the project (tel 0909492492).
- Keyword density natural (~0.5–1.5%). Never repeat a keyword awkwardly.
- **Excerpt / meta description**: ~140–155 chars, includes a primary keyword, reads like a human wrote it.

## Output contract
Write the article to a temp JSON file matching `scripts/publish-post.mjs`:
`{ title, slug, contentHtml, excerpt, focusKeyword, imagePath, imageAlt, status: "draft" }`
Then run: `node scripts/publish-post.mjs <that-file.json>`
