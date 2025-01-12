import "./App.css";
import { AppDispatch, RootState as ReduxRootState } from "./store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetClosestPizzaStore } from "./store/hooks/useGetClosestPizzaStore";
import { useResize } from "./store/hooks/useResize";
import { Route, Routes } from "react-router-dom";
import OrderModal from "./features/orderModal/OrderModal";
import Home from "./features/home/Home";
import { useDispatch } from "react-redux";

import { useOverflow } from "./store/hooks/useOverflow";
import { getMenuData } from "./store/menuSlice";
import { getStoreLocations } from "./store/orderFormSlice";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { menuDataLoading, menuDataError } = useSelector(
    (state: ReduxRootState) => state.menu
  );
  const { storeLocationsDataLoading, storeLocationsDataError } = useSelector(
    (state: ReduxRootState) => state.order
  );
  const dispatch = useDispatch<AppDispatch>();

  // Switches layout to mobile when window is resized and closes navbar
  useResize();
  // Get the closest pizza store to the user
  useGetClosestPizzaStore();

  // Stop scrolling when modal is open
  useOverflow();

  useEffect(() => {
    // get menu data
    dispatch(getMenuData());
    // get locations data
    dispatch(getStoreLocations());
  }, [dispatch]);

  if (menuDataLoading || storeLocationsDataLoading) return <LoadingSpinner />;

  if (menuDataError) throw new Error(menuDataError);
  if (storeLocationsDataError) throw new Error(storeLocationsDataError);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/order" element={<OrderModal />} />
      </Route>
    </Routes>
  );
};

export default App;

// useQuery fetching
/*   const {
    status: menuStatus,
    data: menuData,
    isPending: menuLoading,
    isError: menuError,
    error: menuFetchError,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const {
    status: locationsStatus,
    data: storeLocations,
    isPending: locationsLoading,
    isError: locationsError,
    error: locationsFetchError,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: fetchStoresLocations,
  });

  useEffect(() => {
    if (menuStatus === "success") {
      dispatch(setMenuData(menuData));
    }
  }, [menuStatus, menuData, dispatch]);

  useEffect(() => {
    if (locationsStatus === "success") {
      dispatch(setStoreLocationsData(storeLocations));
    }
  }, [locationsStatus, storeLocations, dispatch]);

  if (locationsLoading || menuLoading) return <LoadinSpinner />;
  if (locationsError) throw locationsFetchError;
  if (menuError) throw menuFetchError; */
