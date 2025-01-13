import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { setModal } from "../../store/layoutSlice";

function AboutSection() {
  const heroTextStyle = {
    fontSize: "clamp(0.5rem, calc(0.5rem + 1vw), 1rem)",
    fontWeight: "400",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <section
      id="about-us"
      className="  bg-gradient-to-b from-black via-slate-700 to-black mt-2    "
    >
      <div className=" relative flex flex-row   max-w-screen-xl mx-auto overflow-hidden ">
        {/* Heading & Text container */}
        <div className="flex flex-col w-full sm:w-1/2 h-full px-8 py-16">
          <h2>Our Pleade to quality</h2>
          <h1>
            Best<span className="text-brightRed"> Pizza</span> In Town
          </h1>
          <p className="uppercase text-slate-300 mt-5 " style={heroTextStyle}>
            Our food if fresh and simple pizzas are crafted from scratch made
            dough that is prepared every morning. All of our toppings are hand
            cut and prepared in our stores daily. Wr use high quality,fresh
            ingredients from local vendors to insure the best food possible.
            Whether you visit one of our stores or order online for delivry.
            Your food will be prepared by people who take pride in our brand and
            what we stand for.
          </p>
          {/* Mobile button */}
          <button
            className={` flex styled-button w-full  bg-brightRed mt-10`}
            onClick={() => {
              navigate("/order?menu");
              dispatch(setModal(true));
            }}
          >
            Order Now
          </button>
        </div>
        {/* Hero Pizza Image container */}
        <div className="hidden sm:block absolute left-1/2 w-[800px] h-full">
          <img
            src="italian_dish4.png"
            alt="Pizza"
            className=" w-full h-full object-cover "
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
