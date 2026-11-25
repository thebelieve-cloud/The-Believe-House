"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { CalendarCheck, MessageCircle, CheckCircle2, XCircle, Phone } from "lucide-react";
import { houses } from "@/lib/houses";
import { DSR, MAX_YEARS, fmt, minimumIncome, monthlyPayment, principalFromPayment } from "@/lib/loan";

const RATE_PRESETS = [3, 3.5, 4, 5, 6];
const toNumber = (s: string) => Number(s.replace(/[^\d.]/g, "")) || 0;
const withCommas = (s: string) => {
    const [i, d] = s.replace(/[^\d.]/g, "").split(".");
    const int = (i || "").replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return d !== undefined ? `${int}.${d.slice(0, 2)}` : int;
};

function Field({
    label, suffix, value, onChange, hint, id,
}: { label: string; suffix: string; value: string; onChange: (v: string) => void; hint?: string; id: string }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="flex items-center gap-3">
                <input
                    id={id}
                    inputMode="decimal"
                    value={value}
                    onChange={(e) => onChange(withCommas(e.target.value))}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-lg font-semibold text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <span className="w-14 shrink-0 text-gray-500 text-sm">{suffix}</span>
            </div>
            {hint && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
        </div>
    );
}

function Chips({ options, onPick, active }: { options: { label: string; value: string }[]; onPick: (v: string) => void; active?: string }) {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {options.map((o) => (
                <button
                    key={o.label}
                    type="button"
                    onClick={() => onPick(o.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        active === o.value ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}

function Row({ label, value, big }: { label: string; value: string; big?: boolean }) {
    return (
        <div className="flex items-baseline justify-between gap-3 py-3">
            <span className={big ? "font-semibold text-gray-900" : "text-sm md:text-base text-gray-600"}>{label}</span>
            <span className={`shrink-0 whitespace-nowrap ${big ? "text-3xl md:text-4xl font-bold text-primary" : "text-base md:text-lg font-semibold text-gray-900"}`}>
                {value} <span className="text-sm font-normal text-gray-500">บาท</span>
            </span>
        </div>
    );
}

// headingLevel: ใช้ "h3" เมื่อวางในหน้าที่มีหัวข้อ h2 ครอบอยู่แล้ว (เช่น หน้าแรก)
export default function LoanCalculator({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
    const Heading = headingLevel;
    const [mode, setMode] = useState<"payment" | "capacity">("payment");
    const [amount, setAmount] = useState(withCommas(String(houses.find((h) => h.slug === "vera")?.startingPrice ?? 2990000)));
    const [income, setIncome] = useState("50,000");
    const [debt, setDebt] = useState("0");
    const [rate, setRate] = useState("3.5");
    const [years, setYears] = useState("30");
    const tracked = useRef(false);

    // รับราคาจากลิงก์ เช่น /loan-calculator?price=4390000 (ปุ่มจากหน้าแบบบ้าน)
    // (อ่าน URL ได้หลังโหลดหน้าเท่านั้น เพราะหน้านี้สร้างไว้ล่วงหน้าแบบ static)
    useEffect(() => {
        const p = Number(new URLSearchParams(window.location.search).get("price"));
        // eslint-disable-next-line react-hooks/set-state-in-effect -- ตั้งค่าครั้งเดียวจาก URL ตอนเปิดหน้า
        if (p > 0) setAmount(withCommas(String(Math.round(p))));
    }, []);

    // นับใน GA ครั้งเดียวเมื่อมีคนเริ่มใช้เครื่องคำนวณ
    const touch = () => {
        if (tracked.current) return;
        tracked.current = true;
        sendGAEvent("event", "use_loan_calculator", { mode });
    };

    const y = Math.min(Math.max(toNumber(years), 1), MAX_YEARS);
    const r = toNumber(rate);

    const pay = useMemo(() => {
        const p = toNumber(amount);
        const m = monthlyPayment(p, r, y);
        return { m, income: minimumIncome(m), total: m * y * 12, interest: m * y * 12 - p };
    }, [amount, r, y]);

    const cap = useMemo(() => {
        const maxPay = Math.max(toNumber(income) * DSR - toNumber(debt), 0);
        return { maxPay, loan: principalFromPayment(maxPay, r, y) };
    }, [income, debt, r, y]);

    const set = (fn: (v: string) => void) => (v: string) => { touch(); fn(v); };
    const yearsTooLong = toNumber(years) > MAX_YEARS;

    return (
        <div className="bg-[#eef4fb] rounded-[2rem] p-5 md:p-10">
            {/* แท็บ 2 โหมด */}
            <div role="tablist" aria-label="ประเภทการคำนวณ" className="mx-auto mb-8 flex w-full max-w-md rounded-full bg-white p-1.5 shadow-sm">
                {([
                    ["payment", "คำนวณยอดผ่อนต่อเดือน"],
                    ["capacity", "คำนวณวงเงินที่กู้ได้"],
                ] as const).map(([k, label]) => (
                    <button
                        key={k}
                        role="tab"
                        type="button"
                        aria-selected={mode === k}
                        onClick={() => setMode(k)}
                        className={`flex-1 rounded-full px-3 py-3 text-sm md:text-base font-semibold transition-colors ${
                            mode === k ? "bg-primary text-white" : "text-gray-700 hover:text-primary"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* ช่องกรอก */}
                <div className="space-y-6">
                    <Heading className="text-xl md:text-2xl font-bold text-gray-900">
                        {mode === "payment" ? "คำนวณยอดผ่อนต่อเดือน แบบลดต้นลดดอก" : "คำนวณวงเงินกู้จากรายได้"}
                    </Heading>

                    {mode === "payment" ? (
                        <div>
                            <Field id="amount" label="จำนวนเงินที่ขอกู้" suffix="บาท" value={amount} onChange={set(setAmount)} />
                            <Chips
                                active={amount}
                                onPick={set(setAmount)}
                                options={houses.map((h) => ({
                                    label: `${h.name.toUpperCase()} ${h.type} เริ่ม ${(h.startingPrice / 1e6).toFixed(2)} ล้าน`,
                                    value: withCommas(String(h.startingPrice)),
                                }))}
                            />
                        </div>
                    ) : (
                        <>
                            <Field id="income" label="รายได้รวมต่อเดือน (รวมผู้กู้ร่วมได้)" suffix="บาท" value={income} onChange={set(setIncome)} />
                            <Field id="debt" label="ภาระหนี้อื่นต่อเดือน (ผ่อนรถ บัตรเครดิต ฯลฯ)" suffix="บาท" value={debt} onChange={set(setDebt)} />
                        </>
                    )}

                    <div>
                        <Field
                            id="rate"
                            label="อัตราดอกเบี้ยเฉลี่ย (ตัวอย่าง ปรับได้)"
                            suffix="% ต่อปี"
                            value={rate}
                            onChange={set(setRate)}
                            hint="อยากรู้อัตราดอกเบี้ยล่าสุดของ ธอส. ออมสิน กรุงไทย สอบถามฝ่ายขายได้ฟรี"
                        />
                        <Chips
                            active={rate}
                            onPick={set(setRate)}
                            options={RATE_PRESETS.map((p) => ({ label: `${p}%`, value: String(p) }))}
                        />
                    </div>

                    <div>
                        <Field
                            id="years"
                            label="ระยะเวลาที่ขอกู้"
                            suffix="ปี"
                            value={years}
                            onChange={set(setYears)}
                            hint={
                                yearsTooLong
                                    ? `คำนวณที่ ${MAX_YEARS} ปี (ผ่อนได้สูงสุด ${MAX_YEARS} ปี)`
                                    : `*ผ่อนได้สูงสุด ${MAX_YEARS} ปี กับ ธอส. (ขึ้นกับอายุผู้กู้และเกณฑ์ธนาคาร)`
                            }
                        />
                        <Chips
                            active={years}
                            onPick={set(setYears)}
                            options={[20, 30, MAX_YEARS].map((n) => ({ label: `${n} ปี`, value: String(n) }))}
                        />
                    </div>
                </div>

                {/* ผลลัพธ์ */}
                <div>
                    <p className="font-semibold text-gray-900 mb-3">ผลลัพธ์ของฉัน</p>
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm" aria-live="polite">
                        {mode === "payment" ? (
                            <>
                                <Row big label="ผ่อนต่อเดือน" value={fmt(pay.m)} />
                                <div className="border-t border-gray-100" />
                                <Row label="รายได้รวมขั้นต่ำที่ควรมี" value={fmt(pay.income)} />
                                <Row label="ดอกเบี้ยรวมตลอดสัญญา" value={fmt(pay.interest)} />
                                <Row label="ยอดชำระรวมทั้งหมด" value={fmt(pay.total)} />
                            </>
                        ) : (
                            <>
                                <Row big label="วงเงินกู้โดยประมาณ" value={fmt(cap.loan)} />
                                <div className="border-t border-gray-100" />
                                <Row label="ผ่อนได้สูงสุดต่อเดือน" value={fmt(cap.maxPay)} />
                                <div className="mt-3 space-y-2">
                                    {houses.map((h) => {
                                        const ok = cap.loan >= h.startingPrice;
                                        return (
                                            <p key={h.slug} className={`flex items-center gap-2 text-sm ${ok ? "text-green-700" : "text-gray-500"}`}>
                                                {ok ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> : <XCircle className="w-4 h-4" aria-hidden="true" />}
                                                {h.name.toUpperCase()} {h.type} ราคาเริ่มต้น {fmt(h.startingPrice)} บาท
                                                {ok ? " — วงเงินเพียงพอ" : " — วงเงินยังไม่ถึง"}
                                            </p>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                            *ผลการคำนวณเป็นเพียงการประมาณเบื้องต้น คิดแบบผ่อนเท่ากันทุกงวด ลดต้นลดดอก
                            และใช้เกณฑ์ค่าผ่อนรวมไม่เกิน {DSR * 100}% ของรายได้ อัตราดอกเบี้ยจริง วงเงิน และเงื่อนไข
                            ขึ้นอยู่กับการพิจารณาของแต่ละธนาคาร
                        </p>

                        {/* ชวนติดต่อฝ่ายขาย: ข้อมูลดอกเบี้ย/วงเงินจริงให้ฝ่ายขายเป็นคนตอบ */}
                        <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-100 p-4 md:p-5">
                            <p className="font-semibold text-gray-900">อยากรู้ตัวเลขจริงสำหรับคุณ?</p>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                ฝ่ายขายช่วยเช็กอัตราดอกเบี้ยล่าสุด ประเมินวงเงินที่ธนาคารน่าจะอนุมัติ
                                และแนะนำเอกสารยื่นกู้ให้ฟรี
                            </p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <a
                                    href="tel:0909492492"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary px-5 py-3.5 font-semibold text-white hover:bg-primary/90 transition-colors"
                                >
                                    <Phone className="w-5 h-5" aria-hidden="true" />
                                    โทร 090-949-2492
                                </a>
                                <a
                                    href="https://lin.ee/RW9gYI5"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#06C755] px-5 py-3.5 font-semibold text-white hover:bg-[#05b34c] transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                                    ถามฝ่ายขายทาง LINE
                                </a>
                            </div>
                            <Link
                                href="/#register"
                                className="mt-3 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-primary bg-white px-5 py-3 font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                                <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                                ลงทะเบียนให้ฝ่ายขายติดต่อกลับ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
