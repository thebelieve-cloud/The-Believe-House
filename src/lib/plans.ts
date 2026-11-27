// แบบแปลนบ้าน (ภาพจากโบรชัวร์ "โบรชัวร์ (แบบสมุด) edit 281168.pdf" หน้า 3-4)
// รูปอยู่ใน public/plans/  ตัวเลขพื้นที่/ที่ดินจากข้อมูลโครงการ ส่วนห้อง/ที่จอด/จุดเด่นจากโบรชัวร์

export type PlanView = { key: "facade" | "floor-1" | "floor-2"; label: string; src: string; alt: string; width: number; height: number };

export type HousePlan = {
    slug: "vera" | "venita";
    name: string;
    nameTh: string;
    type: string;
    tagline: string;
    area: string;
    land: string;
    beds: number;
    baths: number;
    cars: number;
    extra: string;
    views: PlanView[];
};

export const PLAN_NOTE =
    "รายละเอียดแปลนและรูปแบบบ้านใช้เพื่อเป็นแนวทาง สีและวัสดุเป็นไปตามแต่ละโครงการ ภาพเป็นภาพจำลอง ท่านสามารถดูรายละเอียดบ้านหลังจริงได้ที่โครงการ";

export const housePlans: HousePlan[] = [
    {
        slug: "vera",
        name: "VERA",
        nameTh: "เวร่า",
        type: "ทาวน์แฝด 2 ชั้น",
        tagline: "บ้านที่เราเชื่อว่า...ความคุ้มค่า นั้นมีอยู่จริง",
        area: "100 ตร.ม.",
        land: "21 หรือ 28 ตร.ว.",
        beds: 3,
        baths: 2,
        cars: 2,
        extra: "ระเบียงวิวสวน 1 จุด",
        views: [
            { key: "facade", label: "ภาพบ้าน", src: "/plans/vera-facade.jpg", alt: "ภาพจำลองบ้าน VERA ทาวน์แฝด The Believe House สามพราน", width: 1600, height: 626 },
            { key: "floor-1", label: "แปลนชั้น 1", src: "/plans/vera-floor-1.jpg", alt: "แปลนชั้น 1 ทาวน์แฝด VERA ห้องนั่งเล่น ครัว และที่จอดรถ", width: 956, height: 1006 },
            { key: "floor-2", label: "แปลนชั้น 2", src: "/plans/vera-floor-2.jpg", alt: "แปลนชั้น 2 ทาวน์แฝด VERA 3 ห้องนอน 2 ห้องน้ำ", width: 968, height: 1006 },
        ],
    },
    {
        slug: "venita",
        name: "VENITA",
        nameTh: "เวนิต้า",
        type: "บ้านแฝด 2 ชั้น",
        tagline: "บ้านที่เราเชื่อว่า...ลงตัวและตอบสนองทุกความต้องการ",
        area: "140 ตร.ม.",
        land: "38.5 หรือ 39.5 ตร.ว.",
        beds: 3,
        baths: 3,
        cars: 2,
        extra: "2 ห้องครัว (มีครัวไทยนอกบ้าน)",
        views: [
            { key: "facade", label: "ภาพบ้าน", src: "/plans/venita-facade.jpg", alt: "ภาพจำลองบ้าน VENITA บ้านแฝด The Believe House สามพราน", width: 1600, height: 626 },
            { key: "floor-1", label: "แปลนชั้น 1", src: "/plans/venita-floor-1.jpg", alt: "แปลนชั้น 1 บ้านแฝด VENITA ห้องนั่งเล่น ครัว และที่จอดรถ 2 คัน", width: 1038, height: 796 },
            { key: "floor-2", label: "แปลนชั้น 2", src: "/plans/venita-floor-2.jpg", alt: "แปลนชั้น 2 บ้านแฝด VENITA 3 ห้องนอน", width: 1058, height: 796 },
        ],
    },
];
