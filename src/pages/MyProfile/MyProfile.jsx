import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { imageUpload } from "../../utils";
import toast from "react-hot-toast";


const MyProfile = () => {
    const { user, updateUserProfile, setUser } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [profilePicture, setProfilePicture] = useState(null);

    //handle update profile
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log(displayName, profilePicture)

        let image_url = user.photoURL;

        if (profilePicture) {
            try {
                image_url = await imageUpload(profilePicture);
            } catch (error) {
                toast.error('Error uploading image');
                console.error('Error uploading image:', error);
                return;
            }
        }

        try {
            await updateUserProfile(displayName, image_url,);

            setUser({ ...user, displayName, image_url });
            toast.success('Profile updated successfully');

        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-center items-center mt-4">
                        <img className="w-24 rounded-lg" src={user?.photoURL} alt="" />
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Update Profile
                        </h1>

                        <form
                            onSubmit={handleUpdateProfile}
                            className="space-y-4 md:space-y-6">
                            <div>

                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Update Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={user?.displayName}
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    disabled={true}
                                    defaultValue={user?.email}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                                    Update Your Photo
                                </label>
                                <input
                                    name="image"
                                    onChange={(e) => setProfilePicture(e.target.files[0])}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="image"
                                    type="file"
                                />

                            </div>

                            <input className="btn  text-white hover:bg-[#5f59f7] w-full bg-[#343090]" type="submit" value="Update" />



                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;