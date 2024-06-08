import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);


const Payment = () => {
    const { totalPrice } = useParams();
    return (
        <div className="p-20 container mx-auto">
            <Elements stripe={stripePromise} >
                <CheckoutForm totalPrice={totalPrice}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;