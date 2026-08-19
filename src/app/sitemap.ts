import { MetadataRoute } from 'next';
import { houses } from '@/lib/houses';

export default function sitemap(): MetadataRoute.Sitemap {
    // URLs สำหรับหน้าเว็บหลัก
    const baseUrl = 'https://thebelievehouse.com';

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
    ];
}
