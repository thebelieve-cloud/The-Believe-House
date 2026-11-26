import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import HouseTypes from "@/components/HouseTypes";
import Facilities from "@/components/Facilities";
import ConstructionProgress from "@/components/ConstructionProgress";
import LocationMap from "@/components/LocationMap";
import CustomerTrust from "@/components/CustomerTrust";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Promotions from "@/components/Promotions";
import HomeLoanCalculator from "@/components/HomeLoanCalculator";
import type { Metadata } from "next";

// สร้างหน้าแรกใหม่ทุกชั่วโมง เพื่อซ่อนโปรโมชันที่หมดเขตเอง
export const revalidate = 3600;

// หน้าแรก: title/description มีคำหลัก บ้านสามพราน บ้านแฝด ทาวน์แฝด อิฐแดง (ใช้ absolute ไม่ให้ต่อท้ายชื่อเว็บซ้ำ)
const HOME_TITLE = "บ้านสามพราน บ้านแฝด ทาวน์แฝด อิฐแดง | The Believe House";
const HOME_DESCRIPTION =
  "บ้านสามพราน The Believe House บ้านแฝด VENITA และทาวน์แฝด VERA สร้างด้วยอิฐแดงทั้งหลัง ซอยสามพราน 13 ใกล้ถนนเพชรเกษม ราคาเริ่มต้น 2.99 ล้านบาท นัดชมบ้านตัวอย่างได้";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  // openGraph/twitter ในหน้าแทนที่ของ layout ทั้งก้อน จึงต้องใส่รูปแชร์และชื่อเว็บซ้ำไว้ที่นี่
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "/",
    siteName: "The Believe House สามพราน",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [{ url: "/asset/Head the believe.png", width: 1200, height: 630, alt: "The Believe House สามพราน โครงการบ้านแฝดและทาวน์แฝด" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/asset/Head the believe.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-clip">
      <Navbar />
      <Hero />
      <Promotions />
      <HouseTypes />
      <Concept />
      <Facilities />
      <ConstructionProgress />
      <LocationMap />
      <CustomerTrust />
      <HomeLoanCalculator />
      <Contact />
      <RegistrationForm />
      <Footer />
    </main>
  );
}
