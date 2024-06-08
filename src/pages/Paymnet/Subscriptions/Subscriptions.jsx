import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";



const Subscriptions = () => {
    const { price } = useParams();
    const navigate = useNavigate();

    // Convert price to a number
    const priceNumber = parseFloat(price);

    // Map subscription periods to their corresponding values in days
    const periodValues = {
        "1": 1 / (24 * 60), // 1 minute is 1/(24*60) of a day
        "5": 5,
        "10": 10
    };

    // Handle the subscribe button click
    const handleSubscribe = (event) => {
        event.preventDefault();

        // Get the selected period from the form
        const form = event.target;
        const selectedPeriod = form.period.value;
        

        // Get the period value
        const periodValue = periodValues[selectedPeriod];

        // Calculate the total price
        const totalPrice = periodValue ? (priceNumber * periodValue).toFixed(2) : 0;
        console.log(totalPrice);

        // Navigate to the payment page with total price as a parameter
        navigate(`/payment/${totalPrice}`);
    };

    return (
        <section className="bg-white container mx-auto p-20 dark:bg-gray-900">
        <div className="max-w-3xl px-6 py-16 mx-auto text-center">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                Want to Subscribe get the period and hit the Subscribe Button
            </h1>
            <p className="max-w-md mx-auto mt-5 text-gray-500 dark:text-gray-400">
               Choose Your Plan
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                    <div className="subscription-form">
                        <label htmlFor="period">Subscription Period</label>
                        <select id="period" name="period" required>
                            <option value="" disabled>Select period</option>
                            <option value="1">1 minute</option>
                            <option value="5">5 days</option>
                            <option value="10">10 days</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Subscribe
                    </button>
                </form>
        </div>
    </section>
  
    );
};

export default Subscriptions;