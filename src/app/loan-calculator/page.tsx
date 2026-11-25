import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import { breadcrumbLd, ldJson, SITE_URL } from "@/lib/jsonld";

const TITLE = "คำนวณผ่อนบ้าน คำนวณเงินกู้บ้าน สามพราน";
const DESCRIPTION =
    "คำนวณค่าผ่อนบ้านต่อเดือน และวงเงินกู้ที่กู้ได้จากรายได้ แบบลดต้นลดดอก สำหรับบ้านแฝด VENITA และทาวน์แฝด VERA โครงการ The Believe House สามพราน";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/loan-calculator" },
    openGraph: { title: `${TITLE} | The Believe House`, description: DESCRIPTION, url: "/loan-calculator" },
};

const FAQ = [
    {
        q: "ผ่อนบ้าน 3 ล้าน 30 ปี เดือนละเท่าไร?",
        a: "ถ้าดอกเบี้ยเฉลี่ย 3.5% ต่อปี กู้ 3,000,000 บาท 30 ปี จะผ่อนประมาณเดือนละ 13,470 บาท และควรมีรายได้รวมประมาณ 33,700 บาทต่อเดือนขึ้นไป ตัวเลขจริงขึ้นกับอัตราดอกเบี้ยที่ธนาคารอนุมัติ",
    },
    {
        q: "ผ่อนบ้านได้นานสุดกี่ปี?",
        a: "บ้านในโครงการ The Believe House ยื่นกู้กับธนาคารอาคารสงเคราะห์ (ธอส.) ผ่อนได้สูงสุด 40 ปี ระยะเวลาจริงขึ้นกับอายุผู้กู้และเกณฑ์ธนาคาร ยิ่งผ่อนนาน ค่างวดต่อเดือนยิ่งต่ำ แต่ดอกเบี้ยรวมจะสูงขึ้น เช่น กู้ 2,990,000 บาท ดอกเบี้ยเฉลี่ย 3.5% ผ่อน 30 ปี ประมาณเดือนละ 13,426 บาท ส่วนผ่อน 40 ปี ประมาณเดือนละ 11,583 บาท แต่ดอกเบี้ยรวมเพิ่มจากราว 1.84 ล้านบาท เป็นราว 2.57 ล้านบาท",
    },
    {
        q: "ต้องมีรายได้เท่าไรถึงจะกู้บ้านผ่าน?",
        a: "ธนาคารมักดูว่าค่าผ่อนหนี้ทั้งหมดรวมกันไม่ควรเกินประมาณ 40% ของรายได้ต่อเดือน เครื่องคำนวณนี้ใช้เกณฑ์ดังกล่าวในการประมาณ แต่เกณฑ์จริงของแต่ละธนาคารและแต่ละอาชีพอาจต่างกัน",
    },
    {
        q: "ผ่อนแบบลดต้นลดดอกคืออะไร?",
        a: "เป็นการผ่อนเท่ากันทุกงวด โดยดอกเบี้ยคิดจากเงินต้นที่ยังเหลืออยู่ ช่วงแรกค่างวดส่วนใหญ่จะเป็นดอกเบี้ย และเงินต้นจะลดเร็วขึ้นในช่วงหลัง สินเชื่อบ้านในไทยส่วนใหญ่ใช้วิธีนี้",
    },
    {
        q: "โครงการ The Believe House ยื่นกู้กับธนาคารไหนได้บ้าง?",
        a: "ข้อมูลโครงการระบุว่ายื่นกู้ได้กับธนาคารออมสิน ธนาคารกรุงไทย และธนาคารอาคารสงเคราะห์ อัตราดอกเบี้ยและวงเงินขึ้นอยู่กับการพิจารณาของธนาคาร สอบถามฝ่ายขายเพื่อช่วยเตรียมเอกสารได้",
    },
];

export default function LoanCalculatorPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson(breadcrumbLd([
                    { name: "หน้าแรก", path: "/" },
                    { name: "คำนวณผ่อนบ้าน", path: "/loan-calculator" },
                ]))}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    name: "เครื่องคำนวณผ่อนบ้าน The Believe House",
                    url: `${SITE_URL}/loan-calculator`,
                    applicationCategory: "FinanceApplication",
                    operatingSystem: "All",
                    inLanguage: "th-TH",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "THB" },
                })}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={ldJson({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                })}
            />
            <Navbar />

            <section className="flex-grow py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-12 max-w-6xl">
                    <div className="text-center mb-10 mt-8">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            คำนวณผ่อนบ้าน<br className="md:hidden" /> คำนวณเงินกู้บ้าน
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
                            ประมาณค่าผ่อนต่อเดือน หรือวงเงินที่กู้ได้จากรายได้ ก่อนเลือกบ้านแฝด VENITA
                            หรือทาวน์แฝด VERA ที่ The Believe House สามพราน
                        </p>
                    </div>

                    <LoanCalculator />

                    <div className="article-content max-w-3xl mx-auto mt-16">
                        <h2>เครื่องคำนวณนี้คิดอย่างไร</h2>
                        <p>
                            ค่าผ่อนคำนวณแบบ<strong>ลดต้นลดดอก ผ่อนเท่ากันทุกงวด</strong> ซึ่งเป็นวิธีที่สินเชื่อบ้านส่วนใหญ่ใช้
                            ส่วน &ldquo;รายได้ขั้นต่ำที่ควรมี&rdquo; ประมาณจากเกณฑ์ที่ค่าผ่อนหนี้ทั้งหมดไม่ควรเกิน 40% ของรายได้ต่อเดือน
                            ถ้ามีหนี้อื่นอยู่แล้ว เช่น ผ่อนรถหรือบัตรเครดิต วงเงินที่กู้ได้จะลดลง ใช้แท็บ &ldquo;คำนวณวงเงินที่กู้ได้&rdquo; เพื่อดูภาพนี้
                        </p>
                        <h2>ก่อนยื่นกู้ซื้อบ้านสามพราน ควรเตรียมอะไร</h2>
                        <ul>
                            <li>รวมรายได้ของผู้กู้หลักและผู้กู้ร่วม พร้อมเอกสารรับรองเงินเดือนหรือรายการเดินบัญชี</li>
                            <li>ลดหรือปิดหนี้ระยะสั้นที่ทำให้ภาระต่อเดือนสูง ก่อนยื่นกู้</li>
                            <li>เผื่อเงินสำหรับค่าใช้จ่ายวันโอนและค่าตกแต่งเข้าอยู่</li>
                            <li>เทียบอัตราดอกเบี้ยเฉลี่ย 3 ปีแรกและหลังจากนั้นของแต่ละธนาคาร</li>
                        </ul>
                        <p>
                            อ่านขั้นตอนแบบละเอียดได้ใน
                            <Link href="/blog/sinchuea-ban-sampran-mue-mai-2026">ขั้นตอนขอสินเชื่อบ้านสามพราน ฉบับมือใหม่</Link>
                            {" "}และดูโปรโมชันล่าสุดได้ที่<Link href="/promotion">หน้าโปรโมชัน</Link>
                        </p>

                        <h2>คำถามที่พบบ่อย</h2>
                        {FAQ.map((f) => (
                            <div key={f.q}>
                                <h3>{f.q}</h3>
                                <p>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
