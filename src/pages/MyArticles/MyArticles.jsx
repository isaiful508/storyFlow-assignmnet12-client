import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MyArticlesTable from "./MyArticlesTable";
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const MyArticles = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    
    

    const { data: articles = [], refetch, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/user/${user?.email}`);

            return res.data;
        }
    });
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    // console.log(articles);



    return (
        <div className="container mx-auto pt-20 mt-10">
            <div className="text-center">
            <h2 className="noto-700 text-3xl">Here Your Posted Articles</h2>
            <p className="noto-500">Here You can update, delete your articles</p>
            </div>
            <div className="overflow-x-auto mt-10 rounded-t-lg">

<table className="table">
    {/* head */}
    <thead className="noto-600 bg-[#5f59f7] text-white shadow-xl">
        <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Details</th>
            
           <th>Status</th>
            <th>isPremium</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>

    </thead>

    <tbody className="noto-500">

        {
            articles.map((article, idx) => <MyArticlesTable
            article={article}
            idx={idx}
            refetch={refetch}
            key={article._id}
            ></MyArticlesTable>)
        }

        

    </tbody>

</table>

</div>
        </div>
    );
};

export default MyArticles;