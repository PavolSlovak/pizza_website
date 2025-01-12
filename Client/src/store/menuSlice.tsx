import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartItem, TMenuItem, TOrderForm } from "../../schemas/schemas";
import { fetchMenu } from "../../utils/http";
import { useCalculateTotal } from "./hooks/useCalculateTotal";

type TInitialState = {
  // Fetching logic
  menuData: TMenuItem[];
  menuDataLoading: boolean;
  menuDataError: null | string;

  // Menu logic
  openCategories: string[];
  categoryFilterInput: "All" | "Pizzas" | "Drinks";
  fCategories: string[];

  sortByInput: string | null;
  sortedMenuItems: TMenuItem[];

  total: number;
  cartItems: TCartItem[];
  personalInfoForm: TOrderForm | {};

  searchInput: string;
  searchResults: TMenuItem[] | null;
};
const initialState: TInitialState = {
  // Fetching logic
  menuData: [],
  menuDataLoading: false,
  menuDataError: null,

  // Menu logic
  openCategories: ["Pizzas", "Drinks"],
  categoryFilterInput: "All",
  fCategories: ["Dizzas", "Drinks"],

  sortByInput: null,
  sortedMenuItems: [],

  total: 0,
  cartItems: [],
  personalInfoForm: {},
  searchInput: "",
  searchResults: null,
};
export const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    // Fetching logic
    setMenuData: (state, action: PayloadAction<TMenuItem[]>) => {
      state.menuData = action.payload;
    },
    setMenuDataLoading: (state, action: PayloadAction<boolean>) => {
      state.menuDataLoading = action.payload;
    },
    setMenuDataError: (state, action: PayloadAction<string>) => {
      state.menuDataError = action.payload;
    },

    // Menu logic
    setCategoryFilter: (state, action) => {
      state.categoryFilterInput = action.payload;
    },
    setSortBy: (state, action) => {
      const sortBy = action.payload;
      if (sortBy === "a-z") {
        state.sortedMenuItems = [...state.menuData].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (sortBy === "z-a") {
        state.sortedMenuItems = [...state.menuData].sort(
          (b, a) => b.price - a.price
        );
      } else if (sortBy === "l-h") {
        state.sortedMenuItems = [...state.menuData].sort(
          (a, b) => a.price - b.price
        );
      } else if (sortBy === "h-l") {
        state.sortedMenuItems = [...state.menuData].sort(
          (a, b) => b.price - a.price
        );
      } else if (sortBy === "clear") {
        state.sortByInput = null;
      }
      state.sortByInput = sortBy;
    },
    setToggleCategory: (state, action) => {
      if (state.openCategories.includes(action.payload)) {
        state.openCategories = state.openCategories.filter(
          (item) => item !== action.payload
        );
      } else {
        state.openCategories.push(action.payload);
      }
    },
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      state.cartItems.push({ id, quantity });
      state.total = useCalculateTotal(state.menuData, state.cartItems);
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((i: TCartItem) => i.id !== id);
      state.total = useCalculateTotal(state.menuData, state.cartItems);
    },
    onQuantityChange: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
      }>
    ) => {
      const { id, quantity } = action.payload;
      console.log("onQuantityChange", id, quantity);
      const item = state.cartItems.find((i: TCartItem) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      state.total = useCalculateTotal(state.menuData, state.cartItems);
    },

    setSearch: (state, action) => {
      state.searchInput = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<TMenuItem[]>) => {
      state.searchResults = action.payload;
    },

    resetForm: (state) => {
      state.total = 0;
      state.cartItems = [];
      state.personalInfoForm = {};
      state.searchInput = "";
      state.sortByInput = null;
      state.categoryFilterInput = "All";
    },
    setFCategories: (state, action: PayloadAction<string[]>) => {
      state.fCategories = action.payload;
    },
    setPersonalInfoForm: (state, action: PayloadAction<TOrderForm>) => {
      state.personalInfoForm = action.payload;
    },
  },
  // add cases for async actions
  extraReducers: (builder) => {
    builder
      .addCase(
        getMenuData.fulfilled,
        (state, action: PayloadAction<TMenuItem[]>) => {
          state.menuData = action.payload;
          state.menuDataLoading = false;
          console.log(action.payload);
        }
      )
      .addCase(getMenuData.pending, (state) => {
        state.menuDataLoading = true;
      })
      .addCase(getMenuData.rejected, (state, action) => {
        state.menuDataError = action.error.message || "An error occurred";
        state.menuDataLoading = false;
      });
  },
});

export const getMenuData = createAsyncThunk("menu/getMenuData", fetchMenu);

export const {
  setMenuData,
  setMenuDataLoading,

  setCategoryFilter,
  setSortBy,
  setToggleCategory,
  onQuantityChange,
  resetForm,
  addToCart,
  removeFromCart,

  setSearch,
  setSearchResults,
  setFCategories,
  setPersonalInfoForm,
} = menuSlice.actions;
