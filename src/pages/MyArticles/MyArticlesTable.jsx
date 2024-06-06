/* eslint-disable react/prop-types */


import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MyArticlesTable = ({ article, idx, refetch }) => {
    const { title,
        status,
        isPremium,

        _id,

        declinedReason
    } = article;
    const [openModal, setOpenModal] = useState(false);




    const sliceTitle = (text) => {
        return text.split(' ').slice(0, 3).join(' ');
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

            <td><Link to={`/articles/${_id}`} className="btn text-white hover:bg-[#5f59f7]  bg-[#343090]">Details</Link></td>

            <td className={status === 'pending' || status === 'declined' ? 'btn btn-xs p-2 rounded-full bg-red-500 text-white' : 'btn btn-xs p-2 rounded-full bg-green-500 text-white'}>

                <div className='flex flex-col gap-2'>
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



            <td>
                {isPremium}
            </td>
            <td>Update</td>
            <td>
                <button

                    className="btn btn-ghost btn-xs"> <MdDelete className="text-xl text-red-600" /></button>
            </td>


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


        </tr>

    );
};

export default MyArticlesTable;