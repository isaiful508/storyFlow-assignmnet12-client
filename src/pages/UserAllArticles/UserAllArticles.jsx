import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UserArticleCard from "./UserArticleCard";
import { useState } from "react";


const UserAllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: approvedArticles = [] } = useQuery({
        queryKey: ['approvedArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles/status/approved');
            return res.data;
        }
    });
    console.log(approvedArticles);

    //handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.search.value);
    };

    const filteredArticles = approvedArticles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container mx-auto mt-6'>
            <div className="flex justify-between items-center  mt-2 mb-10">
                <div className="text-black mt-10 font-500">
                    <form onSubmit={handleSearch}>
                        <input className="rounded-md border border-[#343090] py-2 px-6" placeholder="Search Here" type="text" name="search" />
                        <input className="btn ml-2 text-white hover:bg-[#5f59f7] bg-[#343090]" type="submit" value="Search" />
                    </form>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                {filteredArticles.map(article => (
                    <UserArticleCard
                        article={article}
                        key={article._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserAllArticles;
