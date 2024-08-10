import "./LandingPage.css";
import LandingPageNavBar from "./LandingPageNavBar";
import LandingPageBody from "./LandingPageBody";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const currUser = useSelector((state) => state.currUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (currUser) navigate("/in");
  }, [currUser]);

  return (
    <>
      {!currUser && (
        <>
          <LandingPageNavBar />
          <LandingPageBody />
        </>
      )}
    </>
  );
};
export default LandingPage;
