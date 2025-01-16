import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../assets/redux/userSlice";
import apiClient from "../assets/axios/interceptor";

export function Component() {
  const [isloading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function userSignupApi(data) {
    try {
      const res = await apiClient.post("/auth/register/", data);
      return { status: res.status, res: res.data };
    } catch (error) {
      return { status: error.response.status, res: error.response.data };
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await userSignupApi(form);
    if (parseInt(res.status / 100) != 2) {
      setErrors(res.res);
    } else {
      localStorage.setItem("access_token", res.res.access);
      localStorage.setItem("refresh_token", res.res.refresh);
      dispatch(setUser(res.res.user));
      navigate("/");
    }
    setLoading(false);
  };
  return (
    <>
      <section className="d-flex justify-content-center w-100 my-5 pt-5">
        <div className="w-100" style={{ maxWidth: "36rem" }}>
          <h1 className="text-center text-primary fw-bold fs-2 mb-4">SignUp</h1>
          <div className="card shadow-sm">
            <div className="card-body">
              <form>
                {/* First Name and Last Name */}
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="first_name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="form-control"
                    />
                    {errors?.first_name &&
                      errors.first_name.map((error, index) => (
                        <div key={index} className="text-danger small mt-1">
                          {error}
                        </div>
                      ))}
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="last_name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="form-control"
                      required
                    />
                    {errors?.last_name &&
                      errors.last_name.map((error, index) => (
                        <div key={index} className="text-danger small mt-1">
                          {error}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="form-control"
                    required
                  />
                  {errors?.username &&
                    errors.username.map((error, index) => (
                      <div key={index} className="text-danger small mt-1">
                        {error}
                      </div>
                    ))}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password1"
                    name="password1"
                    value={form.password1}
                    onChange={handleChange}
                    placeholder="Password"
                    className="form-control"
                    required
                  />
                  {errors?.password1 &&
                    errors.password1.map((error, index) => (
                      <div key={index} className="text-danger small mt-1">
                        {error}
                      </div>
                    ))}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="password2" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={form.password2}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="form-control"
                    required
                  />
                  {errors?.password2 &&
                    errors.password2.map((error, index) => (
                      <div key={index} className="text-danger small mt-1">
                        {error}
                      </div>
                    ))}
                  {errors?.non_field_errors &&
                    errors.non_field_errors.map((error, index) => (
                      <div key={index} className="text-danger small mt-1">
                        {error}
                      </div>
                    ))}
                </div>

                {/* Forgot Password */}
                <div className="d-flex justify-content-start mb-3">
                  <a href="#" className="text-decoration-none small">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary w-100"
                  >
                    {isloading ? (
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Signup"
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
