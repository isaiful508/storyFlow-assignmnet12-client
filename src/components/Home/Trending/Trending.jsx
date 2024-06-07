import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import TrendingArticlesSlider from "./TrendingArticlesSlider";

const Trending = () => {
    const axiosPublic = useAxiosPublic();

    //fetch trendings  articles 6 data by sorting views count

    const { data: trendingArticles = [], refetch, isLoading } = useQuery({
        queryKey: ['trendingArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trending-articles');

            return res.data;
        }
    })
    
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    console.log(trendingArticles);


    return (
        <div>
            {
                trendingArticles.map(article => <TrendingArticlesSlider
                key={article._id}
                article={article}
                >

                </TrendingArticlesSlider>)
            }
        </div>
    );
};

export default Trending;