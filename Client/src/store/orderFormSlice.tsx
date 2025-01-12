import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TStoreInfo } from "../../schemas/schemas";
import { fetchStoresLocations } from "../../utils/http";

type TInitialState = {
  storeLocationsData: TStoreInfo[];

  storeLocationsDataLoading: boolean;
  storeLocationsDataError: null | string;

  userLocation: null | {
    lat: number;
    lon: number;
  };
  closestStore: TStoreInfo | null;

  deliveryType: "delivery" | "pickup";
};
const initialState: TInitialState = {
  storeLocationsData: [],
  storeLocationsDataLoading: false,
  storeLocationsDataError: null,

  userLocation: null,
  closestStore: null,
  deliveryType: "pickup",
};
export const orderFormSlice = createSlice({
  name: "order",
  initialState: initialState,

  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setClosestStore: (state, action) => {
      state.closestStore = action.payload;
    },
    setStoreLocationsData: (state, action) => {
      state.storeLocationsData = action.payload;
    },
    setStoreLocationsLoading: (state, action) => {
      state.storeLocationsDataLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreLocations.pending, (state) => {
        state.storeLocationsDataLoading = true;
      })
      .addCase(getStoreLocations.fulfilled, (state, action) => {
        state.storeLocationsData = action.payload;
        state.storeLocationsDataLoading = false;
      })
      .addCase(getStoreLocations.rejected, (state) => {
        state.storeLocationsDataLoading = false;
        state.storeLocationsDataError = "Error fetching store locations";
      });
  },
});
export const getStoreLocations = createAsyncThunk(
  "order/fetchStoreLocations",
  fetchStoresLocations
);
export const {
  setClosestStore,
  setUserLocation,
  setStoreLocationsData,
  setStoreLocationsLoading,
} = orderFormSlice.actions;
