import { getPostBySlug } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// ดึงบทความใหม่ทุก 10 นาที
export const revalidate = 600;

// ตัดแท็ก HTML และแปลง &amp; / &#8211; ฯลฯ ให้เป็นข้อความธรรมดา (ใช้ใน title/description)
function cleanText(html?: string | null): string {
    if (!html) return "";
    return html
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "บทความไม่พบ | The Believe House",
        };
    }

    // Yoast ใส่ชื่อเว็บหลังบ้านต่อท้าย (" - backend.thebelievehouse.com") ต้องตัดออก
    // layout เติม " | The Believe House สามพราน" ให้เองจาก title.template
    const title = cleanText(post.seo?.title || post.title)
        .replace(/\s*[-|–]\s*backend\.thebelievehouse\.com.*$/i, "")
        .replace(/\s*[-|–]\s*The Believe House.*$/i, "")
        || cleanText(post.title);
    const description =
        cleanText(post.seo?.metaDesc) || cleanText(post.excerpt).slice(0, 160) || "บทความจาก The Believe House สามพราน";
    const url = `/blog/${post.slug || slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "article",
            url,
            title,
            description,
            publishedTime: post.date,
            modifiedTime: post.modified,
            images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
        },
    };
}

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white flex flex-col pt-20">
            <Navbar />

            <article className="flex-grow py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12 max-w-4xl">

                    <Link href="/blog" className="inline-flex items-center text-primary font-medium hover:text-amber-700 transition-colors mb-8 group">
                        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                        กลับไปหน้าบทความ
                    </Link>

                    <header className="mb-12">
                        <p className="text-primary font-semibold tracking-wider text-sm md:text-base mb-4">
                            {new Date(post.date).toLocaleDateString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                            {post.title}
                        </h1>

                        {post.featuredImage?.node?.sourceUrl && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-lg mb-12">
                                <img
                                    src={post.featuredImage.node.sourceUrl}
                                    alt={post.featuredImage.node.altText || post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </header>

                    <div
                        className="article-content mt-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                </div>
            </article>

            <Footer />
        </main>
    );
}
