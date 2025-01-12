import { RootState as ReduxRootState } from "../../../store";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

function LeftNavbar() {
  const leftMenuVariants = {
    open: { x: 0 },
    closed: { x: "-150%" },
  };

  const { isLeftMenuOpen } = useSelector(
    (state: ReduxRootState) => state.layout
  );

  return (
    <>
      {/* Left Menu */}
      <motion.div
        className={`absolute left-0 top-0 flex  flex-col   w-44  h-full pl-8 items-left pb-1`}
        initial={"closed"}
        animate={isLeftMenuOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
        variants={leftMenuVariants}
      >
        <div className="flex flex-col border-r space-y-4 text-white font-bold uppercase text-sm ">
          <p>Menu</p>
          <ul className="flex flex-col items-left space-y-4  ">
            <li>
              <a href="#carousel" className="cursor-pointer">
                Catering Menu
              </a>
            </li>
            <li>
              <a href="#">Order Online</a>
            </li>
            <li>
              <a href="#">Locations</a>
            </li>
          </ul>
        </div>
        {/* Social Links */}
        <div className="absolute bottom-0 flex flex-col">
          <h3 className="mb-4 text-lg text-white font-bold ">
            <span className="text-brightRed">Follow</span> Us On
          </h3>
          <div className="flex space-x-4 mb-">
            <img
              className="socialIcon w-8 h-8 cursor-pointer"
              src="twitter.svg"
              alt=""
            />
            <img
              className="socialIcon w-8 h-8 cursor-pointer"
              src="facebook.svg"
              alt=""
            />
            <img
              className="socialIcon w-8 h-8 cursor-pointer"
              src="instagram.svg"
              alt=""
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default LeftNavbar;
