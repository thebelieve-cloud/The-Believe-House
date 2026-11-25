// โครงสร้างข้อมูล (JSON-LD) ให้ Google เข้าใจหน้าเว็บ: บทความ, เส้นทางหน้า (breadcrumb), คำถามที่พบบ่อย, แบบบ้าน

export const SITE_URL = "https://thebelievehouse.com";
const ORG = {
    "@type": "Organization",
    name: "The Believe House สามพราน",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/asset/the%20believe%20logo.jpg` },
};

// ตัดแท็ก HTML และแปลง entity ให้เป็นข้อความธรรมดา
export function plainText(html?: string | null): string {
    if (!html) return "";
    return html
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<[^>]+>/g, "")
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#039;|&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/\[&hellip;\]|&hellip;/g, "…")
        .replace(/\s+/g, " ")
        .trim();
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${SITE_URL}${it.path}`,
        })),
    };
}

export function blogPostingLd(p: {
    title: string; description: string; path: string; image?: string; datePublished?: string; dateModified?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title.slice(0, 110),
        description: p.description,
        url: `${SITE_URL}${p.path}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${p.path}` },
        ...(p.image ? { image: [p.image] } : {}),
        ...(p.datePublished ? { datePublished: toIso(p.datePublished) } : {}),
        ...(p.dateModified ? { dateModified: toIso(p.dateModified) } : {}),
        inLanguage: "th-TH",
        author: ORG,
        publisher: ORG,
    };
}

// WPGraphQL ส่งวันที่เป็นเวลา UTC แบบไม่มีโซนเวลา (เช่น 02:20 = 09:20 เวลาไทย) จึงเติม Z
function toIso(d: string) {
    return /[zZ]|[+-]\d\d:?\d\d$/.test(d) ? d : `${d}Z`;
}

// ดึงคำถาม-คำตอบจากส่วน "คำถามที่พบบ่อย" ในบทความ
// รูปแบบในบทความ: <h2|h3>คำถามที่พบบ่อย</h..> ตามด้วย <p><strong>คำถาม?</strong><br />คำตอบ</p>
export function faqLd(html?: string | null) {
    if (!html) return null;
    const start = html.search(/<h[2-4][^>]*>[^<]*คำถามที่พบบ่อย/);
    if (start < 0) return null;
    const section = html.slice(start).replace(/^<h[2-4][^>]*>[\s\S]*?<\/h[2-4]>/, "");
    const end = section.search(/<h[2-4][\s>]/);
    const body = end >= 0 ? section.slice(0, end) : section;
    const qa: { q: string; a: string }[] = [];
    for (const m of body.matchAll(/<p[^>]*>\s*<strong>([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?([\s\S]*?)<\/p>/g)) {
        const q = plainText(m[1]);
        const a = plainText(m[2]);
        if (q && a) qa.push({ q, a });
    }
    if (qa.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: qa.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
        })),
    };
}

// ใช้กับ <script type="application/ld+json"> ป้องกัน "</script>" ในข้อความหลุดออกนอกแท็ก
export function ldJson(data: unknown) {
    return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
