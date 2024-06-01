import {
    createBrowserRouter
} from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../components/Home/Home/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import AddArticles from "../pages/AddArticles/AddArticles";
import PrivateRoutes from "./PrivateRoutes";


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
  ]);
  export default router;