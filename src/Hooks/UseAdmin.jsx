import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const UseAdmin = () => {
    const {user, loading} = useAuth();
    const axiosSecure= useAxiosPublic();
   

    const {data: isAdmin, isPending : isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() =>{
            // console.log('asking or checking is admin?', user)
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            // console.log(res.data);
            return res.data?.admin
        },
       
    })
    return [isAdmin, isAdminLoading]
};

export default UseAdmin;