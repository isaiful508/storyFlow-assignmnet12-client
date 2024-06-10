import axios from "axios"
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';


const axiosSecure = axios.create({
  baseURL: 'https://story-flow-server.vercel.app'
})

const useAxiosSecure = () => {
  const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors before adding token', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // console.log('No token found in local storage');
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    //intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptors', status);
        //for 401 or 403 logout the user and navigate the user to login page

        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    }
    )





    return axiosSecure;
}

export default useAxiosSecure;