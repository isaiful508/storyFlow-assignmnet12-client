import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from "../../Button/Button";

// Import Swiper credentials
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



const Trending = () => {

    const axiosPublic = useAxiosPublic();
    // swipper pagination
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    //fetch trendings  articles 6 data by sorting views count
    const { data: trendingArticles = [] } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trending-articles');

            return res.data;
        }
    })

    // console.log(trendingArticles);

    // posted date format 
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    }

    return (
        <div>
            
            <h2 className="text-black flex justify-center items-center py-16 text-3xl font-semibold noto-500">Trending News Articles</h2>

            <Swiper
                pagination={pagination}
                modules={[Pagination, Autoplay, Navigation]}
                navigation={true}

                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                className="mySwiper">

                {trendingArticles.map(article =>
                    <SwiperSlide
                        key={article._id}
                        article={article}>

                        <section className="bg-white dark:bg-gray-900">
                            <div className="container flex flex-col-reverse px- mx-auto text-center">

                                <div className="max-w-lg mx-auto">

                                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl mt-8">{article.title}</h1>
                                    <p className="poppins-400 text-black font-medium">{formatDate(article.postedDate)}</p>
                                    <Button to="/userAllArticles">Explore More</Button>

                                </div>

                                <div className="flex justify-center mt-10">
                                    <img className="object-cover w-full h-96 rounded-xl lg:w-4/5" src={article.image} alt="news_article" />
                                </div>

                            </div>

                        </section>

                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default Trending;