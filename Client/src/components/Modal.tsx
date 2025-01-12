import { XCircleIcon } from "@heroicons/react/16/solid";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { setModal } from "../store/layoutSlice";
import { useNavigate } from "react-router-dom";
import { resetForm } from "../store/menuSlice";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const backdropStyles = `fixed inset-0 bg-black bg-opacity-50 z-40`; // Backdrop covering the entire screen
  const closeIconStyle = `absolute top-4 right-4 w-8 h-8 z-50`; // Close icon fixed relative to modal dialog
  const dialogStyles = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 max-h-[90vh] w-full md:max-w-3xl overflow-hidden`; // Dialog fixed to center with hidden overflow
  const scrollableContentStyles = `max-h-[80vh] w-full overflow-y-auto`; // Scrollable content area

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(resetForm());
    navigate("/#hero"); // Go back using navigate
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
      <div className={backdropStyles} onClick={onClose}></div>
      <div className={dialogStyles}>
        <a href="#" onClick={onClose}>
          <XCircleIcon className={closeIconStyle} />
        </a>
        <div className={scrollableContentStyles}>{children}</div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
