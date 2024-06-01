import { Toaster } from "react-hot-toast";
import Navbar from "../../shared/Navbar/Navbar";
import AllPublishers from "../AllPublishers/AllPublishers";
import Footer from "../Footer/Footer";
import Statistic from "../Statistic/Statistic";
import Trending from "../Trending/Trending";



const Home = () => {
    return (
        <div className="container mx-auto">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div>
                
                <Trending></Trending>
                <AllPublishers></AllPublishers>
                <Statistic></Statistic>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;