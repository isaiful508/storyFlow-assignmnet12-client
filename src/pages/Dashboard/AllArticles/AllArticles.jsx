import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import toast from "react-hot-toast";


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

    //article apporove handler

    const handleApproveArticle = async (article) => {
        console.log(article)
        try {
            const res = await axiosPublic.patch(`/articles/${article._id}/status`, { status: 'approved' });
            if (res.data.modifiedCount > 0) {
                toast.success("Article approved successfully");
                refetch();
            } else {
                toast.error("Failed to approve article");
            }
        } catch (error) {
            console.error('Error approving article:', error);
            toast.error("Error approving article");
        }
    };


    //article premium updater
    const handleMakePremium = async (article) => {
        try {
            const res = await axiosPublic.patch(`/articles/${article._id}/premium`, { isPremium: 'yes' });
            if (res.data.modifiedCount > 0) {
                toast.success("Article marked as premium successfully");
                refetch();
            } else {
                toast.error("Failed to mark article as premium");
            }
        } catch (error) {
            console.error('Error making article premium:', error);
            toast.error("Error making article premium");
        }
    };


//delete article
const handleDeleteArticle = async (article) => {
    try {
        const res = await axiosPublic.delete(`/articles/${article._id}`);
        if (res.data.deletedCount > 0) {
            toast.success("Article deleted successfully");
            refetch();
        } else {
            toast.error("Failed to delete article");
        }
    } catch (error) {
        console.error('Error deleting article:', error);
        toast.error("Error deleting article");
    }
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

                                <td className={article.status === 'pending' ? 'btn rounded-full bg-red-500 text-white' : 'btn rounded-full bg-green-500 text-white'}>
                                    {article.status}
                                </td>
                                <td>
                                    {
                                        article.status === 'pending' && <button
                                            onClick={() => handleApproveArticle(article)}
                                            className="btn btn-success text-white rounded-full"><FcAcceptDatabase className="text-2xl" /></button>
                                    }

                                </td>
                                <td>

                                    {
                                        article.status === 'pending' ? <button className="btn btn-warning
                                        rounded-full text-white">Decline</button> : ''
                                    }
                                    
                                </td>
                                <td>
                                {article.isPremium === 'no' ? (
                                        <button
                                            onClick={() => handleMakePremium(article)}
                                            className="btn btn-primary rounded-full text-white"
                                        >
                                            Make Premium
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-semibold">It is Premium</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                    onClick={() => handleDeleteArticle(article)}
                                    className="btn btn-ghost btn-xs"> <MdDelete className="text-xl text-red-600" /></button>
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