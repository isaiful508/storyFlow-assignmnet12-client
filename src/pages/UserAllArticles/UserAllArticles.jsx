import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UserArticleCard from "./UserArticleCard";
import Select from 'react-select';
import { useEffect, useState } from "react";


const UserAllArticles = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);
    
   

    const { data: approvedArticles = [] } = useQuery({
        queryKey: ['approvedArticles'],
        queryFn: async () => {
            const res = await axiosPublic.get('/articles/status/approved');
            return res.data;
        }
    });

   console.log(approvedArticles);

    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/publishers');
            return res.data;
        }
    });

    const tagsOptions = [
        { value: 'National', label: 'National' },
        { value: 'International', label: 'International' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Science', label: 'Science' },
    ];


    const { data: filteredPublisher = [] } = useQuery({
        queryKey: ['filteredPublisher', selectedPublisher],
        queryFn: async () => {
            const res = await axiosPublic.get(`/articles/publisher/${selectedPublisher}`);
            return res.data;
        },
        enabled: !!selectedPublisher, // Enable query only when a publisher is selected
    });


    useEffect(() => {
        const filteredByPublisher = selectedPublisher ? approvedArticles.filter(article => article.publisher === selectedPublisher) : approvedArticles;

        const filteredBySearch = filteredByPublisher.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredArticles(filteredBySearch);
        
    }, [approvedArticles, selectedPublisher, searchTerm]);




    //handle search
    const handleSearch = (e) => {
        e.preventDefault();
        // refetch();
        setSearchTerm(e.target.search.value);
    };

    

    // const filteredArticles = approvedArticles.filter((article) =>
    //     article.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );


    return (
        <div className='container mx-auto mt-6'>
            <div className="flex justify-between items-center  mt-2 mb-10">
                <div className="text-black mt-10 font-500">
                    <form onSubmit={handleSearch}>
                        <input className="rounded-md border border-[#343090] py-2 px-6" placeholder="Search Here" type="text" name="search" />
  
                        <input className="btn ml-2 text-white hover:bg-[#5f59f7] bg-[#343090]" type="submit" value="Search" />
                    </form>
                </div>

                <div className="flex items-center mt-10">
                    <select
                        className="rounded-md border border-[#343090] py-2 px-6"
                        value={selectedPublisher}
                        onChange={(e) => setSelectedPublisher(e.target.value)}
                       
                    >
                        <option value="">All Publishers</option>
                        {publishers.map(publisher => (
                            <option key={publisher._id} value={publisher.publisher}>{publisher.publisher}</option>
                        ))}
                    </select>
                    <Select
                        className="ml-2"
                        isMulti
                        options={tagsOptions}
                        
                        
                       
                        
                    />
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
