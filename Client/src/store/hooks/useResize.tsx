import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenusOnResize, setIsMobile } from "../layoutSlice";
export const useResize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onResize() {
      dispatch(closeMenusOnResize());
      if (window.innerWidth < 640) {
        dispatch(setIsMobile(true));
      } else {
        dispatch(setIsMobile(false));
      }
    }
    // Call onResize initially to set the correct state on mount
    onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
};
