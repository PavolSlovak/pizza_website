import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";
import { useDispatch } from "react-redux";
import useDebounce from "../../../store/hooks/useDebounce";
import { setFCategories, setSearchResults } from "../../../store/menuSlice";
import { ItemCard } from "./ItemCard";
import MenuCategory from "./MenuCategory";
function MenuContent() {
  const {
    menuData,
    searchInput,
    searchResults,
    categoryFilterInput,
    fCategories,
    sortByInput,
    sortedMenuItems,
  } = useSelector((state: ReduxRootState) => state.menu);

  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchInput, 500);

  const allCategories: string[] = [...new Set(menuData.map((i) => i.category))];

  useEffect(() => {
    if (categoryFilterInput === "All") {
      dispatch(setFCategories(allCategories));
    } else {
      dispatch(
        setFCategories(allCategories.filter((i) => i === categoryFilterInput))
      );
    }
  }, [categoryFilterInput]);
  useEffect(() => {
    dispatch(
      setSearchResults(
        menuData.filter((item) =>
          item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      )
    );
  }, [debouncedSearch, menuData]);

  // If search input is not empty, display search results
  if (searchInput.length > 0) {
    return searchResults && searchResults.length > 0 ? (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 my-10 `}>
        {searchResults.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    ) : (
      <p className=" mx-auto mt-10">No results found</p>
    );
  }
  // If sortBy is selected, display sorted items
  if (sortByInput) {
    console.log("sortByInput", sortByInput);
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 my-10 `}>
        {sortedMenuItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  }
  return (
    // If filters are not applied, display all items in their respective categories
    <>
      {fCategories.map((category) => (
        <MenuCategory key={category} name={category}>
          <>
            {menuData
              .filter((i) => i.category === category)
              .map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
          </>
        </MenuCategory>
      ))}
    </>
  );
}

export default MenuContent;
