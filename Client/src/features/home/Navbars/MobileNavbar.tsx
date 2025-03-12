import { motion } from "framer-motion";
import { useScrollDetect } from "../../../store/hooks/useScrollDetect";
import { useDispatch } from "react-redux";
import { toggleMobileMenu } from "../../../store/layoutSlice";
import { Link } from "react-router-dom";

export const mobileMenuVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

function MobileNavbar() {
  const { scrollToSection } = useScrollDetect();

  const dispatch = useDispatch();

  function handleClick(
    section: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    scrollToSection(section);
    dispatch(toggleMobileMenu());
  }

  return (
    <motion.div
      className={`fixed top-28 left-0 w-full font-bold uppercase text-sm bg-white z-20 bg-opacity-90 p-20`}
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      transition={{ duration: 0.3 }}
      variants={mobileMenuVariants}
    >
      <ul className="flex flex-col items-left space-y-4 ">
        <p className="text-brightRed">Menu</p>

        <li>
          <Link
            to="#hero"
            className="cursor-pointer hover:text-brightRed "
            onClick={(e) => handleClick("hero", e)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/order?menu"
            className=" cursor-pointer hover:text-brightRed"
            onClick={() => dispatch(toggleMobileMenu())}
          >
            Order Online
          </Link>
        </li>
        <li>
          <Link
            to="#about-us"
            className="cursor-pointer hover:text-brightRed "
            onClick={(e) => handleClick("about-us", e)}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="#contact"
            className="cursor-pointer hover:text-brightRed "
            onClick={(e) => handleClick("contact", e)}
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}

export default MobileNavbar;
