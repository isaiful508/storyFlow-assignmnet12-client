import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Select from 'react-select';
import { imageUpload } from "../../utils";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const AddArticles = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const [selectedTags, setSelectedTags] = useState([]);

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
        { value: 'Entertainment', label: 'Entertainment' },

    ];

    const handleSubmitArticle = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const publisher = form.publisher.value;
        const tags = selectedTags.map(tag => tag.value);
        const image = form.image.files[0];
        
        // console.log(title, publisher, description, tags, image);


        try {

             // Check if user can add an article
             const { data: canAddArticle } = await axiosPublic.get(`/can-add-article/${user?.email}`);

             if (!canAddArticle.allowed) {
                Swal.fire({
                    icon: "error",
                    title: "You are not allowed to add more articles",
                    text: "Please buy premium plans!",
                    
                  });
                 return;
             }
       
            //1.upload image and get image url
            const image_url = await imageUpload(image);
            // console.log(image_url);

            //post artices on database
           
            const articles = {
                title: title,
                description: description,
                image: image_url,
                publisher: publisher,
                tags: tags,
                authorName : user?.displayName,
                authorEmail: user?.email,
                authorPhoto: user?.photoURL,
                status: 'pending',
                isPremium: 'no'
            }
            axiosPublic.post('/articles', articles)
           .then((res )=>{
            // console.log(res.data);
            if(res.data.insertedId){
                toast.success("Added Article Successfully");
                form.reset();
            }

           })
            

        } catch (error) {
            // console.log(error);
            toast.error(error.message)
        }

        
    }


    return (
        <div className="container lg:p-20 pt-10  mx-auto">
            <div className="container md:w-3/4 lg:1/2 mx-auto   p-6 dark:bg-gray-100 dark:text-gray-900  rounded-lg sora-500">

                <div>
                    <h2 className="lg:text-4xl text-2xl text-center noto-600 mb-4 "> Add Your Articles Here</h2>
                </div>

                <form onSubmit={handleSubmitArticle} className=" flex flex-col noto-600 space-y-12">




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

                                <Select
                                isMulti={true}
                                    defaultValue={selectedTags}
                                    onChange={setSelectedTags}
                                    options={tagsOptions}
                                />

                            </div>

                        </div>


                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                                Upload Your Image
                            </label>
                            <input
                                name="image"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="image"
                                type="file"
                            />

                        </div>


                    </div>

                    <div className="flex justify-center items-center input input-bordered border-2 hover:bg-[#5f59f7] bg-[#343090] text-white sora-500">
                        <input className="" type="submit" value="Submit" />
                    </div>


                </form>
            </div>
        </div>
    );
};

export default AddArticles;