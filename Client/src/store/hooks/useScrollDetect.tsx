import { useEffect, useState } from "react";

export const useScrollDetect = () => {
  const scrollToSection = (sectionID: string) => {
    const section = document.getElementById(sectionID);
    const navbar = document.getElementById("navbar");
    if (section) {
      const navbarHeight = navbar?.offsetHeight || 0; // Get the height of the navbar
      const yOffset = -navbarHeight + 2; // Offset to stop just above the section
      const yPosition =
        section.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const handleDarkenNavbar = () => {
    useEffect(() => {
      const navbar = document.getElementById("navbar");

      window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
          navbar?.classList.add("backdrop-brightness-50");
        } else {
          navbar?.classList.remove("backdrop-brightness-50");
        }
      });
      return () => {
        window.removeEventListener("scroll", handleDarkenNavbar);
      };
    }, []);
  };

  const handleSectionActive = () => {
    const [location, setLocation] = useState("hero");

    useEffect(() => {
      const handleScroll = () => {
        const aboutUs = document.getElementById("about-us");
        const contact = document.getElementById("contact");
        const hero = document.getElementById("hero");
        const navbar = document.getElementById("navbar");

        if (aboutUs && contact && hero && navbar) {
          const navbarBottom = navbar.offsetHeight + window.scrollY;
          if (
            navbarBottom >= hero.offsetTop &&
            navbarBottom < aboutUs.offsetTop
          ) {
            setLocation("hero");
            window.history.pushState({}, "", "#hero");
          } else if (
            navbarBottom >= aboutUs.offsetTop &&
            navbarBottom < contact.offsetTop
          ) {
            setLocation("about-us");
            window.history.pushState({}, "", "#about-us");
          } else if (navbarBottom >= contact.offsetTop) {
            setLocation("contact");
            window.history.pushState({}, "", "#contact");
          }
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return location;
  };

  return { scrollToSection, handleDarkenNavbar, handleSectionActive };
};
