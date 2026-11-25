// ข้อมูลโปรโมชันของโครงการ
// เพิ่มโปรใหม่: ใส่รูปไว้ที่ public/promotions/ แล้วเพิ่ม object ในรายการด้านล่าง
// โปรที่เลยวันหมดเขต (endsAt) จะถูกซ่อนจากเว็บเองอัตโนมัติ

export type Promotion = {
    slug: string;             // ใช้เป็น id ของการ์ด (#slug) บนหน้า /promotion
    title: string;            // ชื่อโปร (ข้อความจริง ให้ Google อ่านได้)
    summary: string;          // คำอธิบายสั้น 1-2 บรรทัด
    highlights: string[];     // จุดเด่นของโปร
    conditions: string[];     // เงื่อนไข (แสดงบนหน้า /promotion)
    image: string;            // รูปแบนเนอร์ใน public/
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
    houseType?: "vera" | "venita";
    startsAt?: string;        // ISO date เวลาไทย เช่น "2026-11-01T00:00:00+07:00"
    endsAt: string;           // ISO date เวลาไทย เช่น "2026-11-30T23:59:59+07:00"
};

export const promotions: Promotion[] = [
    {
        slug: "megasale-1111-iphone",
        title: "11.11 MEGA SALE ซื้อบ้านทาวน์แฝด แถม iPhone",
        summary: "จองทาวน์แฝด VERA ในเดือนพฤศจิกายน 2569 รับ iPhone Duo 256 GB มูลค่า 79,900 บาท",
        highlights: [
            "แถม iPhone Duo ความจุ 256 GB มูลค่า 79,900 บาท",
            "สำหรับบ้านทาวน์แฝด VERA",
            "เฉพาะผู้ที่จองภายในเดือนพฤศจิกายน 2569",
        ],
        conditions: [
            "เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด",
            "กรณีของแถมหมด บริษัทฯ ขอสงวนสิทธิ์เปลี่ยนเป็นสินค้าหรือสิทธิประโยชน์อื่นที่มีมูลค่าเทียบเท่า",
        ],
        image: "/promotions/megasale-1111-iphone-v2.jpg",
        imageAlt: "โปรโมชัน 11.11 MEGA SALE ซื้อบ้านทาวน์แฝด The Believe House สามพราน แถม iPhone Duo 256 GB",
        imageWidth: 1080,
        imageHeight: 1350,
        houseType: "vera",
        startsAt: "2026-11-01T00:00:00+07:00",
        endsAt: "2026-11-30T23:59:59+07:00",
    },
    {
        slug: "supersale-1111-free-moving",
        title: "11.11 SUPER SALE ฟรีค่าบริการขนย้ายเข้าบ้านใหม่",
        summary: "จองบ้านในเดือนพฤศจิกายน 2569 รับฟรีค่าบริการขนย้ายเข้าบ้านใหม่ มูลค่า 5,000 บาท",
        highlights: [
            "ฟรีค่าบริการขนย้ายเข้าบ้านใหม่ มูลค่า 5,000 บาท",
            "เฉพาะผู้ที่จองภายในเดือนพฤศจิกายน 2569",
            "หมดเขต 30 พฤศจิกายน 2569",
        ],
        conditions: ["เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด"],
        image: "/promotions/supersale-1111-free-moving.jpg",
        imageAlt: "โปรโมชัน 11.11 SUPER SALE The Believe House สามพราน ฟรีค่าบริการขนย้ายเข้าบ้านใหม่ มูลค่า 5,000 บาท",
        imageWidth: 1080,
        imageHeight: 1350,
        startsAt: "2026-11-01T00:00:00+07:00",
        endsAt: "2026-11-30T23:59:59+07:00",
    },
];

// โปรที่ยังไม่หมดเขต (และเริ่มแล้ว) ณ เวลาที่สร้างหน้า
export function activePromotions(now: Date = new Date()): Promotion[] {
    return promotions.filter(
        (p) => new Date(p.endsAt) >= now && (!p.startsAt || new Date(p.startsAt) <= now),
    );
}

// "30 พฤศจิกายน 2569"
export function thaiDate(iso: string): string {
    return new Date(iso).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Bangkok",
    });
}
