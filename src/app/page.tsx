import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import HouseTypes from "@/components/HouseTypes";
import Facilities from "@/components/Facilities";
import ConstructionProgress from "@/components/ConstructionProgress";
import LocationMap from "@/components/LocationMap";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HouseTypes />
      <Concept />
      <Facilities />
      <ConstructionProgress />
      <LocationMap />
      <Contact />
      <RegistrationForm />
      <Footer />
    </main>
  );
}
