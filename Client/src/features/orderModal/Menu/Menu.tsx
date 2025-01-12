import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import MenuFilters from "./MenuFilters";

import MenuContent from "./MenuContent";

function Menu() {
  const { total } = useSelector((state: ReduxRootState) => state.menu);

  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-xl font-bold text-black">Menu</h2>
      <MenuFilters />
      <MenuContent />
      <span className="w-full text-right mt-5 font-bold text-xl">
        Total: ${total.toFixed(2)}
      </span>
      <button
        onClick={() => navigate("/order?summary")}
        className={`styled-button bg-brightRed mt-5 w-full ${
          total === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={total === 0}
      >
        Next
      </button>
    </>
  );
}

export default Menu;
