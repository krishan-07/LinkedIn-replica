import { FcGoogle } from "react-icons/fc";
import logo from "../assets/appLogo.png";
import { FaApple } from "react-icons/fa";
import Footer from "./Footer";

const Login = () => {
  return (
    <div>
      <nav className="navbar flex p-0">
        <a
          className="navbar-brand order-1 "
          href="#"
          style={{ padding: "1rem 0" }}
        >
          <img
            src={logo}
            alt="logo"
            className="app-logo mx-5"
            style={{ width: "80px" }}
          />
        </a>
      </nav>

      <form className="card card-shadow p-4 " style={{ maxWidth: "380px" }}>
        <h1 style={{ fontSize: "2rem" }} className="mb-2">
          Sign in
        </h1>

        <button type="button" className="btn btn-google mt-3">
          {" "}
          <FcGoogle size={25} />
          <span className="ms-1">Continue with Google</span>
        </button>
        <button type="button" className="btn btn-apple mt-3 ">
          {" "}
          <FaApple size={25} />
          <span className="ms-1">Sign in with Apple</span>
        </button>

        <span className="text-center my-3"> or </span>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div className=" my-3">
          <span>
            <a
              className="link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              style={{ fontWeight: "500", fontSize: "1.1rem" }}
            >
              Forgot password?
            </a>
          </span>
        </div>

        <button className="btn btn-login my-2">Sign in</button>
      </form>
      <div className="text-center my-4" style={{ fontSize: "1.1rem" }}>
        {` Don't have an account?${" "}`}
        <span>
          <a
            href="/signup"
            className="link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            style={{ fontWeight: "500" }}
          >
            Sign Up
          </a>
        </span>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
