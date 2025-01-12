import { useScrollDetect } from "../../store/hooks/useScrollDetect";
import { useLocation } from "react-router-dom";

function DesktopMenu() {
  const { scrollToSection } = useScrollDetect();

  const location = useLocation().hash;
  console.log("location", location);

  return (
    <div className="hidden sm:flex items-center">
      <a
        href="#hero"
        className={`${
          location === "hero" ? "text-brightRed" : "text-white"
        } uppercase px-10 py-5 hover:text-brightRed `}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("hero");
        }}
      >
        Home
      </a>
      <a
        href="#about-us"
        className={`${
          location === "about-us" ? "text-brightRed" : "text-white"
        } uppercase çpx-10 py-5 hover:text-brightRed `}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("about-us");
        }}
      >
        About us
      </a>
      <a
        href="#contact"
        className={`${
          location === "contact" ? "text-brightRed" : "text-white"
        } uppercase px-10 py-5 hover:text-brightRed `}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("contact");
        }}
      >
        Contact
      </a>
    </div>
  );
}

export default DesktopMenu;
