import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    // console.log(users);

 // Pagination logic
 const indexOfLastUser = currentPage * usersPerPage;
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
 const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
 const totalPages = Math.ceil(users.length / usersPerPage);

 const handlePageChange = (page) => {
     setCurrentPage(page);
 };







    //make admin a user
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then((res) => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.name} is now admin`)
                }
            })
    }

    //handle delete users
    const handleDeleteUser = async (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f59f7",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${user._id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `${user.name}has been deleted.`,
                            icon: "success"
                        });
                        refetch();
                    } else {
                        Swal.fire({
                            title: "Failed!",
                            text: "Failed to delete article.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error('Error deleting article:', error);
                    Swal.fire({
                        title: "Error!",
                        text: "Error deleting article.",
                        icon: "error"
                    });
                }
            }
        });
    };


    return (
        <div>
            <div className="flex  gap-4">
               <div className="mx-auto mt-10">
               <h2 className="lg:text-4xl text-2xl noto-700">Total Users : {users.length}</h2>
               </div>


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
                            currentUsers.map((user, idx) => <tr
                                key={user._id}
                            >

                                <td>
                                    {idx + 1 + indexOfFirstUser}
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
                                    <button onClick={()=> handleDeleteUser(user)} className="btn btn-ghost btn-xs"> <MdDelete className="text-xl text-red-600" /></button>
                                </th>

                            </tr>)
                        }



                    </tbody>

                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />


        </div>
    );
};

export default AllUsers;