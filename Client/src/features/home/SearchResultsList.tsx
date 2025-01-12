import { useDispatch } from "react-redux";
import { setClosestStore } from "../../store/orderFormSlice";
import { SetStateAction } from "react";
import { useScrollDetect } from "../../store/hooks/useScrollDetect";
import { useSelector } from "react-redux";
import { AppDispatch, RootState as ReduxRootState } from "../../store";
import { TStoreInfo } from "./../../../schemas/schemas";
import { motion } from "framer-motion";
import { mobileMenuVariants } from "./Navbars/MobileNavbar";

type SearchResultsListProps = {
  search: string;
  setSearch: (value: SetStateAction<string>) => void;
};

function SearchResultsList({ search, setSearch }: SearchResultsListProps) {
  const { storeLocationsData } = useSelector(
    (state: ReduxRootState) => state.order
  );

  const dispatch = useDispatch<AppDispatch>();
  const searchResults = storeLocationsData.filter((item: TStoreInfo) =>
    Object.keys(item).some((key) => {
      const value = item[key as keyof TStoreInfo];
      return typeof value === "string"
        ? value.toLowerCase().includes(search.toLowerCase())
        : value.toString().includes(search);
    })
  );
  const { scrollToSection } = useScrollDetect();

  function handleSelectStore(store: TStoreInfo) {
    dispatch(setClosestStore(store));
    setSearch(""); // Clear search
    scrollToSection("contact");
  }

  return (
    <motion.div
      className="absolute flex flex-col top-16 right-0 w-full  z-50 rounded-b-xl bg-opacity-90 bg-slate-200 font-bold"
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      transition={{ duration: 0.3 }}
      variants={mobileMenuVariants}
    >
      {searchResults.length > 0 ? (
        searchResults.map((store, idx) => (
          <a
            key={idx}
            className="p-5  hover:bg-opacity-100 cursor-pointer hover:bg-slate-300 hover:text-brightRed "
            onClick={() => handleSelectStore(store)}
          >
            <p>{store.name}</p>
            <p>{store.address}</p>
          </a>
        ))
      ) : (
        <p className="p-2">No results found</p>
      )}
    </motion.div>
  );
}

export default SearchResultsList;
