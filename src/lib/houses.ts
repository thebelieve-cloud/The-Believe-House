export type House = {
    slug: string;
    name: string;
    nameTh: string;
    type: string;
    area: string;
    beds: number;
    baths: number;
    cars: number;
    description: string;
    tagline: string;
    img: string;
    gallery: string[];
};

export const houses: House[] = [
    {
        slug: "venita",
        name: "Venita",
        nameTh: "เวนิต้า",
        type: "บ้านแฝด",
        area: "140 ตร.ม.",
        beds: 3,
        baths: 3,
        cars: 2,
        description: "บ้านแฝดดีไซน์โปร่งสไตล์โมเดิร์น พร้อมพื้นที่ใช้สอยกว้างขวาง ตอบโจทย์ครอบครัวขยาย",
        tagline: "บ้านที่เราเชื่อว่า...ลงตัวและตอบสนองทุกความต้องการ",
        img: "/asset/venita.jpg",
        gallery: [
            "/houses/venita/venita-3001.jpg",
            "/houses/venita/venita-3002.jpg",
            "/houses/venita/venita-3003.jpg",
            "/houses/venita/venita-3007.jpg",
            "/houses/venita/venita-3009.jpg",
            "/houses/venita/venita-3010.jpg",
            "/houses/venita/venita-3011.jpg",
            "/houses/venita/venita-3012.jpg",
            "/houses/venita/venita-3013.jpg",
            "/houses/venita/venita-3019.jpg",
            "/houses/venita/venita-3020.jpg",
            "/houses/venita/venita-3021.jpg",
            "/houses/venita/venita-3023.jpg",
        ],
    },
    {
        slug: "vera",
        name: "Vera",
        nameTh: "เวร่า",
        type: "บ้านทาวน์แฝด",
        area: "100 ตร.ม.",
        beds: 3,
        baths: 2,
        cars: 2,
        description: "ทาวน์แฝดฟังก์ชันครบครัน รูปแบบใหม่ที่ให้ความรู้สึกว่าความคุ้มค่านั้นมีอยู่จริง",
        tagline: "บ้านที่เราเชื่อว่า...ความคุ้มค่า นั้นมีอยู่จริง",
        img: "/asset/vera.jpg",
        gallery: [
            "/houses/vera/vera-4002.jpg",
            "/houses/vera/vera-4003.jpg",
            "/houses/vera/vera-4004.jpg",
            "/houses/vera/vera-4005.jpg",
            "/houses/vera/vera-4006.jpg",
            "/houses/vera/vera-4017.jpg",
            "/houses/vera/vera-4018.jpg",
            "/houses/vera/vera-4020.jpg",
            "/houses/vera/vera-4023.jpg",
            "/houses/vera/vera-4029.jpg",
            "/houses/vera/vera-4033.jpg",
            "/houses/vera/vera-4035.jpg",
            "/houses/vera/vera-4042.jpg",
            "/houses/vera/vera-4043.jpg",
            "/houses/vera/vera-4048.jpg",
            "/houses/vera/vera-4054.jpg",
            "/houses/vera/vera-4068.jpg",
            "/houses/vera/vera-4070.jpg",
            "/houses/vera/vera-4071.jpg",
            "/houses/vera/vera-4084.jpg",
            "/houses/vera/vera-4085.jpg",
            "/houses/vera/vera-4088.jpg",
            "/houses/vera/vera-4091.jpg",
            "/houses/vera/vera-4118.jpg",
            "/houses/vera/vera-4120.jpg",
            "/houses/vera/vera-4122.jpg",
            "/houses/vera/vera-4123.jpg",
        ],
    },
];

export function getHouse(slug: string): House | undefined {
    return houses.find((h) => h.slug === slug);
}
