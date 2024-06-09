import { useEffect } from "react";
import useAxiosPublic from './../../../Hooks/useAxiosPublic';
import useAuth from './../../../Hooks/useAuth';

const useCheckPremiumStatus = () => {
    const { user, setUser } = useAuth();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const checkPremiumStatus = async () => {
            if (user) {
                try {
                    const res = await axiosPublic.get(`/users/${user._id}`);
                    const userData = res.data;
                    console.log(userData);

                    if (userData.premiumTaken) {
                        const premiumTakenDate = new Date(userData.premiumTaken);
                        const currentDate = new Date();


                        const subscriptionPeriodInDays = 10;
                        const expiryDate = new Date(premiumTakenDate);
                        expiryDate.setDate(premiumTakenDate.getDate() + subscriptionPeriodInDays);

                        if (currentDate > expiryDate) {
                            // Reset premiumTaken to null
                            await axiosPublic.put(`/users/${user.uid}/premium`, { premiumTaken: null });
                            setUser({ ...user, premiumTaken: null });
                        }
                    }
                } catch (err) {
                    console.error('Error fetching user data', err);
                }
            }
        };

        checkPremiumStatus();
    }, [user, axiosPublic, setUser]);
};

export default useCheckPremiumStatus;