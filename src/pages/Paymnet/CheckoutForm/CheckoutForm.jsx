/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from './../../../Hooks/useAuth';
import { formatISO } from 'date-fns';

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const CheckoutForm = ({totalPrice}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transId, setTransId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure= useAxiosSecure();
    const {user} =  useAuth();
    console.log(totalPrice);
    

    useEffect(() =>{
        axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then((res)=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    },[axiosSecure,totalPrice])

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
            console.log('confirm error', confirmError)
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
                setTransId(paymentIntent.id);
                  // Update user's premiumTaken field
                  axiosSecure.put(`/users/${user?.email}/premium`, { premiumTaken: formatISO(new Date()) })
                  .then(res => {
                      console.log('User premium status updated', res.data);
                      window.location.reload()
                  })
                  .catch(err => {
                      console.error('Error updating user premium status', err);
                  });
            }
        }
    }


    return (
       <div>
        <div className="text-center">
            <h3 className="text-3xl noto-700">Total Price: ${totalPrice}</h3>
        
        </div>
         <form
            onSubmit={handleSubmit}
         className="w-1/2 mx-auto pt-20   py-2 px-6 noto-500">
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

            <div className="text-center">
            <button className="btn mt-6 w-full noto-500  text-white hover:bg-[#5f59f7] bg-[#343090]" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            </div>
            <p className="text-red-600">{error}</p>
        </form>
       </div>
    );
};

export default CheckoutForm;