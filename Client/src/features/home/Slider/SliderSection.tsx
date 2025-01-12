import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";

import { clamp, motion, useMotionValue } from "framer-motion";
import Dots from "./Dots";
import Arrows from "./Arrows";
import { TMenuItem } from "./../../../../schemas/schemas";
const DRAG_BUFFER = 20; // how much the user needs to drag to change the image
const SPRING_OPTIONS = {
  type: "spring", // Use "spring" for spring animations
  mass: 1,
  stiffness: 200, // Adjust stiffness for snappiness
  damping: 20, // Damping controls oscillation
};
// Total number of full groups and the remaining images in the last group
const SliderSection: FC = () => {
  const { menuData } = useSelector((state: ReduxRootState) => state.menu);

  const { isMobile } = useSelector((state: ReduxRootState) => state.layout);
  const [dragging, setDragging] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(isMobile ? 1 : 3);
  const IMAGE_WIDTH = 100 / visibleImages;
  const AUTO_DELAY = 4000;
  const dragX = useMotionValue(0);
  /* Updates visible images based on window width */

  useEffect(() => {
    console.log("isMobile", isMobile);
    setVisibleImages(isMobile ? 1 : 3);
    setImgIndex(0);
  }, [isMobile]);

  useEffect(() => {
    if (dragging) return;

    const intervalRef = setInterval(() => {
      setImgIndex((prev) => {
        if (prev === menuData.length - visibleImages) return 0;
        return prev + 1;
      });
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragging, menuData.length, visibleImages]);

  const onDragStart = () => {
    setDragging(true);
  };
  const onDragStop = () => {
    setDragging(false);
    const x = dragX.get();
    let newIndex = imgIndex;

    if (x <= -DRAG_BUFFER && imgIndex < menuData.length - visibleImages) {
      newIndex += visibleImages;
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      newIndex -= visibleImages;
    }

    // Prevent overshooting for partial groups
    newIndex = clamp(0, menuData.length - visibleImages, newIndex);

    setImgIndex(newIndex);
    dragX.set(0);
  };
  return (
    <section
      id="carousel"
      className="relative overflow-hidden mt-2"
      style={{
        backgroundImage: `url(marbel.jpg)`,
      }}
    >
      <div className="container py-16">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          animate={{
            translateX: `-${imgIndex * IMAGE_WIDTH}%`,
          }}
          transition={SPRING_OPTIONS}
          style={{ x: dragX }} // as we drag the image, it will update the dragX value
          onDragStart={onDragStart}
          onDragEnd={onDragStop}
          onHoverStart={() => setDragging(true)}
          onHoverEnd={() => setDragging(false)}
          className=" flex items-center cursor-grab active:cursor-grabbing "
        >
          {menuData.map((item, idx) => (
            <SliderCard key={idx} item={item} imgWidth={IMAGE_WIDTH} />
          ))}
        </motion.div>
        {/*  <Images imgIndex={imgIndex} imgWidth={IMAGE_WIDTH} /> */}
        <Dots
          dataLength={menuData.length}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
          VISIBLE_IMAGES={visibleImages}
        />
        <Arrows
          dataLength={menuData.length}
          imgIndex={imgIndex}
          setImgIndex={setImgIndex}
          VISIBLE_IMAGES={visibleImages}
        />
      </div>
    </section>
  );
};
type SliderCardProps = {
  item: TMenuItem;
  imgWidth: number;
};
const SliderCard = ({ item, imgWidth }: SliderCardProps) => {
  return (
    <>
      <motion.div
        className={`relative flex  flex-shrink-0  h-[200px] scale-95  rounded-xl bg-neutral-800 object-cover`}
        style={{ width: `${imgWidth}%` }}
      >
        <span className="absolute -top-16 left-1/2 -translate-x-1/2  text-white text-2xl font-bold w-56 h-56 rounded-full bg-brightRed overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="inset-0 object-cover w-full h-full"
            draggable="false"
          />
        </span>
        <article className="absolute bottom-0 left-0 w-full p-4 bg-neutral-800 bg-opacity-70 rounded-b-xl text-center">
          <h3 className="text-white text-2xl font-bold">{item.name}</h3>
          <p className="text-white">{item.description}</p>
        </article>
      </motion.div>
    </>
  );
};
export default SliderSection;
