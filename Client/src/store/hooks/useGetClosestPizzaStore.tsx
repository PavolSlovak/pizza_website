import { useEffect, useMemo } from "react";
import { getDistance } from "geolib";
import { useDispatch } from "react-redux";
import { setClosestStore, setUserLocation } from "../orderFormSlice";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../index";

export const useGetClosestPizzaStore = () => {
  const dispatch = useDispatch();
  const { userLocation, storeLocationsData } = useSelector(
    (state: ReduxRootState) => state.order
  );

  useEffect(() => {
    if (userLocation) return;
    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setUserLocation({ lat: latitude, lon: longitude }));
      },
      (error: GeolocationPositionError) => {
        console.error("Error getting location:", error);
      }
    );
  }, [dispatch]);

  const closestStore = useMemo(() => {
    if (!userLocation || storeLocationsData.length === 0) return null;

    return storeLocationsData
      .map((store) => ({
        ...store,
        distance: getDistance(
          { latitude: userLocation.lat, longitude: userLocation.lon },
          { latitude: store.lat, longitude: store.lon }
        ),
      }))
      .reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
  }, [userLocation, storeLocationsData]);

  useEffect(() => {
    if (userLocation && storeLocationsData.length > 0) {
      dispatch(setClosestStore(closestStore));
    }
  }, [closestStore, dispatch]);
};
