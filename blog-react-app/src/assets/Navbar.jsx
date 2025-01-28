import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "./axios/interceptor";
import { userLogout } from "./redux/userSlice";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await apiClient.post("/auth/logout/");
      if (res.status >= 200 && res.status < 300) {
        dispatch(userLogout());
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ul className="navbar-nav ms-auto py-4 py-lg-0">
      <li className="nav-item">
        <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/" end>
          Home
        </Link>
      </li>
      {user.pk && (
        <>
          <li className="nav-item">
            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/addblog" end>
              Add Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/userblogs" end>
              Your Post
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link px-lg-3 py-3 py-lg-4"
              onClick={handleLogout}
            >
              ( {user.username} )
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link px-lg-3 py-3 py-lg-4"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </>
      )}
      {!user?.pk && (
        <>
          <li className="nav-item">
            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login" end>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/signup" end>
              SignUp
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navbar;
