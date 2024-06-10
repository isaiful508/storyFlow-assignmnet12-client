import { useQuery } from "@tanstack/react-query";
import AllArticleTable from "./AllArticleTable";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";



const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    //fetch all articles data
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/articles');

            return res.data;
        }
    })

     // Pagination logic
     const indexOfLastArticle = currentPage * articlesPerPage;
     const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
     const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
     const totalPages = Math.ceil(articles.length / articlesPerPage);
 
     const handlePageChange = (page) => {
         setCurrentPage(page);
     };



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
                            currentArticles.map((article, idx) => <AllArticleTable
                                article={article}
                                key={article._id}
                                refetch={refetch}
                                idx={indexOfFirstArticle + idx}
                            ></AllArticleTable>)
                        }



                    </tbody>

                </table>

            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

        </div>
    );
};

export default AllArticles;