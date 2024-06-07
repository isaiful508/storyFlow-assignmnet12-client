import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";

const Trending = () => {
    const axiosPublic = useAxiosPublic();
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    //fetch trendings  articles 6 data by sorting views count

    const { data: trendingArticles = [], isLoading } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trending-articles');

            return res.data;
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // console.log(trendingArticles);


    return (
        <div>


            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"

            >
                {
                    trendingArticles.map(article => <SwiperSlide
                        key={article._id}
                        article={article}
                    >
                        {/* <div className="hero min-h-screen" style={{ backgroundImage: `url(${article.image})` }}>
                            <div className="hero-overlay bg-opacity-20"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="max-w-2xl">
                                    <h1 className="mb-5 text-5xl noto-700 text-white">{article.title}</h1>
                                    
                                    <Link to='/userAllArticles' className="btn mt-5 hover:bg-[#5f59f7] text-white bg-[#343090]">Explore More</Link>
                                </div>
                            </div>
                        </div>  */}

                        <div>


                            <div
                                className="w-full bg-center bg-cover h-[38rem]"
                                style={{
                                    backgroundImage:
                                        `url(${article.image})`,
                                }}
                            >
                                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                                    <div className="text-center ">
                                        <h1 className="text-3xl font-semibold text-white lg:text-5xl noto-700">
                                            {article.title}
                                        </h1>
                                        <Link to='/userAllArticles' className="btn mt-5 hover:bg-[#5f59f7] text-white noto-500 bg-[#343090] outline-none">Explore More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>

        </div>
    );
};

export default Trending;