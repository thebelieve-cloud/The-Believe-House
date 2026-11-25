import Link from "next/link";

// การ์ดบทความ ใช้ร่วมกันในหน้า /blog, หน้าหมวด และ "บทความที่เกี่ยวข้อง"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostCard({ post, headingLevel = "h2" }: { post: any; headingLevel?: "h2" | "h3" }) {
    const Heading = headingLevel;
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 flex flex-col"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                {post.featuredImage?.node?.sourceUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        loading="lazy"
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
                    {post.categories?.nodes?.[0]?.name && (
                        <span className="text-gray-400 font-normal"> · {post.categories.nodes[0].name}</span>
                    )}
                </p>
                <Heading className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                </Heading>
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
    );
}
