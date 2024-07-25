import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "../components/LandingPage";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import ScrollToTop from "../components/ScollToTop.jsx";
import Home from "../components/Home.jsx";
import Profile from "../components/Profile.jsx";
import Notifications from "../components/Notifications.jsx";
import Feed from "../components/Feed.jsx";

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
    path: "/in",
    element: (
      <>
        <Home />
        <ScrollToTop />
      </>
    ),
    children: [
      {
        path: "/in",
        element: <Feed />,
      },
      {
        path: "sreekrishanmondal",
        element: <Profile />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  },
];

export default routes;
