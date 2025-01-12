import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../store";

function ContactSection() {
  return (
    <section id="contact" className=" mt-2">
      <ContactSectionMobile />
      <ContactSectionDesktop />
    </section>
  );
}

export default ContactSection;
/* Mobile View */
function ContactSectionMobile() {
  return (
    <section className="sm:hidden ">
      <div
        className="container"
        style={{
          backgroundImage: `url(Map.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontSize: "clamp(0.5rem, calc(0.5rem + 1vw), 1rem)",
          fontWeight: "400",
        }}
      >
        <Address />
      </div>
      <ImgGrid />
    </section>
  );
}
/* Desktop View */

function ContactSectionDesktop() {
  return (
    <section
      className=" hidden sm:flex"
      style={{
        backgroundImage: `url(marbel.jpg)`,
      }}
    >
      <div className="row-container ">
        <Address />
        <ImgGrid />
      </div>
    </section>
  );
}
function Address() {
  const { closestStore } = useSelector((state: ReduxRootState) => state.order);
  if (!closestStore)
    return (
      <div className="flex flex-col justify-center w-full sm:w-1/3 py-16 px-8 text-left uppercase font-xl font-bold ">
        <h2 className="text-brightRed mb-5">Find Us</h2>
        <p>Enter your location to find the closest store</p>
      </div>
    );
  return (
    <div className=" flex flex-col justify-center w-full sm:w-1/3 py-16 px-8 text-left uppercase font-xl font-bold ">
      <h2 className="text-brightRed mb-5">{closestStore?.city}</h2>
      <p>{closestStore?.address}</p>
      <p>
        {closestStore?.postalCode}, {closestStore?.city}
      </p>
      <p>{closestStore?.state}</p>

      {/* Opening hours */}
      <div className="mt-2">
        <p className="text-brightRed sm:text-black">Sunday - Thursday</p>
        <p>10:30AM - 10PM</p>
        <p className="text-brightRed sm:text-black">Friday - Saturday</p>
        <p>10:30AM - 11PM</p>
      </div>
    </div>
  );
}
function ImgGrid() {
  const { menuData } = useSelector((state: ReduxRootState) => state.menu);

  const [imgIndex, setImgIndex] = useState(0);
  const [gridImages, setGridImages] = useState(menuData.slice(0, 6));
  const [startIndex, setStartIndex] = useState(0); // Track the starting index of the current chunk

  // Update gridImages in chunks of 6
  useEffect(() => {
    const imgIndexRef = setInterval(() => {
      setImgIndex((prev) => {
        const nextIndex = (prev + 1) % gridImages.length;

        // Check if it's the last image in the current chunk
        if (nextIndex === 0) {
          // Move to the next chunk of images (6-12, 12-18, etc.)
          const nextStartIndex = startIndex + 6;
          const newImages = menuData.slice(nextStartIndex, nextStartIndex + 6);

          if (newImages.length === 0) {
            // If no more images, reset to the first chunk
            setGridImages(menuData.slice(0, 6));
            setStartIndex(0);
          } else {
            setGridImages(newImages);
            setStartIndex(nextStartIndex);
          }
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(imgIndexRef);
  }, [gridImages.length, menuData, startIndex]);

  return (
    <>
      {/* Grid Images Desktop */}
      <div className="w-full sm:w-2/3 sm:h-[400px]">
        <motion.ul className="grid grid-cols-1 sm:grid-cols-5 sm:grid-rows-2  h-full sm:gap-2">
          {gridImages.map((item, idx) => (
            <motion.li
              key={idx}
              className={`relative  w-full sm:h-full 
                ${idx === 0 ? "sm:row-span-2" : null}
                ${idx === 3 ? "sm:col-span-2 sm:row-span-2" : null}`}
            >
              {imgIndex === idx && (
                <motion.div
                  className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-brightRed bg-opacity-70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    className="socialIcon w-12 h-12 cursor-pointer"
                    src="instagram.svg"
                    alt=""
                  />
                  <p className="text-sm text-white text-center font-bold">
                    Levantes Pizza
                  </p>
                </motion.div>
              )}
              <img
                key={idx}
                className="w-full h-52 sm:h-full object-cover object-bottom sm:object-left"
                src={item.image}
                alt={`pizza img ${idx}`}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </>
  );
}
