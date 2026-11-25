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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
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
