import { Suspense, lazy } from "react";
import Navbar from "../../components/public/Navbar";
import LoadingScreen from "../../components/feedback/LoadingScreen";
import StatsSection from "../../components/public/StatsSection";
import CoursesSection from "../../components/public/CoursesSection";
import TestimonialsSection from "../../components/public/Testimonials";
import CTASection from "../../components/public/CTASection";
import Footer from "../../components/public/Footer";
const HeroSection = lazy(() =>
  import("../../components/public/HeroSection")
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden">
      <Navbar />

      <Suspense fallback={<LoadingScreen />}>
        <HeroSection />
      </Suspense>

     <StatsSection />
<CoursesSection />
<TestimonialsSection />
<CTASection />
<Footer />
    </div>
  );
}