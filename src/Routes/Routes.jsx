import {
    createBrowserRouter
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../components/Home/Home/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import AddArticles from "../pages/AddArticles/AddArticles";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayouts from "../Layouts/DashboardLayouts";


  const router = createBrowserRouter([
    {
      path: "/",
      
      element:<MainLayouts></MainLayouts>,
      children: [
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
        {
          path:'/login',
          element: <Login></Login>
        },
        {
          path:'/addArticles',
          element:<PrivateRoutes><AddArticles></AddArticles></PrivateRoutes>
        }
      ]
    },
    {
      path:'/dashboard',
      element: <DashboardLayouts></DashboardLayouts>,
      children: [
        
      ]
    }
  ]);
  export default router;