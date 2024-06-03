import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UserArticleCard from "./UserArticleCard";


const UserAllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const { data: approvedArticles = [] } = useQuery({
        queryKey: ['approvedArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles/status/approved');
            return res.data;
        }
    });
console.log(approvedArticles);

    return (
        <div className='container mx-auto mt-10'>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {
            approvedArticles.map(article => <UserArticleCard
            article={article}
            key={article._id}
            ></UserArticleCard>)
          }
          </div>
        </div>
    );
};

export default UserAllArticles;