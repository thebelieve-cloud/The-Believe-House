import { getPostBySlug } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "บทความไม่พบ | The Believe House",
        };
    }

    return {
        title: `${post.seo?.title || post.title} | The Believe House`,
        description: post.seo?.metaDesc || post.excerpt?.replace(/<[^>]+>/g, '') || "บทความจาก The Believe House",
        openGraph: {
            title: post.title,
            description: post.seo?.metaDesc || "บทความจาก The Believe House",
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
                        className="prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:font-light prose-a:text-primary hover:prose-a:text-amber-700 prose-img:rounded-2xl prose-img:shadow-md mt-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                </div>
            </article>

            <Footer />
        </main>
    );
}
