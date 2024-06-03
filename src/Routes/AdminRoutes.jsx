import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import UseAdmin from "../Hooks/UseAdmin";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";


const AdminRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();
    
    if (loading || isAdminLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;