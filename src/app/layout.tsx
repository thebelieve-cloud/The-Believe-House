import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
});

// กำหนด URL ของเว็บไซต์และข้อมูลหลัก
const SITE_URL = "https://thebelievehouse.com";
const SITE_NAME = "The Believe House สามพราน";
const SITE_DESCRIPTION = "สัมผัสประสบการณ์การอยู่อาศัยระดับพรีเมียม โครงการบ้านแฝด และทาวน์แฝด The Believe วัสดุพรีเมียมสร้างด้วยอิฐแดง ทำเลสามพราน 13 ลงทะเบียนรับสิทธิพิเศษ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ความเชื่อที่คุณสัมผัสได้`,
    template: `%s | ${SITE_NAME}`, // สำหรับใช้ในหน้าอื่นๆ เช่น "บทความ | The Believe House สามพราน"
  },
  description: SITE_DESCRIPTION,
  keywords: ["หมู่บ้านสามพราน", "บ้านแฝดสามพราน", "ทาวน์โฮมสามพราน", "The Believe House", "บ้านอิฐแดง", "โครงการใหม่สามพราน"],
  authors: [{ name: "The Believe House" }],

  // Open Graph สำหรับ Facebook / LINE / Social Media
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_URL,
    title: `${SITE_NAME} | ความเชื่อที่คุณสัมผัสได้`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/asset/Head the believe.png", // ภาพปกสำหรับแชร์ (ควรเป็นภาพ 1200x630px)
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} โครงการหมู่บ้านพรีเมียม`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/asset/Head the believe.png"],
  },

  // อื่นๆ สำหรับ SEO
  alternates: {
    canonical: SITE_URL, // บอก Google ว่าหน้าเว็บที่ถูกต้องคือ URL อะไร (ป้องกัน Content ซ้ำ)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // โครงสร้างข้อมูล JSON-LD สำหรับ Google Search (Rich Snippets)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent", // หรือ "Organization"
    "name": SITE_NAME,
    "image": `${SITE_URL}/asset/the believe logo.jpg`,
    "@id": SITE_URL,
    "url": SITE_URL,
    "telephone": "+66944462645",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ทำเลสามพราน 13",
      "addressLocality": "Sam Phran",
      "addressRegion": "Nakhon Pathom",
      "postalCode": "73110",
      "addressCountry": "TH"
    },
    // ลิงก์ Social Media
    "sameAs": [
      "https://www.facebook.com/thebelievehouse"
    ]
  };

  return (
    <html lang="th" className="scroll-smooth">
      <head>
        {/* แทรก JSON-LD ลงใน <head> ของเว็บ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${prompt.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
