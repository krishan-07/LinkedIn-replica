import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
  return (
    <form className="card p-4 mt-4">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email or phone number
        </label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password ( 6+ characters)
        </label>
        <input type="password" className="form-control" id="password" />
      </div>
      <div className="form-text mb-3 text-center">
        By clicking Agree & Join or Continue, you agree to the IAC
        <center>
          {" "}
          <span>
            <a className="link-offset-2 link-underline link-underline-opacity-0">
              User Agreement
            </a>
          </span>
          ,{" "}
          <span>
            <a className="link-offset-2 link-underline link-underline-opacity-0">
              Privacy Policy
            </a>
          </span>
          , and{" "}
          <span>
            <a className="link-offset-2 link-underline link-underline-opacity-0">
              Cookie Policy
            </a>
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
        Already on IAC?{" "}
        <span>
          <a
            href="/login"
            className="link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            style={{ fontWeight: "500" }}
          >
            Sign In
          </a>
        </span>
      </span>
    </form>
  );
};
export default SignupForm;
