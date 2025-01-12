import { useState } from "react";
import HamburgerBtn from "../../../components/HamburgerBtn";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toggleMobileMenu } from "../../../store/layoutSlice";
import { AppDispatch } from "../../../store";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";
import { useScrollDetect } from "../../../store/hooks/useScrollDetect";
import useDebounce from "../../../store/hooks/useDebounce";
import SearchInput from "../../../components/SearchInput";
import SearchResultsList from "../SearchResultsList";
import { useOutsideClick } from "../../../store/hooks/useOutsideClick";

function Navbar() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const { handleDarkenNavbar } = useScrollDetect();
  handleDarkenNavbar();

  const { closestStore } = useSelector((state: ReduxRootState) => state.order);
  const { isMobileMenuOpen } = useSelector(
    (state: ReduxRootState) => state.layout
  );
  const dispatch = useDispatch<AppDispatch>();
  // Close on outside click and on escape key
  const searchContainerRef = useOutsideClick(() => setSearch(""));
  return (
    <motion.nav
      id="navbar"
      className="fixed w-full top-0 left-0 z-30 transition-all ease-in-out duration-300 font-bold"
    >
      {/* Flex container */}
      <div className="flex flex-row max-w-screen-xl mx-auto justify-between p-8 sm:pr-0">
        {/* Logo & Desktop menu */}
        <div className="flex items-center h-full shrink-0  ">
          <img src="logo.avif" alt="" className="h-12" />

          <DesktopMenu />
        </div>
        {/* Desktop Contact & Search container */}
        <div className="relative flex items-center space-x-4  ">
          <div className="hidden sm:flex items-center space-x-4">
            {/* Contact */}
            {closestStore && (
              <div className="hidden xl:flex">
                <img className="w-5 h-5 " src={"phone.svg"} alt="phone icon" />
                <span className="text-white shrink-0 ml-5">
                  {closestStore?.phone}
                </span>
              </div>
            )}
            {/* Search  */}
            <div
              ref={searchContainerRef}
              className="relative hidden sm:flex  items-center space-x-8 px-8 py-4  rounded-l-2xl  bg-brightRed  "
            >
              <SearchInput search={search} setSearch={setSearch} />

              {/* Search Results */}
              <AnimatePresence>
                {debouncedSearch && (
                  <SearchResultsList
                    search={debouncedSearch}
                    setSearch={setSearch}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger btn */}
          <HamburgerBtn
            isOpen={isMobileMenuOpen}
            onToggle={() => dispatch(toggleMobileMenu())}
          />
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;

function DesktopMenu() {
  const { handleSectionActive, scrollToSection } = useScrollDetect();

  const location = handleSectionActive();
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
        } uppercase px-10 py-5 hover:text-brightRed `}
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
