import illustration from "../assets/illustration.svg";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import Section from "./Section";
import Footer from "./Footer";

const LandingPageBody = () => {
  return (
    <>
      <div className="d-flex mt-sm-5 container-m">
        <div className="left-container ps-4">
          <h1 className="heading">Welcome to your professional community</h1>
          <form className="card ms-lg-0">
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
            <div class="form-text mb-3 text-center my-3">
              By clicking Agree & Join or Continue, you agree to the IAC{" "}
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
            </div>
            <span
              className="text-center mt-2 mb-5"
              style={{ fontSize: "1.2rem" }}
            >
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
        </div>

        <div className="right-container mb-5">
          <img
            src={illustration}
            alt=""
            style={{
              height: "600px",
              width: "750px",
              position: "relative",
              zIndex: "-1",
            }}
          />
        </div>
      </div>

      <Section
        width={60}
        heading="Explore Collabortive articles"
        body="We're unlocking community knowledge in a new way. Experts add insights
          directly into each article, started with the help of AI."
        tags={[
          "Marketing",
          "Public Administration",
          "Healthcare",
          "Engineering",
          "IT sevices",
          "Sustainability",
          "Business Administration",
          "Telecommunication",
          "HR Management",
        ]}
      />
      <Section
        width={60}
        heading="Find the right job or internship for you"
        body=""
        tags={[
          "Engineering",
          "Business Development",
          "Finance",
          "Administration Assistent",
          "Retail Associate",
          "Customer sevices",
          "Operations",
          "Information Technology ",
          "Marketing",
          "Human Resource",
        ]}
      />
      <div
        className="container-m ps-sm-4 p-3 mb-5 mt-5 mx-0 "
        style={{
          color: "#ed7524",
          maxWidth: "100%",
          background: "rgb(255 216 190)",
        }}
      >
        <section className="d-flex section">
          <div className="section-title-box ms-xl-5" style={{ width: `33%` }}>
            <h2 className="secondary-heading">
              {" "}
              Post your job for millions of people to see
            </h2>
            <p className="section-f"></p>
          </div>
          <div className="d-flex flex-wrap mt-2 fit-content align-self-start align-self-lg-center">
            <button
              className="btn btn-apple fit-content py-3 px-4 text-secondary me-1 mb-2 "
              style={{
                fontSize: "1.1rem",
                fontWeight: "500",
              }}
            >
              Post a job
            </button>
          </div>
        </section>
      </div>
      <Section
        width={60}
        heading="Discover the best software tools"
        body="Connect with buyers who have first-hand experience to find the best products for you."
        tags={[
          "E-Commerce Platforms",
          "CRM Software",
          "Human Resource Management System",
          "Recruiting Software",
          "Sales Intelligence Software",
          "Project Mangement Software",
          "Help Desk Software",
          "Social Networking Software ",
          "Desktop Publishing Software",
        ]}
      />
      <Section
        width={35}
        heading="Keep your mind sharp with games"
        body="Take a break and reconnect with your network through quick daily games."
        tags={["Pinpoint", "Queens", "Cross Climb"]}
      />
      <Footer />
    </>
  );
};

export default LandingPageBody;
