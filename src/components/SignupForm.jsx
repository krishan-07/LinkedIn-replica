import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <form className="card p-4 mt-4">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email or phone number
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password ( 6+ characters)
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          autoComplete="new-password"
          required
        />
      </div>
      <div className="form-text mb-3 text-center">
        By clicking Agree & Join or Continue, you agree to the IAC
        <center>
          {" "}
          <span>
            <Link className="link-offset-2 link-underline link-underline-opacity-0">
              User Agreement
            </Link>
          </span>
          ,{" "}
          <span>
            <Link className="link-offset-2 link-underline link-underline-opacity-0">
              Privacy Policy
            </Link>
          </span>
          , and{" "}
          <span>
            <Link className="link-offset-2 link-underline link-underline-opacity-0">
              Cookie Policy
            </Link>
          </span>
        </center>
      </div>
      <button type="button" className="btn btn-primary">
        Agree & Join
      </button>
      <span className="text-center my-3"> or </span>
      <button type="button" className="btn btn-google">
        {" "}
        <FcGoogle size={25} />
        <span className="ms-1">Continue with Google</span>
      </button>
      <span className="text-center mt-5">
        Already on IAC?
        <span className="ms-1">
          <Link
            to="/login"
            className="link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            style={{ fontWeight: "500" }}
          >
            Sign In
          </Link>
        </span>
      </span>
    </form>
  );
};
export default SignupForm;
