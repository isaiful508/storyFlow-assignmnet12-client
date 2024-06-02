import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { imageUpload } from "../../../utils";


const AddPublisher = () => {
    const axiosPublic =useAxiosPublic();

    const handlePublisher = async (e) => {
        e.preventDefault();
        const form = e.target;
        const publisherName = form.name.value;
        const logo = form.image.files[0];

        // console.log(publisherName, logo);

        try {
            // 1. Upload image and get image URL
            const image_url = await imageUpload(logo);
            // console.log(image_url);

            const publisherInfo = {
                publisher: publisherName,
                logo: image_url
            };

            const res = await axiosPublic.post('/publishers', publisherInfo);
            // console.log(res.data);
            if(res.data.insertedId){
                toast.success("Added Publisher Successfully");
                form.reset();
            }

           
        } catch (error) {
            console.log(error);
            toast.error("Failed to add publisher");
        }
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                       Add Publisher Here
                    </h1>

                    <form
                       onSubmit={handlePublisher}
                        className="space-y-4 md:space-y-6">
                        <div>

                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                               Publisher Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter Publisher Name"
                                required
                            />
                        </div>
                       
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                               Upload Publisher Logo
                            </label>
                            <input
                               name="image"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="image"
                                type="file"
                            />

                        </div>
                        
             
                        <input className="btn  text-white hover:bg-[#5f59f7] w-full bg-[#343090]" type="submit" value="Add Publisher" />


                        
                    </form>
                    
                </div>
            </div>
        </div>
    </section>
    );
};

export default AddPublisher;