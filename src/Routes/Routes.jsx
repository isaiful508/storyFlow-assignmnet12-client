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
import UserAllArticles from "../pages/UserAllArticles/UserAllArticles";
import UserArticleDetails from "../pages/UserAllArticles/UserArticleDetails";
import MyArticles from "../pages/MyArticles/MyArticles";
import MyProfile from "../pages/MyProfile/MyProfile";
import Subscriptions from "../pages/Paymnet/Subscriptions/Subscriptions";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import Payment from "../pages/Paymnet/Payment/Payment";


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
        },
        {
          path:'/userAllArticles',
          element: <UserAllArticles></UserAllArticles>
        },
        {
          path:'/articles/:id',
          element: <PrivateRoutes><UserArticleDetails></UserArticleDetails></PrivateRoutes>,
          
        },
        {
          path: '/myArticles',
          element: <PrivateRoutes><MyArticles></MyArticles></PrivateRoutes>
        },
        {
          path: '/myProfile',
          element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
        },
        {
          path:'/subscription/:planType/:price',
          element:<PrivateRoutes><Subscriptions></Subscriptions></PrivateRoutes>
        },
        {
          path:'/premiumArticles',
          element: <PrivateRoutes><PremiumArticles></PremiumArticles></PrivateRoutes>
        },
        {
          path:'/payment/:totalPrice',
          element:<PrivateRoutes><Payment></Payment></PrivateRoutes>
        }
        
      ]
    },
    // admin route
    {
      path:'/dashboard',
      element: <AdminRoutes><DashboardLayouts></DashboardLayouts></AdminRoutes>,
      children: [
        {
          path: 'all-users',
          element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
        {
          path:'all-articles',
          element:<AdminRoutes><AllArticles></AllArticles></AdminRoutes>
        },
        {
          path:'add-publisher',
          element:<AdminRoutes><AddPublisher></AddPublisher></AdminRoutes>
        }
      ]
    }
  ]);
  export default router;