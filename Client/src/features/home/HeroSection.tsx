import { motion } from "framer-motion";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/layoutSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const heroBackgroundStyle = {
    backgroundImage: `url("background.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const heroTextStyle = {
    fontSize: "clamp(0.5rem, calc(0.5rem + 1vw), 1rem)",
    fontWeight: "400",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <section id="hero" style={heroBackgroundStyle}>
      <div className="row-container pt-32 pb-16">
        {/* Hero section */}
        <motion.div className={`relative flex flex-row w-1/2  pl-8  `}>
          {/* Heading & Text container */}
          <div className={`flex flex-col justify-between  `}>
            <h1>
              <span className="text-brightRed">More</span> than just pizza
            </h1>
            <p className="uppercase text-slate-300 mt-5 " style={heroTextStyle}>
              Our menu has something for everyone. Stop by for a quick bite or
              get your favourites delivered right to your door
            </p>
            {/* Mobile button */}
            <button
              onClick={() => {
                navigate("/order?menu");
                dispatch(setModal(true));
              }}
              className={` flex styled-button sm:w-full w-32 bg-brightRed mt-10`}
            >
              Order Now
            </button>
          </div>
        </motion.div>
        {/* Hero Pizza Image container */}
        <div className="absolute left-1/2 top-32  w-[1000px]   h-auto">
          <img
            src="pizza_hero.png"
            alt="Pizza"
            className="object-cover object-left w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
/* 
const DesktopMenu = () => {
  return <></>;
}; */
