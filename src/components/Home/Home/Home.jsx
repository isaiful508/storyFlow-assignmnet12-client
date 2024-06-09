import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import AllPublishers from "../AllPublishers/AllPublishers";
import Footer from "../Footer/Footer";
import Statistic from "../Statistic/Statistic";
import Trending from "../Trending/Trending";
import Plans from "../Plans/Plans";
import SubscriptionModal from "../SubscribtionModal/SubscribtionModal";



const Home = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            
                <Trending></Trending>
                <AllPublishers></AllPublishers>
                <div className="container mx-auto">
                <Statistic></Statistic>
                <Plans></Plans>
                </div>
           
            <Footer></Footer>
            <SubscriptionModal showModal={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default Home;