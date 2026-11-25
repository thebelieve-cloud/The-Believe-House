import { getAllPosts, getCategories } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";
import { breadcrumbLd, ldJson, plainText, SITE_URL } from "@/lib/jsonld";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// หน้าหมวดบทความ เช่น /blog/category/home-loan  (ข้อมูลหมวดมาจาก WordPress)
export const revalidate = 600;

async function findCategory(slug: string) {
    const categories = await getCategories();
    return { categories, category: categories.find((c) => c.slug === decodeURIComponent(slug)) };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { category } = await findCategory(slug);
    if (!category) return { title: "ไม่พบหมวดบทความ" };

    const path = `/blog/category/${category.slug}`;
    const title = category.name.includes("สามพราน") ? `บทความ${category.name}` : `บทความ${category.name} บ้านสามพราน`;
    const description =
        plainText(category.description) || `รวมบทความหมวด${category.name} จากโครงการ The Believe House สามพราน`;
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { title: `${title} | The Believe House`, description, url: path },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [{ categories, category }, allPosts] = await Promise.all([findCategory(slug), getAllPosts()]);
    if (!category) notFound();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts = allPosts.filter((p: any) => p.categories?.nodes?.some((c: { slug: string }) => c.slug === category.slug));
    const path = `/blog/category/${category.slug}`;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson(breadcrumbLd([
                    { name: "หน้าแรก", path: "/" },
                    { name: "บทความ", path: "/blog" },
                    { name: category.name, path },
                ]))}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: `บทความ${category.name}`,
                    url: `${SITE_URL}${path}`,
                    inLanguage: "th-TH",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    hasPart: posts.map((p: any) => ({ "@type": "BlogPosting", headline: plainText(p.title), url: `${SITE_URL}/blog/${p.slug}` })),
                })}
            />
            <Navbar />

            <section className="flex-grow py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                    <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-6 mt-10 text-center">
                        <Link href="/" className="hover:text-primary">หน้าแรก</Link>
                        <span className="mx-2">/</span>
                        <Link href="/blog" className="hover:text-primary">บทความ</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-700">{category.name}</span>
                    </nav>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{category.name}</h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                        {category.description && (
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-4 font-light">{plainText(category.description)}</p>
                        )}
                    </div>

                    <CategoryNav categories={categories} active={category.slug} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {posts.map((post: any) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
