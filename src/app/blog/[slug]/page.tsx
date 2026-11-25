import { getPostBySlug, getAllPosts } from "@/lib/wordpress";
import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { plainText, blogPostingLd, breadcrumbLd, faqLd, ldJson } from "@/lib/jsonld";

// ดึงบทความใหม่ทุก 10 นาที
export const revalidate = 600;

type Post = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;

// title/description/url ของบทความ ใช้ร่วมกันทั้ง metadata และ JSON-LD
function postSeo(post: Post, slug: string) {
    // Yoast ใส่ชื่อเว็บหลังบ้านต่อท้าย (" - backend.thebelievehouse.com") ต้องตัดออก
    // layout เติม " | The Believe House สามพราน" ให้เองจาก title.template
    const title = plainText(post.seo?.title || post.title)
        .replace(/\s*[-|–]\s*backend\.thebelievehouse\.com.*$/i, "")
        .replace(/\s*[-|–]\s*The Believe House.*$/i, "")
        || plainText(post.title);
    const description =
        plainText(post.seo?.metaDesc) || plainText(post.excerpt).slice(0, 160) || "บทความจาก The Believe House สามพราน";
    return { title, description, url: `/blog/${post.slug || slug}` };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "บทความไม่พบ | The Believe House",
        };
    }

    const { title, description, url } = postSeo(post, slug);

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

    const { title, description, url } = postSeo(post, slug);
    const faq = faqLd(post.content);
    const category: { slug: string; name: string } | undefined = post.categories?.nodes?.find(
        (c: { slug: string }) => c.slug !== "uncategorized",
    );

    // บทความที่เกี่ยวข้อง 3 เรื่อง: หมวดเดียวกันก่อน แล้วเติมด้วยบทความล่าสุด (ลิงก์ภายในช่วย SEO)
    const allPosts = await getAllPosts();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const others = allPosts.filter((p: any) => p.slug !== post.slug);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sameCat = others.filter((p: any) => category && p.categories?.nodes?.some((c: { slug: string }) => c.slug === category.slug));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const related = [...sameCat, ...others.filter((p: any) => !sameCat.includes(p))].slice(0, 3);

    return (
        <main className="min-h-screen bg-white flex flex-col pt-20">
            {/* โครงสร้างข้อมูลให้ Google: บทความ, เส้นทางหน้า, คำถามที่พบบ่อย */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson(blogPostingLd({
                    title, description, path: url,
                    image: post.featuredImage?.node?.sourceUrl,
                    datePublished: post.date, dateModified: post.modified,
                }))}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson(breadcrumbLd([
                    { name: "หน้าแรก", path: "/" },
                    { name: "บทความ", path: "/blog" },
                    ...(category ? [{ name: category.name, path: `/blog/category/${category.slug}` }] : []),
                    { name: title, path: url },
                ]))}
            />
            {faq && <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faq)} />}
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
                            {category && (
                                <>
                                    <span className="text-gray-300 mx-2">|</span>
                                    <Link href={`/blog/category/${category.slug}`} className="hover:text-amber-700 underline-offset-4 hover:underline">
                                        {category.name}
                                    </Link>
                                </>
                            )}
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

            {related.length > 0 && (
                <section aria-labelledby="related-heading" className="bg-gray-50 py-16 md:py-20">
                    <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                        <h2 id="related-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
                            บทความที่เกี่ยวข้อง
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {related.map((p: any) => (
                                <PostCard key={p.id} post={p} headingLevel="h3" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
