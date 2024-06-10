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
            <div className="card lg:card-side bg-base-100 shadow-xl">

                <img className="rounded-lg" src={article.image} alt="article_image" />

                <div className="card-body">
                    <h2 className="card-title">{article.title}</h2>
                    <p>{article.description}</p>
                    <p>Publisher: {article.publisher}</p>
                    <p><strong>Tags:</strong> #{article.tags.join(', ')}</p>
                    <div>
                        <img className="w-10 rounded-full" src={article.authorPhoto}  alt="" />
                        <p>Author Name:  {article.authorName}</p>
                        <p>Author Email:  {article.authorEmail}</p>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserArticleDetails;