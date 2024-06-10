import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";




const UserArticleDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: article, isLoading } = useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/articles/${id}`);
            return res.data;
        }
    });
    // console.log(article);

    useEffect(() => {
        const incrementViewCount = async () => {
            try {
                await axiosSecure.patch(`/articles/${id}/view`);
            } catch (error) {
                console.error('Error incrementing view count:', error);
            }
        };
        incrementViewCount();
        // console.log(incrementViewCount);
    }, [id,axiosSecure]);


    //loading spinner set
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }


    return (
        <div className="container mx-auto mt-10 pt-20">
            <div className="lg:card-side bg-base-100 shadow-xl">

                <img className="rounded-lg w-full lg:h-[750px]" src={article.image} alt="article_image" />

                <div className="card-body">
                    <h2 className="card-title noto-700 text-2xl lg:text-3xl">{article.title}</h2>
                    <p className="noto-600 mt-2">{article.description}</p>
                    <p className="font-semibold">Publisher: <span className="noto-600">{article.publisher}</span></p>
                    <p><strong>Tags:</strong> <span className="badge p-4 bg-green-600 text-white m-1 noto-600">#{article.tags.join(', ')}</span></p>
                    <hr />
                    <div className="mt-4 space-y-2">
                        <img className="w-10 rounded-full" src={article.authorPhoto}  alt="" />
                        <p className="font-semibold">Author Name:  <span className="noto-600 uppercase">{article.authorName}</span></p>
                        <p className="font-semibold">Author Email:  <span className="noto-600">{article.authorEmail}</span></p>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserArticleDetails;