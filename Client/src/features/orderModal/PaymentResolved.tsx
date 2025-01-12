import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { setModal } from "../../store/layoutSlice";

interface PaymentResolvedProps {
  success: boolean;
}

const PaymentResolved: FC<PaymentResolvedProps> = ({ success }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-black">
        {success ? "Payment Successful" : "Payment Failed"}
      </h2>
      <p className="text-lg text-black">
        {success
          ? "Thank you for your order! You will receive an email confirmation shortly."
          : "Please try again or contact support if the issue persists."}
      </p>
      <button
        onClick={() => {
          dispatch(setModal(false));
          navigate("/");
        }}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  );
};

export default PaymentResolved;
