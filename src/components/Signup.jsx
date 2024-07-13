import logo from "../assets/appLogo.png";
import Footer from "./Footer";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div style={{ background: "#f6f6f6" }} className="signup-body">
      <nav className="navbar flex p-0">
        <a
          className="navbar-brand order-1 "
          href="#"
          style={{ padding: "1rem 0" }}
        >
          <img
            src={logo}
            alt="logo"
            className="app-logo mx-sm-5"
            style={{ width: "80px" }}
          />
        </a>
      </nav>
      <h1
        className="text-center"
        style={{ fontWeight: "400", fontSize: "2.2rem" }}
      >
        Make the most of your professional life
      </h1>

      <SignupForm />

      <div className="text-center my-3">
        Looking to create a page for a business?{" "}
        <span>
          <a
            className="link-offset-2 link-offset-1-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            style={{ fontWeight: "500" }}
          >
            Get help
          </a>
        </span>
      </div>
      <div style={{ background: "white", padding: "0 2rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
