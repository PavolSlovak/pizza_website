import { XCircleIcon } from "@heroicons/react/16/solid";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { setModal } from "../store/layoutSlice";

type TNotification = {
  children: ReactNode;
};

const Notification = ({ children }: TNotification) => {
  const dispatch = useDispatch<AppDispatch>();

  const onClose = () => {
    dispatch(setModal(false));
  };

  // Close modal on ESC key press
  useEffect(() => {
    const onEscPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEscPress);
    return () => document.removeEventListener("keydown", onEscPress);
  }, [onClose]);

  return createPortal(
    <>
      <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg z-50  w-full md:max-w-2xl bg-green-200 bg-opacity-90 border border-green-600  text-green-600 text-center p-4">
        <a href="#" onClick={onClose}>
          <XCircleIcon className="absolute top-4 right-4 w-5 h-5 z-50" />
        </a>
        <div className="">{children}</div>
      </div>
    </>,
    document.getElementById("notification-root") as HTMLElement
  );
};

export default Notification;
