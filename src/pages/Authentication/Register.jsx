import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from './../../providers/AuthProvider';
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { imageUpload } from "../../utils";
import SocialLogin from "./SocialLogin";
import useAxiosPublic from "../../Hooks/useAxiosPublic";




const Register = () => {
    const { createUser, logOut, loading, setLoading, updateUserProfile } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const axiosPublic = useAxiosPublic();


    const navigate = useNavigate();





    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];


        setPasswordError("")

    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }


    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must be at least one uppercase letter.");
      return;
    }


    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must be at least one lowercase letter.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setPasswordError("Password must contain at least one special character.");
        return;
      }


        try {
            setLoading(true)
            //1.upload image and get image url
            const image_url = await imageUpload(image);
            // console.log(image_url);

            // user signup
            const result = await createUser(email, password)
            // console.log(result.user);

            //3.save username and photo in firebase
            await updateUserProfile(name, image_url)
            const userInfo = {
                name: name,
                email: email,
                premiumTaken: 'null',
                photoURL: image_url
            }
            axiosPublic.post('/users', userInfo)
           .then((res) =>{
            // console.log(res.data);
           })

           toast.success("Registration Successfully");
           logOut()
           navigate('/login');

        } catch (error) {
            // console.log(error);
            toast.error(error.message)
        }


    }





    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register Here
                        </h1>

                        <form
                            onSubmit={handleRegister}
                            className="space-y-4 md:space-y-6">
                            <div>

                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter Your Email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"

                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                

                            </div>

                            <div>
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
                            {
                    passwordError && <p className="text-red-700 font-semibold">{passwordError}</p>
                }
                            <input className="btn  text-white hover:bg-[#5f59f7] w-full bg-[#343090]" type="submit" value="Register" />


                            <p className="mb-4 text-center">Already Have an account ?
                                <Link to='/login'>Login Here</Link>
                            </p>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;