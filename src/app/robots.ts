import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://thebelievehouse.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // ตัวอย่างการตั้งค่าไม่ให้ Googlebot เข้าถึงบางโฟลเดอร์
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
