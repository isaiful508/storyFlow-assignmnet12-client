import { Toaster } from "react-hot-toast";
import Navbar from "../../shared/Navbar/Navbar";
import AllPublishers from "../AllPublishers/AllPublishers";
import Footer from "../Footer/Footer";
import Statistic from "../Statistic/Statistic";
import Trending from "../Trending/Trending";



const Home = () => {
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="container mx-auto">
                <Navbar></Navbar>
                <Trending></Trending>
                <AllPublishers></AllPublishers>
                <Statistic></Statistic>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;