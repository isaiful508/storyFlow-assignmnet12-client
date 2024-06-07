import { Toaster } from "react-hot-toast";
import Navbar from "../../shared/Navbar/Navbar";
import AllPublishers from "../AllPublishers/AllPublishers";
import Footer from "../Footer/Footer";
import Statistic from "../Statistic/Statistic";
import Trending from "../Trending/Trending";



const Home = () => {
    return (
        <div className="">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            
                <Trending></Trending>
                <AllPublishers></AllPublishers>
                <div className="container mx-auto">
                
                <Statistic></Statistic>
                </div>
           
            <Footer></Footer>
        </div>
    );
};

export default Home;