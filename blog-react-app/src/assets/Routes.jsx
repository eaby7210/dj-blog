import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("../App.jsx"),
    children: [
      {
        path: "",
        lazy: () => import("../Pages/Home.jsx"),
      },
      {
        path: "signup",
        lazy: () => import("../Pages/Signup.jsx"),
      },
      {
        path: "login",
        lazy: () => import("../Pages/Login.jsx"),
      },
      {
        path: "blog/:id",
        lazy: () => import("../Pages/PostPage.jsx"),
      },
      {
        path: "addblog",
        lazy: () => import("../Pages/AddPost.jsx"),
      },
      {
        path: "userblogs",
        lazy: () => import("../Pages/UserPosts.jsx"),
      },
      {
        path: "userblogs/:id",
        lazy: () => import("../Pages/EditPost.jsx"),
      },
    ],
  },
]);

export default router;
