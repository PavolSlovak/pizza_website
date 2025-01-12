import { useDispatch } from "react-redux";
import {
  setCategoryFilter,
  setSearch,
  setSortBy,
} from "../../../store/menuSlice";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";

const MenuFilters = () => {
  const dispatch = useDispatch();
  const { categoryFilterInput, sortByInput } = useSelector(
    (state: ReduxRootState) => state.menu
  );
  function handleSortByChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === "clear") {
      return dispatch(setSortBy(""));
    }
    dispatch(setSortBy(e.target.value));
  }

  return (
    <div className="relative flex  flex-wrap  w-full justify-between mt-5 gap-2">
      <input
        type="text"
        className="border flex-1 sm:w-full p-2 outline-none placeholder:text-black"
        placeholder="Search"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <select
        className="border flex-1  p-2 outline-none"
        name="categories"
        id="categories"
        value={categoryFilterInput}
        onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
      >
        <option value="All">All</option>
        <option value="Pizzas">Pizzas</option>
        <option value="Drinks">Drinks</option>
      </select>
      <select
        className="border flex-1 sm:flex-2 p-2 outline-none"
        name="sort-by"
        id="sortBy"
        onChange={handleSortByChange}
        value={sortByInput ?? ""}
        defaultChecked={false}
      >
        <option value="a-z">Name: A to Z</option>
        <option value="z-a">Name: Z to A</option>
        <option value="l-h">Price: Low to High</option>
        <option value="h-l">Price: High to Low</option>
        <option value="clear">Clear Sort</option>
      </select>
    </div>
  );
};
export default MenuFilters;
