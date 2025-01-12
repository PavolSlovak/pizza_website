import { useEffect } from "react";
import { setModal } from "../layoutSlice";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState as ReduxRootState } from "../../store";
import { useSelector } from "react-redux";

export const useOverflow = () => {
  // Get modal state from the store
  const isModalOpen = useSelector(
    (state: ReduxRootState) => state.layout.isModalOpen
  );
  const dispatch = useDispatch();

  const location = useLocation();
  // Sync modal state with the route

  useEffect(() => {
    if (location.pathname.startsWith("/order")) {
      dispatch(setModal(true));
      document.body.classList.add("overflow-hidden"); // Disable scrolling
    } else {
      dispatch(setModal(false));
    }
    return () => {
      document.body.classList.remove("overflow-hidden"); // Enable scrolling
    };
  }, [location, isModalOpen, dispatch]);
};
