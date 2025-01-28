import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./assets/Navbar";
import { useEffect } from "react";
import apiClient from "./assets/axios/interceptor";
import { setUser, userNomad } from "./assets/redux/userSlice";
import Sekelton from "./Pages/Skeleton";

export function Component() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function initializeApp() {
      try {
        if (user?.initial === true) {
          const res = await apiClient("/auth/user/");
          if (res.status >= 200 && res.status < 300) {
            dispatch(setUser(res?.data));
          } else {
            dispatch(userNomad());
          }
        }
      } catch (error) {
        console.error(error);
        dispatch(userNomad());
      }
    }
    initializeApp();
  }, [dispatch, user?.initial]);
  return (
    <main>
      <nav className="navbar navbar-expand-lg bg-secondary" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="index.html">
            Clean Blog
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <Navbar />
          </div>
        </div>
      </nav>
      {isLoading ? <Sekelton /> : <Outlet />}
    </main>
  );
}
