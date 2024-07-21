import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "../components/LandingPage";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import ScrollToTop from "../components/ScollToTop.jsx";
import Home from "../components/Home.jsx";
import Profile from "../components/Profile.jsx";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "/feed",
    element: (
      <>
        <Home />
        <ScrollToTop />
      </>
    ),
  },
  {
    path: "sreekrishanmondal",
    element: (
      <>
        <Profile />
        <ScrollToTop />
      </>
    ),
  },
];

export default routes;
