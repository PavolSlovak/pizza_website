import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type TNotification = {
  isOpen: boolean;
  message: string;
};
type InitialState = {
  isMobile: boolean;
  isLeftMenuOpen: boolean;
  isMobileMenuOpen: boolean;
  isModalOpen: boolean;
  /*   isNotificationOpen: boolean; */
  notification: TNotification;
};
const initialState: InitialState = {
  isMobile: window.innerWidth < 640 ? true : false,
  isLeftMenuOpen: false,
  isMobileMenuOpen: false,
  isModalOpen: false,
  /*  isNotificationOpen: false, */
  notification: {
    isOpen: false,
    message: "",
  },
};
export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    closeMenusOnResize: (state) => {
      if (state.isMobile && state.isLeftMenuOpen) state.isLeftMenuOpen = false;
      if (!state.isMobile && state.isMobileMenuOpen)
        state.isMobileMenuOpen = false;
    },
    toggleLeftMenu: (state) => {
      state.isLeftMenuOpen = !state.isLeftMenuOpen;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setNotification: (state, action: PayloadAction<TNotification>) => {
      state.notification = action.payload;
    },
  },
});
export const showNotification = createAsyncThunk(
  "layout/showNotification",
  async (message: string, { dispatch }) => {
    dispatch(
      setNotification({
        isOpen: true,
        message: message,
      })
    );
    setTimeout(() => {
      dispatch(setNotification({ isOpen: false, message: "" }));
    }, 5000);
  }
);

export const {
  toggleLeftMenu,
  toggleMobileMenu,
  setIsMobile,
  closeMenusOnResize,
  setModal,
  setNotification,
} = layoutSlice.actions;
