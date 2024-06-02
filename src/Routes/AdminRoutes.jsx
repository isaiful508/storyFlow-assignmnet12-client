import { useLocation } from "react-router-dom";


const AdminRoutes = ({children}) => {
    const { user, loading } = UseAuth();
    const [isAdmin, isAdminLoading] = UseAdmin()
    const location = useLocation();
    return (
        <div>
            
        </div>
    );
};

export default AdminRoutes;