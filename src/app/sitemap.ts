import { MetadataRoute } from 'next';

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
        // สามารถเพิ่มหน้าอื่นๆ ได้ในอนาคต เช่น
        // {
        //   url: `${baseUrl}/about`,
        //   lastModified: new Date(),
        //   changeFrequency: 'monthly',
        //   priority: 0.8,
        // },
        // {
        //   url: `${baseUrl}/contact`,
        //   lastModified: new Date(),
        //   changeFrequency: 'monthly',
        //   priority: 0.8,
        // },
    ];
}
