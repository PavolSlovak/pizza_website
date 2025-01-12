import { JSX, useEffect, useState } from "react";
import OrderHeader from "./OrderHeader";
import Menu from "./Menu/Menu";
import { useLocation } from "react-router-dom";
import PersonalInfoForm from "./OrderForm/PersonalInfoForm";

import LoadinSpinner from "../../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState as ReduxRootState } from "../../store";
import Modal from "../../components/Modal";
import PaymentResolved from "./PaymentResolved";

const OrderModal = () => {
  const [component, setComponent] = useState<JSX.Element>();
  const location = useLocation();
  const { menuDataLoading, menuDataError } = useSelector(
    (state: ReduxRootState) => state.menu
  );
  const { isModalOpen } = useSelector((state: ReduxRootState) => state.layout);
  const { storeLocationsDataLoading, storeLocationsDataError } = useSelector(
    (state: ReduxRootState) => state.order
  );
  useEffect(() => {
    switch (location.search) {
      case "?menu":
        setComponent(<Menu />);
        break;
      case "?summary":
        setComponent(<PersonalInfoForm />);
        break;

      case "?success":
        setComponent(<PaymentResolved success={true} />);
        break;
      case "?cancelled":
        setComponent(<PaymentResolved success={false} />);
        break;
      default:
        setComponent(<Menu />);
        break;
    }

    /* http://localhost:8080/order?canceled */
  }, [location.search]);

  if (menuDataLoading || storeLocationsDataLoading) return <LoadinSpinner />;

  if (menuDataError) throw new Error(menuDataError);
  if (storeLocationsDataError) throw new Error(storeLocationsDataError);
  return (
    <>
      {isModalOpen && (
        <Modal>
          <div className="flex flex-col">
            <OrderHeader />
            <div className="flex flex-col p-5 bg-white">{component}</div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OrderModal;
