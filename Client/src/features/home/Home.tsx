import Navbar from "./Navbars/Navbar";
import MobileNavbar from "./Navbars/MobileNavbar";
import HeroSection from "./HeroSection";
import SearchSection from "./SearchSection";
import SliderSection from "./Slider/SliderSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { RootState as ReduxRootState } from "../../store";
import { useSelector } from "react-redux";
import Notification from "../../components/Notification";

function Home() {
  const { isMobileMenuOpen, notification } = useSelector(
    (state: ReduxRootState) => state.layout
  );

  return (
    <div className="relative w-full min-h-screen uppercase">
      {notification.isOpen && (
        <Notification>{notification.message}</Notification>
      )}
      <Outlet />
      <Navbar />
      <AnimatePresence>{isMobileMenuOpen && <MobileNavbar />}</AnimatePresence>
      <HeroSection />
      <SearchSection />
      <SliderSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
