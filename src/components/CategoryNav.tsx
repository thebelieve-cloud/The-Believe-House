import Link from "next/link";
import type { BlogCategory } from "@/lib/wordpress";

// แถบหมวดบทความ (ลิงก์ภายในไปหน้าหมวด) แสดงบนหน้า /blog และหน้าหมวด
export default function CategoryNav({ categories, active }: { categories: BlogCategory[]; active?: string }) {
    if (categories.length === 0) return null;
    const base = "px-5 py-2 rounded-full text-sm font-medium transition-colors border";
    const on = "bg-primary text-white border-primary";
    const off = "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary";
    return (
        <nav aria-label="หมวดบทความ" className="flex flex-wrap justify-center gap-3 mb-12">
            <Link href="/blog" className={`${base} ${!active ? on : off}`}>ทั้งหมด</Link>
            {categories.map((c) => (
                <Link key={c.slug} href={`/blog/category/${c.slug}`} className={`${base} ${active === c.slug ? on : off}`}>
                    {c.name} <span className="opacity-70">({c.count})</span>
                </Link>
            ))}
        </nav>
    );
}
