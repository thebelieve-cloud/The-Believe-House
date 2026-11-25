import { getAllPosts, getCategories } from "@/lib/wordpress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";
import type { Metadata } from "next";

// ดึงบทความใหม่ทุก 10 นาที (ไม่ต้องรอ WordPress ทุกครั้งที่มีคนเข้า)
export const revalidate = 600;

export const metadata: Metadata = {
    // layout เติม " | The Believe House สามพราน" ให้เองจาก title.template
    title: "บทความเรื่องบ้านและการซื้อบ้านสามพราน",
    description: "อัปเดตข่าวสารและบทความน่ารู้เกี่ยวกับบ้านและการอยู่อาศัย จากโครงการ The Believe House สามพราน",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "บทความเรื่องบ้านและการซื้อบ้านสามพราน | The Believe House",
        description: "อัปเดตข่าวสารและบทความน่ารู้เกี่ยวกับบ้านและการอยู่อาศัย จากโครงการ The Believe House สามพราน",
        url: "/blog",
    },
};

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);

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

                    <CategoryNav categories={categories} />

                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">ยังไม่มีบทความในขณะนี้</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {posts.map((post: any) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
