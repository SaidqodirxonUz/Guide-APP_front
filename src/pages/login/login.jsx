/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) navigate("/");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      let res = await axios.post("/users/login", values);

      if (res.status === 200) {
        toast("Successful", { type: "success" });
        setValues({ username: "", password: "" }); // Clear input values
        localStorage.setItem("token", res.data.data.token); // Save token to localStorage

        navigate("/");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        toast("Network Error", { type: "warning" });
      } else {
        toast("Data error", { type: "error" });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e) {
    setValues((oldValues) => {
      return {
        ...oldValues,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="min-vh-100 text-bg-light d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="bg-white border w-50 p-3">
        <div
          className="d-flex justify-content-center my-3"
          style={{ alignContent: "center" }}
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            style={{ borderRadius: "50%", width: "10rem" }}
          />
        </div>
        <h1
          className="d-flex justify-content-center my-3 text-primary "
          style={{ fontSize: "5em" }}
        >
          Login
        </h1>

        <div className="my-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-3">
          <button
            disabled={
              !values.username || !values.password || isSubmitting // Disable the button while submitting
            }
            className="btn btn-primary d-block w-100 fs-4"
          >
            {isSubmitting ? "Entering..." : "Enter"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
