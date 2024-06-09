
import useAuth from "../Hooks/useAuth";

import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";


const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoutes;