import { FcGoogle } from "react-icons/fc";
import logo from "../assets/appLogo.png";
import { FaApple } from "react-icons/fa";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currUserActions } from "../store/features/currUser";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData);
  const [data, setData] = useState({
    email: "krishan.mondal@gmail.com",
    password: "12345678",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleRedirect = (email) => {
    dispatch(currUserActions.addUser(email));
    setTimeout(() => {
      navigate("/in");
    }, 1000);
  };
  const authenticateUser = () => {
    const user = usersData.find((user) => {
      if (user.email === data.email) return user.password === data.password;
    });
    const errorText = document.getElementById("error-text");

    if (user) {
      handleRedirect(user.email);
      errorText.classList.add("d-none");
    } else errorText.classList.remove("d-none");
  };

  return (
    <div>
      <nav className="navbar flex p-0">
        <Link
          className="navbar-brand order-1 "
          to="/"
          style={{ padding: "1rem 0" }}
        >
          <img
            src={logo}
            alt="logo"
            className="app-logo mx-5"
            style={{ width: "80px" }}
          />
        </Link>
      </nav>

      <form className="card card-shadow p-4 " style={{ maxWidth: "380px" }}>
        <h1 style={{ fontSize: "2rem" }} className="mb-2">
          Sign in
        </h1>

        <button type="button" className="btn btn-google mt-3">
          <FcGoogle size={25} />
          <span className="ms-1">Continue with Google</span>
        </button>
        <button type="button" className="btn btn-apple mt-3 ">
          <FaApple size={25} />
          <span className="ms-1">Sign in with Apple</span>
        </button>

        <span className="text-center my-3"> or </span>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            autoComplete="mail"
            value={data.email}
            onChange={handleOnChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            autoComplete="current-password"
            value={data.password}
            onChange={handleOnChange}
          />
          <label htmlFor="floatingPassword">Password</label>
          <div id="error-text" className="form-text d-none ms-1 text-danger">
            Incorrect password or email
          </div>
        </div>
        <div className=" my-3">
          <span>
            <Link
              className="link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              style={{ fontWeight: "500", fontSize: "1.1rem" }}
            >
              Forgot password?
            </Link>
          </span>
        </div>

        <button
          type="button"
          className="btn btn-login my-2"
          onClick={authenticateUser}
        >
          Sign in
        </button>
      </form>
      <div className="text-center my-4" style={{ fontSize: "1.1rem" }}>
        Don't have an account?
        <span className="ms-1">
          <Link
            to="/signup"
            className="link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            style={{ fontWeight: "500" }}
          >
            Sign Up
          </Link>
        </span>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
