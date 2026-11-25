// สถานที่ใกล้โครงการ The Believe House (ซอยสามพราน 13)
// km / min = ระยะขับรถและเวลาโดยประมาณ จาก Google Maps เส้นทางที่เร็วที่สุด วัดจากหมุดโครงการ
// ตรวจสอบเมื่อ 25 พ.ย. 2569  (ยกเว้น ถนนเพชรเกษม ใช้ข้อมูลโครงการ "ห่างประมาณ 500 เมตร")
// แสดงเฉพาะสถานที่ไม่เกิน MAX_KM (ผู้ใช้กำหนด 20 กม.) เรียงจากใกล้ไปไกลอัตโนมัติ

export type NearbyPlace = { name: string; km: number; min?: number };
export type NearbyCategory = {
    key: "transport" | "lifestyle" | "hospital" | "education";
    title: string;
    places: NearbyPlace[];
};

export const MAX_KM = 20;
export const NEARBY_CHECKED_AT = "25 พฤศจิกายน 2569";

const all: NearbyCategory[] = [
    {
        key: "transport",
        title: "การเดินทาง",
        places: [
            { name: "ถนนเพชรเกษม", km: 0.5 },
            { name: "แยกสามพราน", km: 3.7, min: 7 },
            { name: "แยกวัดไร่ขิง", km: 6.6, min: 9 },
            { name: "สถานีรถไฟวัดงิ้วราย", km: 12.3, min: 17 },
            { name: "แยกพุทธมณฑลสาย 5", km: 14.5, min: 21 },
            { name: "แยกอ้อมน้อย", km: 14.6, min: 20 },
        ],
    },
    {
        key: "lifestyle",
        title: "ช้อปปิ้ง & ไลฟ์สไตล์",
        places: [
            { name: "ตลาดสดสามพราน", km: 2.1, min: 5 },
            { name: "ตลาดนัดขุนแผน (แยกสามพราน)", km: 3.9, min: 7 },
            { name: "สวนสามพราน", km: 7.9, min: 11 },
            { name: "วัดไร่ขิง", km: 9.1, min: 14 },
            { name: "เซ็นทรัล ศาลายา", km: 14.3, min: 14 },
            { name: "ตลาดน้ำดอนหวาย", km: 16.7, min: 21 },
            { name: "แม็คโคร ศาลายา", km: 19.2, min: 22 },
            { name: "โลตัส ศาลายา", km: 19.5, min: 24 },
        ],
    },
    {
        key: "hospital",
        title: "โรงพยาบาล",
        places: [
            { name: "รพ.เมตตาประชารักษ์ (วัดไร่ขิง)", km: 8.9, min: 15 },
            { name: "รพ.สามพราน", km: 9.5, min: 15 },
            { name: "รพ.วิชัยเวช อินเตอร์เนชั่นแนล อ้อมน้อย", km: 14.1, min: 20 },
            { name: "รพ.พุทธมณฑล", km: 16.9, min: 20 },
            { name: "รพ.นครปฐม", km: 18.5, min: 21 },
            { name: "รพ.ศาลายา", km: 19.3, min: 23 },
        ],
    },
    {
        key: "education",
        title: "สถานศึกษา",
        places: [
            { name: "ร.ร.สุคนธีรวิทย์", km: 1.1, min: 2 },
            { name: "ร.ร.นาคประสิทธิ์", km: 2.5, min: 5 },
            { name: "ร.ร.สามพรานวิทยา", km: 4.3, min: 8 },
            { name: "ร.ร.มารีย์อุปถัมภ์", km: 11.6, min: 18 },
        ],
    },
];

export const nearby: NearbyCategory[] = all.map((c) => ({
    ...c,
    places: c.places.filter((p) => p.km <= MAX_KM).sort((a, b) => a.km - b.km),
}));

// 0.5 -> "500 ม.", 2.1 -> "2.1 กม."
export function formatDistance(km: number): string {
    return km < 1 ? `${Math.round(km * 1000)} ม.` : `${km.toFixed(1)} กม.`;
}
