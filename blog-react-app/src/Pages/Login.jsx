import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../assets/redux/userSlice";
import apiClient from "../assets/axios/interceptor";

export function Component() {
  useEffect(() => {
    // checkPermission("/user/", true);
  }, []);

  const [isloading, setLoading] = useState(false);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function userLoginApi(data) {
    try {
      const res = await apiClient.post("/auth/login/", data);
      return { status: res.status, res: res.data };
    } catch (error) {
      return { status: error.status, res: error.response.data };
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    const loginData = { username: form.identifier, password: form.password };
    const res = await userLoginApi(loginData);
    // setForm({ identifier: "", password: "" });
    if (parseInt(res.status / 100) != 2) {
      setErrors(res.res);
    } else {
      localStorage.setItem("access_token", res.res.access);
      dispatch(setUser(res.res.user));
      navigate("/");
    }
    setLoading(false);
  }
  return (
    <>
      <section className="d-flex justify-content-center my-5 pt-5">
        <div className="w-100" style={{ maxWidth: "24rem" }}>
          <h1 className="text-center text-primary fw-bold fs-2 mb-3">Login</h1>
          <div className="card shadow-sm">
            <div className="card-body">
              <form>
                {/*  Username Field */}
                <div className="mb-3">
                  <label htmlFor="identifier" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    value={form.identifier}
                    onChange={(e) =>
                      setForm((state) => ({
                        ...state,
                        identifier: e.target.value,
                      }))
                    }
                    placeholder="Enter username"
                    className="form-control"
                    required
                  />
                  {errors?.non_field_errors &&
                    errors.non_field_errors.map((error, index) => (
                      <div key={index} className="text-danger small mt-1">
                        {error}
                      </div>
                    ))}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((state) => ({
                        ...state,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter password"
                    className="form-control"
                    required
                  />
                  {errors?.password &&
                    errors.password.map((error, index) => (
                      <div key={index} className="text-danger small mt-1">
                        {error}
                      </div>
                    ))}
                </div>

                {/* Forgot Password and Submit Button */}
                <div className="d-flex flex-column align-items-start mt-4">
                  <a href="#" className="text-decoration-none small mb-2">
                    Forgot password?
                  </a>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                    disabled={isloading}
                  >
                    {isloading ? (
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      ></div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
