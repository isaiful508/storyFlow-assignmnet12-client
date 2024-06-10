import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';



const Statistic = () => {
    const axiosPublic = useAxiosPublic()
    const { data: AllUsers = [],isLoading } = useQuery({
        queryKey: ['AllUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');

            return res.data;
        }
    })
    // console.log(AllUsers);
    if(isLoading){
        return <LoadingSpinner
        ></LoadingSpinner>
    }
    const isPremiumUser = (user) => user.premiumTaken && user.premiumTaken !== 'null';
    
    const normalUsersCount = AllUsers.filter(user => !isPremiumUser(user)).length;
    const premiumUsersCount = AllUsers.filter(isPremiumUser).length;
    
    
   
    return (
       <div>
         <div className="mt-20 text-center  w-full">
        <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full">

            <div className="stat">
                <div className="stat-title text-2xl noto-600 text-base-content">All Users</div>
                <div className="stat-value">
                <CountUp
                end={AllUsers.length}
                duration={3}
                />
                    </div>
               
            </div>

            <div className="stat">
                <div className="stat-title text-2xl noto-600 text-base-content">Normal Users</div>
                <div className="stat-value"> <CountUp end={normalUsersCount} duration={3} /></div>
                
            </div>

            <div className="stat">
                <div className="stat-title text-2xl noto-600 text-base-content">Premium Users</div>
                <div className="stat-value"> <CountUp end={premiumUsersCount} duration={3} /></div>
                
            </div>

        </div>
    </div>
       </div>
    );
};

export default Statistic;