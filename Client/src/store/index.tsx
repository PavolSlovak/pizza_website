import { configureStore } from "@reduxjs/toolkit";
import { layoutSlice } from "./layoutSlice";
import { menuSlice } from "./menuSlice";
import { orderFormSlice } from "./orderFormSlice";
export const store = configureStore({
  reducer: {
    // Define a top-level state field named `counter`, handled by `counterReducer`

    layout: layoutSlice.reducer,
    menu: menuSlice.reducer,
    order: orderFormSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
