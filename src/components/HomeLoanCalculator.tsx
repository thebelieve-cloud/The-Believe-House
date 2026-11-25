import Link from "next/link";
import LoanCalculator from "@/components/LoanCalculator";

// ส่วนคำนวณผ่อนบ้านบนหน้าแรก (วางเหนือ "ติดต่อเรา")
export default function HomeLoanCalculator() {
    return (
        <section id="calculator" aria-labelledby="calculator-heading" className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-12 max-w-6xl">
                <div className="text-center mb-12">
                    <span className="text-primary font-semibold tracking-wider text-sm md:text-base uppercase mb-2 block">
                        Loan Calculator
                    </span>
                    <h2 id="calculator-heading" className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        คำนวณผ่อนบ้าน
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
                    <p className="text-gray-600 text-lg leading-relaxed font-light max-w-2xl mx-auto">
                        ลองคำนวณค่าผ่อนต่อเดือน หรือวงเงินที่กู้ได้จากรายได้ ก่อนเลือกบ้านแฝด VENITA หรือทาวน์แฝด VERA
                    </p>
                </div>

                <LoanCalculator headingLevel="h3" />

                <p className="text-center mt-8">
                    <Link href="/loan-calculator" className="text-primary font-medium underline underline-offset-4 hover:text-amber-700">
                        อ่านวิธีคำนวณและคำถามที่พบบ่อยเรื่องสินเชื่อบ้าน
                    </Link>
                </p>
            </div>
        </section>
    );
}
