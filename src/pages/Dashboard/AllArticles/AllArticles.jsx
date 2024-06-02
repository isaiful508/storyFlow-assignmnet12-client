import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const AllArticles = () => {
    const axiosPublic = useAxiosPublic()
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles');

            return res.data;
        }
    })

    const sliceTitle = (text) => {
        return text.split(' ').slice(0, 3).join(' ');
    };

    return (
        <div>
            <div className="text-center cinzel-700">
                <h2 className="text-4xl  noto-600">Here Is All Articles</h2>


            </div>


            <div className="overflow-x-auto mt-10 rounded-t-lg">

                <table className="table">
                    {/* head */}
                    <thead className="noto-600 bg-[#5f59f7] text-white">
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
                            <th>Delete</th>
                        </tr>

                    </thead>

                    <tbody className="noto-500">

                        {
                            articles.map((article, idx) => <tr
                                key={article._id}
                                className="hover:bg-gray-300 font-500 hover:text-gray-700"
                            >

                                <td>
                                    {idx + 1}
                                </td>

                                <td>
                                    {sliceTitle(article.title)}...
                                </td>

                                <td>{article.authorName}</td>
                                <td>{article.authorEmail}</td>
                                <td>
                                    <img src={article.authorPhoto} alt={article.authorName} className="w-10 h-10 rounded-full" />
                                </td>

                                <td>{new Date(article.postedDate).toLocaleDateString()}</td>
                                <td>{article.publisher}</td>
                                <td>{article.status}</td>
                                <td>
                                    <button className="btn btn-success">Approve</button>
                                </td>
                                <td>
                                    <button className="btn btn-warning">Decline</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>)
                        }



                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllArticles;