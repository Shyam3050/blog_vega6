import App from "../App";
import BlogItem from "../Component/BlogItem";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Signup from "../Component/Signup";
import { createBrowserRouter } from "react-router-dom";
import ViewBlog from "../Component/ViewBlog";
const router_config = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "blog/:blogid",
        element: <ViewBlog />,
      },
    ],
  },
]);
export default router_config;
