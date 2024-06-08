import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";


const PremiumArticles = () => {
    const axiosPublic = useAxiosPublic();

    //fetch all articles data
    const { data: premiumArticles = [], isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/articles/premium/yes`);

            return res.data;
        }
    })
    console.log(premiumArticles);
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    //slice description

    const sliceDescription = (text) => {
        return text.split(' ').slice(0, 18).join(' ');
    
      };


    return (
        <div className="lg:p-20 pt-16">
            <div>
                <h2 className="text-5xl text-center mb-6 noto-700">Here Our Premium Articles Only</h2>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1  md:gap-4">
            {
                premiumArticles.map(item =>  <div
                key={item._id}
                className='card card-compact w-96 shadow-xl'>
                    <figure><img src={item.image} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title noto-700">{item.title}</h2>
                      <p className="noto-600">{sliceDescription(item.description)} . . .</p>
                      <p className="font-semibold">Publisher: {item.publisher}</p>
                      <div className="tags flex flex-wrap items-center gap-5 justify-between">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="badge p-4 bg-green-400 text-white m-1"># {tag}</span>
                        ))}
              
                      </div>
              
                      <div className="card-actions">
                        <Link
                          to={`/articles/${item._id}`}
                          className="btn text-white hover:bg-[#5f59f7] bg-[#343090]">Details</Link>
                      </div>
                    </div>
                  </div>)
            }
        </div>
        </div>
    );
};

export default PremiumArticles;