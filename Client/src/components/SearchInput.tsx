import {
  ArrowRightIcon,
  MapPinIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";

type SearchResultsListProps = {
  search: string;
  setSearch: (value: string) => void;
};
function SearchInput({ search, setSearch }: SearchResultsListProps) {
  const onCancel = () => {
    setSearch("");
  };
  function handleSearchDB(search: string) {
    console.log(search);
  }
  return (
    <div className="relative w-full" id="search-container">
      {/* Location Icon */}
      <MapPinIcon className="absolute top-1.5 left-3  h-5 w-5 text-brightRed " />
      {/* Input */}
      <input
        type="text"
        className="w-full pl-10 pr-3 py-1  rounded-lg focus:outline-none  placeholder:font-bold placeholder:text-gray-300"
        placeholder="Choose Branch"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Right Arrow Icon */}
      {search === "" ? (
        <button
          id="search-button"
          className="absolute top-1.5 right-3 text-brightRed"
          onClick={() => handleSearchDB(search)}
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={onCancel}
          className="absolute top-1.5 right-3 text-brightRed"
        >
          <XCircleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
