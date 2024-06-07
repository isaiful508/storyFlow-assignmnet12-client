import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import PublisherCard from "./PublisherCard";


const AllPublishers = () => {
    const axiosPublic = useAxiosPublic();
    //publisher data fetch
    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/publishers');

            return res.data;
        }
    })

    return (
       <div>
        <div className="text-center mt-20">
            <h2 className="text-4xl noto-700">Our All Publishers</h2>
        </div>
        <div  className="flex gap-4 mt-10"> 
        {
            publishers.map(item =>  <PublisherCard
            key={item._id}
            item={item}
            className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                
            </PublisherCard>)
        }
       </div>
       </div>
    );
};

export default AllPublishers;