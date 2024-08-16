import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usersDataAction } from "../store/features/users";
import { currUserActions } from "../store/features/currUser";

const SignupForm = () => {
  const [data, setData] = useState({
    email: "",
    userName: "",
    password: "",
    password2: "",
  });
  const usersData = useSelector((state) => state.usersData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    if (name === "userName") {
      checkUserName(value);
      if (value === "") {
        document.getElementById("userName-success").classList.add("d-none");
        document.getElementById("userName-error").classList.add("d-none");
        document.getElementById("userName-text").classList.remove("d-none");
      }
    } else if (name === "email") {
      checkEmail(value);
      if (value === "") {
        document.getElementById("email-success").classList.add("d-none");
      }
    }
  };
  const checkUserName = (value) => {
    const uniqueUserName = usersData.every((user) => user.userName !== value);
    if (uniqueUserName) {
      document.getElementById("userName-error").classList.add("d-none");
      document.getElementById("userName-success").classList.remove("d-none");
      document.getElementById("userName-text").classList.add("d-none");
    }
    if (!uniqueUserName) {
      document.getElementById("userName-success").classList.add("d-none");
      document.getElementById("userName-error").classList.remove("d-none");
    }
  };
  const checkEmail = (value) => {
    const uniqueEmail = usersData.every((user) => user.email !== value);
    if (uniqueEmail) {
      document.getElementById("email-error").classList.add("d-none");
      document.getElementById("email-success").classList.remove("d-none");
    }
    if (!uniqueEmail) {
      document.getElementById("email-success").classList.add("d-none");
      document.getElementById("email-error").classList.remove("d-none");
    }
  };
  const handleRedirect = (email) => {
    dispatch(currUserActions.addUser(email));
    setTimeout(() => {
      navigate("/in");
    }, 1000);
  };
  const authorizeUser = () => {
    const passwordMatch = data.password === data.password2;

    !passwordMatch
      ? document.getElementById("password2-error").classList.remove("d-none")
      : document.getElementById("password2-error").classList.add("d-none");

    if (passwordMatch && data.email !== "" && data.userName !== "") {
      dispatch(
        usersDataAction.addUserData({
          email: data.email,
          userName: data.userName.toLocaleLowerCase().split(" ").join(""),
          password: data.password,
          name: data.userName,
        })
      );
      handleRedirect(data.email);
    }
  };
  return (
    <form className="card p-4 mt-4">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          autoComplete="mail"
          required
          onChange={handleOnChange}
          value={data.email}
        />
        <div id="email-error" className="fs-s text-danger ms-2 d-none ">
          Email already in use
        </div>
        <div id="email-success" className="fs-s text-success ms-2 d-none ">
          Email available
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="userName" className="form-label">
          User name
        </label>
        <input
          type="userName"
          name="userName"
          className="form-control"
          id="userName"
          autoComplete="nonev"
          onChange={handleOnChange}
          value={data.userName}
          required
        />
        <div id="userName-error" className="fs-s text-danger ms-2 d-none">
          User name is already taken
        </div>
        <div id="userName-success" className="fs-s text-success ms-2 d-none">
          User name available
        </div>
        <div id="userName-text" className="fs-s form-text lh-1">
          Use small case, should not contain special characters and spaces
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password ( 6+ characters)
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          autoComplete="new-password"
          required
          onChange={handleOnChange}
          value={data.password}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password2" className="form-label">
          Enter password again
        </label>
        <input
          type="password"
          name="password2"
          autoComplete="new-password"
          className="form-control"
          id="password2"
          required
          onChange={handleOnChange}
          value={data.password2}
        />
        <div id="password2-error" className="fs-s text-danger lh-1 ms-2 d-none">
          Password didn't match
        </div>
      </div>
      <div className="form-text mb-3 text-center">
        By clicking Agree & Join or Continue, you agree to the IAC
        <center>
          <span>
            <Link className="link-offset-2 link-underline link-underline-opacity-0 me-1">
              User Agreement,
            </Link>
          </span>
          <span>
            <Link className="link-offset-2 link-underline link-underline-opacity-0">
              Privacy Policy
            </Link>
          </span>
          , and
          <span>
            <Link className="link-offset-2 link-underline link-underline-opacity-0 ms-1">
              Cookie Policy
            </Link>
          </span>
        </center>
      </div>
      <button type="button" className="btn btn-primary" onClick={authorizeUser}>
        Agree & Join
      </button>
      <span className="text-center my-3"> or </span>
      <button type="button" className="btn btn-google">
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
