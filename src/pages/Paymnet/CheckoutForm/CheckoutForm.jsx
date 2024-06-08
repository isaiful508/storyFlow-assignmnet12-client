import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from './../../../Hooks/useAxiosPublic';
import useAuth from './../../../Hooks/useAuth';

import Swal from "sweetalert2";


const CheckoutForm = ({totalPrice}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transId, setTransId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic= useAxiosPublic();
    const {user} =  useAuth();
    console.log(totalPrice);
    

    useEffect(() =>{
        axiosPublic.post('/create-payment-intent', {price: totalPrice})
        .then((res)=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    },[axiosPublic,totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        //confirm payment
        const {paymentIntent, error :confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'unknown',
                    name: user?.displayName || 'unknown'
                }

            }
        })
        if(confirmError){
            console.log('confirm')
        }else{
            console.log('payment intent ', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transactionId', paymentIntent.id)
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your payment has been successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                setTransId(paymentIntent.id)
            }
        }
    }


    return (
        <form
            onSubmit={handleSubmit}
        >
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <button className="btn text-white hover:bg-[#5f59f7] bg-[#343090]" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
        </form>
    );
};

export default CheckoutForm;