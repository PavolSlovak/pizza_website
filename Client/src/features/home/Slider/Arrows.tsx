import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/16/solid";
import { clamp } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

type ArrowsProps = {
  dataLength: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  VISIBLE_IMAGES: number;
  imgIndex: number;
};

function Arrows({
  dataLength,
  imgIndex,
  setImgIndex,
  VISIBLE_IMAGES,
}: ArrowsProps) {
  const onRightArrowClick = () => {
    let newIndex =
      imgIndex < dataLength - VISIBLE_IMAGES
        ? imgIndex + VISIBLE_IMAGES
        : imgIndex;

    newIndex = clamp(0, dataLength - VISIBLE_IMAGES, newIndex);
    setImgIndex(newIndex);
  };

  const onLeftArrowClick = () => {
    let newIndex = imgIndex - VISIBLE_IMAGES;
    newIndex = clamp(0, dataLength - VISIBLE_IMAGES, newIndex);
    setImgIndex(newIndex);
  };

  return (
    <>
      <button
        className={`absolute top-1/2 -translate-y-1/2 left-5  rounded-full ${
          imgIndex === 0 ? "hidden" : null
        }`}
        onClick={() => onLeftArrowClick()}
      >
        <ArrowLeftCircleIcon className="h-10 w-10  hover:opacity-70 text-white shadow-lg" />
      </button>
      <button
        className={`absolute top-1/2 -translate-y-1/2 right-5  rounded-full ${
          dataLength - VISIBLE_IMAGES === imgIndex ? "hidden" : null
        }`}
        onClick={() => onRightArrowClick()}
      >
        <ArrowRightCircleIcon
          className={`h-10 w-10  hover:opacity-70  text-white  shadow-lg `}
        />
      </button>
    </>
  );
}

export default Arrows;
