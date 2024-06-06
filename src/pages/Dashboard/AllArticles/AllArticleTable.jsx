/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import toast from "react-hot-toast";
import { useState } from "react";
import { Modal } from "flowbite-react";
import Swal from "sweetalert2";


const AllArticleTable = ({article, idx, refetch}) => {
    const axiosPublic = useAxiosPublic();
    const [openModal, setOpenModal] = useState(false);
   
   

    const {title, 
        authorName, 
        authorEmail, 
        authorPhoto,
        postedDate, 
        status, 
        isPremium,
        publisher,
        _id
    } = article;
   

    
    const handleApproveArticle = async (article) => {
        console.log(article)
        try {
            const res = await axiosPublic.patch(`/articles/${article._id}/status`, { status: 'approved' });
            if (res.data.modifiedCount > 0) {
                toast.success("Article approved successfully");
                refetch();
            } else {
                toast.error("Failed to approve article");
            }
        } catch (error) {
            console.error('Error approving article:', error);
            toast.error("Error approving article");
        }
    };


    //article premium updater
    const handleMakePremium = async (article) => {
        try {
            const res = await axiosPublic.patch(`/articles/${article._id}/premium`, { isPremium: 'yes' });
            if (res.data.modifiedCount > 0) {
                toast.success("Article marked as premium successfully");
                refetch();
            } else {
                toast.error("Failed to mark article as premium");
            }
        } catch (error) {
            console.error('Error making article premium:', error);
            toast.error("Error making article premium");
        }
    };


    const handleDeleteArticle = async (article) => {
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
                    const res = await axiosPublic.delete(`/articles/${article._id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `${title} has been deleted.`,
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




    const sliceTitle = (text) => {
        return text.split(' ').slice(0, 3).join(' ');
    };


    //handle declined

    const handleDeclineArticle = async (event) => {

        event.preventDefault();
        const form = event.target;
        const reason = form.declinedReason.value;
       

        try {
            const res = await axiosPublic.patch(`/articles/${_id}/declinedStatus`, { status: 'declined', declinedReason: reason });
            if (res.data.modifiedCount > 0) {
                
                toast.success("Article declined successfully");
                setOpenModal(false);
                refetch();
            } else {
                toast.error("Failed to decline article");
            }
        } catch (error) {
            console.error('Error declining article:', error);
            toast.error("Error declining article");
        }
    };



    return (
        
            <tr
                 className="hover:bg-gray-300 font-500 hover:text-gray-700"
                            >

                                <td>
                                    {idx + 1}
                                </td>

                                <td>
                                    {sliceTitle(title)}...
                                </td>

                                <td>{authorName}</td>
                                <td>{authorEmail}</td>
                                <td>
                                    <img src={authorPhoto} alt={authorName} className="w-10 h-10 rounded-full" />
                                </td>

                                <td>{new Date(postedDate).toLocaleDateString()}</td>
                                <td>{publisher}</td>

                                <td className={status === 'pending' ? 'btn rounded-full bg-red-500 text-white' : 'btn rounded-full bg-green-500 text-white'}>
                                    {status}
                                </td>
                                <td>
                                    {
                                        status === 'pending' && <button
                                            onClick={() => handleApproveArticle(article)}
                                            className="btn btn-success text-white rounded-full"><FcAcceptDatabase className="text-2xl" /></button>
                                    }

                                </td>
                                <td>

                                    {
                                        status === 'pending' ? <button
                                            onClick={() => setOpenModal(true)}
                                            className="btn btn-warning
                                        rounded-full text-white">Decline</button> : ''
                                    }

                                </td>

                                <td>
                                    {isPremium === 'no' ? (
                                        <button
                                            onClick={() => handleMakePremium(article)}
                                            className="btn btn-primary rounded-full text-white"
                                        >
                                            Make Premium
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-semibold">It is Premium</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteArticle(article)}
                                        className="btn btn-ghost btn-xs"> <MdDelete className="text-xl text-red-600" /></button>
                                </td>

                                <Modal 
            size="lg" className="w-full max-w-md mx-auto"
            show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Decline Reason</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleDeclineArticle}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Reason for Decline</span>
                            </label>
                            <textarea
                                name="declinedReason"
                                className="textarea textarea-bordered"
                                placeholder="Enter reason for decline"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


                            </tr>
        
    );
};

export default AllArticleTable;