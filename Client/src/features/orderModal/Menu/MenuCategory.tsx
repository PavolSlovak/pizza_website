import React from "react";
import CategoryLabel from "./CategoryLabel";
import { useSelector } from "react-redux";
import { RootState as ReduxRootStat } from "../../../store";

type TMenuCategory = {
  name: string;
  children: React.ReactNode;
};

function MenuCategory({ children, name }: TMenuCategory) {
  const { openCategories } = useSelector((state: ReduxRootStat) => state.menu);
  return (
    <>
      <div className="flex flex-col mt-10 border-b ">
        <CategoryLabel name={name} />

        {/* Category items */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-2 ${
            !openCategories.includes(name) ? " h-0 overflow-hidden" : "my-10"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default MenuCategory;
