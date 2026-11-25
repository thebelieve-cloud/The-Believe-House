import { MetadataRoute } from 'next';
import { houses } from '@/lib/houses';
import { getAllPostSlugs, getCategories } from '@/lib/wordpress';
import { activePromotions } from '@/lib/promotions';

// สร้าง sitemap ใหม่ทุก 10 นาที เพื่อให้บทความที่ลงใหม่ใน WordPress เข้า sitemap เอง
export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://thebelievehouse.com';
    const [posts, categories] = await Promise.all([getAllPostSlugs(), getCategories()]);
    const latestPost = posts.reduce<string | undefined>(
        (max, p) => (!max || p.modified > max ? p.modified : max),
        undefined,
    );

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...houses.map((house) => ({
            url: `${baseUrl}/houses/${house.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
        // หน้าโปรโมชันใส่ใน sitemap เฉพาะช่วงที่มีโปร (ช่วงไม่มีโปร หน้านี้ตั้ง noindex)
        ...(activePromotions().length > 0
            ? [{ url: `${baseUrl}/promotion`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 }]
            : []),
        {
            url: `${baseUrl}/blog`,
            lastModified: latestPost ? new Date(latestPost) : new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...categories.map((c) => ({
            url: `${baseUrl}/blog/category/${c.slug}`,
            lastModified: latestPost ? new Date(latestPost) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        })),
        ...posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.modified),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];
}
