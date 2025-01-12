import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setToggleCategory } from "../../../store/menuSlice";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";

const CategoryLabel = ({ name }: { name: string }) => {
  const dispatch = useDispatch();
  const toggleCategory = (category: string) => {
    dispatch(setToggleCategory(category));
  };
  const { openCategories } = useSelector((state: ReduxRootState) => state.menu);
  return (
    <div
      className="flex justify-between cursor-pointer group"
      onClick={() => toggleCategory(name)}
    >
      <h3 className="text-lg font-bold ">{name}</h3>
      <motion.span
        initial={{
          rotate: 0,
        }}
        animate={{
          rotate: openCategories.includes(name) ? 180 : 0,
        }}
        transition={{
          type: "spring",
        }}
      >
        <ArrowDownIcon className="h-5 w-5" />
      </motion.span>
    </div>
  );
};
export default CategoryLabel;
