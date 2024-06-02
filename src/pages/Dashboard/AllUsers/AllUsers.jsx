import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const AllUsers = () => {
    const axiosPublic = useAxiosPublic()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');

            return res.data;
        }
    })
    // console.log(users);

    //make admin a user
    const handleMakeAdmin = user => {
        axiosPublic.patch(`/users/admin/${user._id}`)
            .then((res) => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.name} is now admin`)
                }
            })
    }




    return (
        <div>
            <div className="flex  gap-4 cinzel-700">
                <h2 className="text-4xl">Total Users : {users.length}</h2>


            </div>


            <div className="overflow-x-auto mt-10 rounded-t-lg">

                <table className="table">
                    {/* head */}
                    <thead className="noto-600 bg-[#5f59f7] text-white">
                        <tr>
                            <th>No.</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>ACTION</th>
                        </tr>

                    </thead>

                    <tbody className="noto-500">

                        {
                            users.map((user, idx) => <tr
                                key={user._id}
                            >

                                <td>
                                    {idx + 1}
                                </td>

                                <td>
                                    {user.name}
                                </td>

                                <td>
                                    {user.email}
                                </td>
                                <td>

                                    {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn text-white bg-[#5f59f7]">
                                        <FaUsers></FaUsers>
                                    </button>}

                                </td>

                                <th>
                                    <button className="btn btn-ghost btn-xs"> <MdDelete className="text-xl text-red-600" /></button>
                                </th>

                            </tr>)
                        }



                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;