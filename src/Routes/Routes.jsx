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
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllArticles from "../pages/Dashboard/AllArticles/AllArticles";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AdminRoutes from "./AdminRoutes";
import ErrorPage from "../Error/ErrorPage";


  const router = createBrowserRouter([
    {
      path: "/",
      
      element:<MainLayouts></MainLayouts>,
      errorElement: <ErrorPage></ErrorPage>,
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
      element: <AdminRoutes><DashboardLayouts></DashboardLayouts></AdminRoutes>,
      children: [
        {
          path: 'all-users',
          element:<AllUsers></AllUsers>
        },
        {
          path:'all-articles',
          element:<AllArticles></AllArticles>
        },
        {
          path:'add-publisher',
          element:<AddPublisher></AddPublisher>
        }
      ]
    }
  ]);
  export default router;