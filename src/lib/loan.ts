// สูตรคำนวณสินเชื่อบ้านแบบลดต้นลดดอก (ผ่อนเท่ากันทุกงวด)
// ใช้ในหน้า /loan-calculator  — เป็นการประมาณเบื้องต้นเท่านั้น

// สัดส่วนภาระหนี้ต่อรายได้ (DSR) ที่ใช้ประมาณ: ค่าผ่อนรวมไม่ควรเกิน 40% ของรายได้
export const DSR = 0.4;
// ธอส. ให้ผ่อนได้สูงสุด 40 ปี (ข้อมูลจากโครงการ 25 พ.ย. 2569) ระยะจริงขึ้นกับอายุผู้กู้และเกณฑ์ธนาคาร
export const MAX_YEARS = 40;

// ค่าผ่อนต่อเดือน
export function monthlyPayment(principal: number, annualRatePct: number, years: number): number {
    const n = Math.round(years * 12);
    if (principal <= 0 || n <= 0) return 0;
    const r = annualRatePct / 100 / 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
}

// วงเงินกู้สูงสุดจากค่าผ่อนที่จ่ายไหวต่อเดือน
export function principalFromPayment(payment: number, annualRatePct: number, years: number): number {
    const n = Math.round(years * 12);
    if (payment <= 0 || n <= 0) return 0;
    const r = annualRatePct / 100 / 12;
    if (r === 0) return payment * n;
    return (payment * (1 - Math.pow(1 + r, -n))) / r;
}

// รายได้ขั้นต่ำต่อเดือนที่ควรมี เพื่อให้ค่าผ่อนไม่เกิน DSR (รวมหนี้อื่น)
export function minimumIncome(payment: number, otherDebt = 0): number {
    return (payment + otherDebt) / DSR;
}

export const fmt = (n: number) =>
    Number.isFinite(n) ? Math.round(n).toLocaleString("th-TH") : "-";
