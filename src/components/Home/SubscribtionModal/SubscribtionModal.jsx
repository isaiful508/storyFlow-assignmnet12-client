/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const SubscriptionModal = ({ showModal, onClose }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl mb-4 noto-700">Subscribe Now!</h2>
                <p className="mb-4 noto-600">Get unlimited access to premium articles by <br /> subscribing to our premium plan.</p>
                <Link to='/subscription/premiumDuo/2000'>
                    <button className="bg-[#343090] text-white px-4 py-2 rounded-md hover:bg-[#5f59f7]">
                        Subscribe
                    </button>
                </Link>
                <button 
                    onClick={onClose} 
                    className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SubscriptionModal;