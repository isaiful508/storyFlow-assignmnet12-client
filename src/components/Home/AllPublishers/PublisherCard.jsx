/* eslint-disable react/prop-types */
import Marquee from "react-fast-marquee";

const PublisherCard = ({item}) => {
    const {publisher, logo} = item
    return (
        <Marquee>
             <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div
                className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                style={{
                    backgroundImage: `url(${logo})`,
                }}
            ></div>

            <div className="w-56 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64  bg-[#5f59f7] dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center text-white uppercase dark:text-white">
                    {publisher}
                </h3>
            </div>
        </div>

        </Marquee>
       
    );
};

export default PublisherCard;