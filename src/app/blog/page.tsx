import { getAllPosts } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
    title: "บทความและข่าวสาร | The Believe House",
    description: "อัปเดตข่าวสารและบทความน่ารู้เกี่ยวกับบ้านและการอยู่อาศัย จากโครงการ The Believe House สามพราน",
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col pt-20">
            <Navbar />

            <section className="flex-grow py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-10">บทความ & ข่าวสาร</h1>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-4 font-light">
                            อัปเดตความเคลื่อนไหว สาระน่ารู้ และแรงบันดาลใจในการตกแต่งบ้าน
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">ยังไม่มีบทความในขณะนี้</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post: any) => (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 flex flex-col"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                        {post.featuredImage?.node?.sourceUrl ? (
                                            <img
                                                src={post.featuredImage.node.sourceUrl}
                                                alt={post.featuredImage.node.altText || post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <span className="text-gray-400">The Believe House</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <p className="text-sm text-primary font-semibold mb-3">
                                            {new Date(post.date).toLocaleDateString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <div
                                            className="text-gray-500 font-light line-clamp-3 mb-6 flex-grow"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                        />
                                        <div className="text-primary font-medium flex items-center mt-auto">
                                            อ่านเพิ่มเติม
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
