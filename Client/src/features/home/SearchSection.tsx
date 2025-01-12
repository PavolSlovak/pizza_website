import useDebounce from "../../store/hooks/useDebounce";
import SearchInput from "../../components/SearchInput";
import { useState } from "react";
import SearchResultsList from "./SearchResultsList";
import { useOutsideClick } from "../../store/hooks/useOutsideClick";
import { AnimatePresence } from "framer-motion";

function SearchSection() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const ref = useOutsideClick(() => setSearch(""));
  return (
    <section className="relative sm:hidden bg-brightRed ">
      <div ref={ref} className="flex p-8 ">
        <SearchInput search={search} setSearch={setSearch} />
        <AnimatePresence>
          {debouncedSearch !== "" && (
            <SearchResultsList search={debouncedSearch} setSearch={setSearch} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default SearchSection;
