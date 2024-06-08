import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

import AllArticleTable from "./AllArticleTable";


const AllArticles = () => {
    const axiosPublic = useAxiosPublic();

    //fetch all articles data
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles');

            return res.data;
        }
    })

    return (
        <div>
            <div className="text-center cinzel-700">
                <h2 className="text-4xl  noto-600">Here Is All Articles</h2>

            </div>


            <div className="overflow-x-auto mt-10 rounded-t-lg">

                <table className="table">
                    {/* head */}
                    <thead className="noto-600 bg-[#5f59f7] text-white shadow-xl">
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Author Name</th>
                            <th>Author Email</th>
                            <th>Author Photo</th>
                            <th>Date</th>
                            <th>Publisher</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Decline</th>
                            <th>Make Premium</th>
                            <th>Delete</th>
                        </tr>

                    </thead>

                    <tbody className="noto-500">

                        {
                            articles.map((article, idx) => <AllArticleTable
                                article={article}
                                key={article._id}
                                refetch={refetch}
                                idx={idx}
                            ></AllArticleTable>)
                        }



                    </tbody>

                </table>

            </div>


        </div>
    );
};

export default AllArticles;