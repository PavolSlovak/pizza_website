import { clamp } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

type DotsProps = {
  dataLength: number;
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  VISIBLE_IMAGES: number;
};

export default function Dots({
  dataLength,
  imgIndex,
  setImgIndex,
  VISIBLE_IMAGES,
}: DotsProps) {
  // Calculate the number of dots
  const dots = Math.ceil(dataLength / VISIBLE_IMAGES);

  // Clamp the active dot index to ensure it's within bounds
  const activeIndex = Math.ceil(imgIndex / VISIBLE_IMAGES);

  function onDotChange(idx: number) {
    // Ensure the new index is within bounds using clamp
    let newIndex = clamp(0, dataLength - VISIBLE_IMAGES, idx * VISIBLE_IMAGES); // Ensure newIndex stays within valid range
    setImgIndex(newIndex);
  }

  return (
    <div className="absolute left-0 bottom-0 flex w-full justify-center p-3 gap-2 z-10">
      {Array.from({ length: dots }).map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => onDotChange(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === activeIndex ? "bg-brightRed" : "bg-gray-800"
            }`}
          ></button>
        );
      })}
    </div>
  );
}
