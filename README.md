# The Believe House — เว็บไซต์โครงการบ้านจัดสรร สามพราน

เว็บ: https://thebelievehouse.com · หลังบ้านบทความ (WordPress): https://backend.thebelievehouse.com

สร้างด้วย Next.js 16 + React 19 + Tailwind CSS 4 ส่วนบทความในหน้า `/blog` ดึงจาก WordPress ผ่าน WPGraphQL

## ติดตั้งบนคอมเครื่องใหม่

ต้องมี **Node.js 20.12 ขึ้นไป** (แนะนำ 22 LTS) และ Git

```bash
git clone https://github.com/thebelieve-cloud/The-Believe-House.git
cd The-Believe-House
npm install
npm run dev          # เปิด http://localhost:3000
```

แค่นี้ก็รันเว็บได้แล้ว ส่วนด้านล่างจำเป็นเฉพาะบางงาน

### 1. ไฟล์รหัสผ่าน `.env.local` (ใช้ตอนโพสต์บทความ)

ไฟล์นี้ไม่ได้อยู่บน GitHub เพราะมีรหัสผ่าน WordPress

```bash
cp .env.example .env.local
```

แล้วเติมค่า `WP_USER` / `WP_APP_PASSWORD` โดยคัดลอกจากเครื่องเดิม
หรือสร้าง Application Password ใหม่ใน WordPress (Users > Profile)

### 2. ไฟล์ดิบ (รูปต้นฉบับ / วิดีโอ) — ต้องย้ายเอง

ไฟล์เหล่านี้ใหญ่เกินกว่าจะเก็บใน GitHub (บางไฟล์เกิน 100MB ซึ่ง GitHub ไม่รับ)
จึงต้องคัดลอกจากเครื่องเดิมผ่าน Google Drive / AirDrop / external drive
แล้ววางไว้ที่ตำแหน่งเดิมในโฟลเดอร์โปรเจกต์ (git จะไม่สนใจไฟล์พวกนี้อยู่แล้ว)

| โฟลเดอร์ | ขนาดโดยประมาณ | เนื้อหา |
| --- | --- | --- |
| `The Believe/` | 1 GB | วิดีโอ .mov, ไฟล์ตัดต่อ, รูปการตลาด |
| `asset/Vera ทาวน์แฝด/`, `asset/ดูบ้าน Vera/` | ~490 MB | รูปต้นฉบับบ้าน Vera |
| `asset/Venita บ้านแฝด/`, `asset/ดูบ้าน Venita/` | ~75 MB | รูปต้นฉบับบ้าน Venita |
| `asset/รูปภาพโครงการ/` | ~36 MB | รูปโครงการ |

และย้ายไฟล์ `asset/Venita บ้านแฝด-....zip` (84 MB) ไปด้วย ในนั้นมีรูป Venita ครบ 26 รูป
บางรูป (3000, 3004, 3005) ไม่มีในโฟลเดอร์อื่น

ไม่มีไฟล์ดิบเหล่านี้เว็บก็ยังทำงานได้ เพราะเว็บใช้รูปที่ย่อขนาดแล้วใน `public/`

### 3. สิทธิ์ push ขึ้น GitHub

repo นี้อยู่ใต้บัญชี `thebelieve-cloud` จึง push ได้เฉพาะบัญชีที่มีสิทธิ์เขียน repo นี้

1. login GitHub ด้วยบัญชี thebelieve-cloud → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**
   - Repository access: **Only select repositories** → `The-Believe-House`
   - Permissions: **Contents → Read and write**
2. ให้โฟลเดอร์โปรเจกต์ push ด้วยบัญชีนี้

   ```bash
   git remote set-url origin https://thebelieve-cloud@github.com/thebelieve-cloud/The-Believe-House.git
   ```

3. `git push` ครั้งแรกจะถาม Password ให้วาง token ลงไป (พิมพ์แล้วจะไม่เห็นตัวอักษร ซึ่งเป็นเรื่องปกติ)
   หลังจากนั้น macOS จะจำไว้ใน Keychain

## โครงสร้างโปรเจกต์

```
src/app/              หน้าเว็บ (หน้าแรก, /blog, /houses/[slug], sitemap, robots)
src/components/       ส่วนประกอบหน้าเว็บ (Hero, HouseTypes, Contact, ...)
src/lib/houses.ts     ข้อมูลแบบบ้าน Vera / Venita + รายการรูป gallery
src/lib/wordpress.ts  ดึงบทความจาก WordPress (GraphQL)
public/               รูป/วิดีโอที่เว็บใช้จริง (ย่อขนาดแล้ว)
  public/asset/       รูปหลักของเว็บ
  public/houses/      รูป gallery ของแต่ละแบบบ้าน
asset/                รูปสำหรับทำบทความบล็อก (รูปภาพหน้าปกบทความ)
content/              brief บทความ + บทความที่สร้างไว้ (content/pending/)
scripts/              สคริปต์โพสต์บทความไป WordPress
```

> รูปที่จะแสดงบนเว็บต้องอยู่ใน `public/` (เรียกใช้เป็น `/asset/...` หรือ `/houses/...`)
> ส่วนโฟลเดอร์ `asset/` ที่อยู่นอก `public/` เป็นคลังรูปสำหรับบทความบล็อก

## โพสต์บทความบล็อก

```bash
node scripts/publish-post.mjs content/pending/<ไฟล์บทความ>.json
```

- สร้างโพสต์เป็น **draft** ใน WordPress เพื่อให้ตรวจก่อนกดเผยแพร่เอง
- แนวทางเขียน (keyword, หัวข้อ, รูป, โครงสร้าง) อยู่ใน [`content/article-brief.md`](content/article-brief.md)
- งานเขียนบทความอัตโนมัติ (Claude scheduled task ทุกจันทร์/ศุกร์ 09:00) มีคำสั่งเก็บไว้ที่
  [`content/auto-blog-task.md`](content/auto-blog-task.md) ถ้าจะตั้งบนเครื่องใหม่
  ให้แก้ path ของ working directory ในไฟล์นั้นให้ตรงกับเครื่องใหม่ก่อน

## การ deploy

เว็บโฮสต์บน **Vercel** โดยปกติเมื่อ push ขึ้น branch `main` บน GitHub แล้ว Vercel จะ deploy ให้อัตโนมัติ
(ดูสถานะได้ใน Vercel dashboard)

```bash
npm run build   # ทดสอบ build ในเครื่องก่อน push
npm run lint
```
