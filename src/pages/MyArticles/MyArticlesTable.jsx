/* eslint-disable react/prop-types */


import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { imageUpload } from '../../utils';
import toast from 'react-hot-toast';

const MyArticlesTable = ({ article, idx, refetch }) => {
    const { title,
        status,
        isPremium,

        _id,

        declinedReason
    } = article;

    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const axiosPublic = useAxiosPublic();

    //delete article 
    const handleDeleteArticle = async (_id) => {
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
                    const res = await axiosPublic.delete(`/articles/${_id}`);
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
                        text: `Error deleting ${title}`,
                        icon: "error"
                    });
                }
            }
        });
    };


    const sliceTitle = (text) => {
        return text.split(' ').slice(0, 3).join(' ');
    };

    //publisher data fetch
    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/publishers');

            return res.data;
        }
    })

    //tag options

    const tagsOptions = [
        { value: 'National', label: 'National' },
        { value: 'International', label: 'International' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Science', label: 'Science' },

    ];

    // handle update article
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const publisher = form.publisher.value;
        const tags = selectedTags.map(tag => tag.value);
        const image = form.image.files[0];

        console.log(title, publisher, description, tags, image);
        //upload image
        const image_url = await imageUpload(image);
        // console.log(image_url);

        
       
            const res = await axiosPublic.patch(`/articles/${_id}/update`, { title: title,
                description: description,
                publisher: publisher,
                tags: tags,
                image: image_url });
                // console.log(res.data.result);

            if (res.data.result.modifiedCount > 0) {
                
                toast.success("Article updated successfully");
                setOpenModal2(false);
                refetch();
            } else {
                toast.error("Failed to updated  article");
            }
        } 
    




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

            <td><Link to={`/articles/${_id}`} className="btn  shadow-lg  text-white hover:bg-[#5f59f7]  bg-[#343090]">Details</Link></td>

            <td className={status === 'pending' || status === 'declined' ? 'btn btn-xs p-2 rounded-full bg-red-500 text-white' : 'btn btn-xs p-2 rounded-full bg-green-500 text-white'}>

                <div className='flex t flex-col gap-2'>
                    {status}
                    {status === 'declined' && (
                        <button
                            onClick={() => setOpenModal(true)}
                            className="ml-2 text-[#5f59f7] underline"
                        >
                            See Reason
                        </button>
                    )}
                </div>
            </td>



            <td className='text-xl'>
                {isPremium}
            </td>
            <td><MdEdit onClick={() => setOpenModal2(true)} className='text-xl'></MdEdit></td>
            <td>
                <button
                    onClick={() => handleDeleteArticle(_id)}
                    className="btn btn-ghost btn-xs"> <MdDelete className="text-xl text-red-600" /></button>
            </td>

            {/* show reason modal */}
            <Modal size="lg" className="w-full max-w-md mx-auto"
                show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className='text-center'>Decline Reason</Modal.Header>
                <Modal.Body>
                    <div className='noto-600 text-2xl'>
                        {
                            declinedReason}
                    </div>
                </Modal.Body>
            </Modal>

            {/* update modal */}

            <Modal size="lg" className="w-full max-w-md mx-auto" show={openModal2} onClose={() => setOpenModal2(false)}>
                <Modal.Header className='text-center'>Update Article</Modal.Header>
                <Modal.Body>
                    <form
                    onSubmit={handleUpdate}
                    className=" flex flex-col noto-600 space-y-12">
                        <div className=" gap-4">
                            <div className="flex justify-center  items-center gap-4">
                                <div className="w-1/2">
                                    <label className="text-sm">Title</label>
                                    <input type="text" name="title" placeholder="Enter Title Here" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
                                </div>
                                <div className="col-span-full w-1/2 sm:col-span-3">
                                    <label className="text-sm">Publisher</label>
                                    <select className="w-full input input-bordered" name="publisher">
                                        {publishers.map(item => (
                                            <option key={item._id} value={item.publisher}>{item.publisher}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-4">
                                <div className="w-1/2">
                                    <label className="text-sm">Description</label>
                                    <textarea name="description" type="text" placeholder="Description" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 input input-bordered" />
                                </div>
                                <div className="w-1/2">
                                    <label className="text-sm">Tags</label>
                                    <Select isMulti={true}
                                        defaultValue={selectedTags}
                                        onChange={setSelectedTags}
                                        options={tagsOptions}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Your Image</label>
                                <input name="image" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" type="file" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center input input-bordered border-2 hover:bg-[#5f59f7] bg-[#343090] text-white sora-500">
                            <input className="" type="submit" value="Update" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>


        </tr>

    );
};

export default MyArticlesTable;