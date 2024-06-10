import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Login = () => {
    const { logIn, setLoading, loading } = useAuth();
    const navigate = useNavigate();
    const axiosPublic= useAxiosPublic();
    const location = useLocation();
    const [loginError, setLoginError] = useState("");
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true)
            await logIn(email, password);
            const res = await axiosPublic.post('/login', { email, password });
            const user = res.data;
            console.log(user)

            toast.success("Login Successfully");
            navigate(from, { replace: true });

        } catch (error) {
            console.log(error);
            if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
                // Show error message for incorrect email or password
                setLoginError("Incorrect email or password. Please try again.");
            }
            setLoading(false);
        }


    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login Here
                        </h1>

                        <form
                            onSubmit={handleLogin}
                            className="space-y-4 md:space-y-6">

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
                            {
                                loginError && <p className="text-red-700 font-semibold">{loginError}</p>
                            }


                            <input className="btn text-white hover:bg-[#5f59f7] w-full bg-[#343090]" type="submit" value="Login" />


                            <p className="mb-4 text-center">Already Have not an account ?
                                <Link to='/register'>Register here</Link>
                            </p>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;