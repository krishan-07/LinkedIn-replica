import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "../components/LandingPage";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import ScrollToTop from "../components/ScollToTop.jsx";
import Home from "../components/Home.jsx";
import Profile, { Loader } from "../components/Profile.jsx";
import Notifications from "../components/Notifications.jsx";
import Feed from "../components/Feed.jsx";
import Network from "../components/Network.jsx";
import store from "../store/index.js";
import Jobs from "../components/Jobs.jsx";
import Messages from "../components/Messages.jsx";
import ChatBox, { ChatBoxLoader } from "../components/ChatBox.jsx";

const routes = [
  {
    path: "/",
    element: (
      <>
        <LandingPage />,
        <ScrollToTop />
      </>
    ),
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
        path: "/in/:userName",
        element: <Profile />,
        loader: Loader(store),
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "mynetwork",
        element: <Network />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "messaging",
        element: <Messages />,
        children: [
          {
            path: ":userName",
            element: <ChatBox />,
            loader: ChatBoxLoader,
          },
        ],
      },
    ],
  },
];

export default routes;
