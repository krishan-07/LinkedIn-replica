import React from "react";
import Navbar from "./Navbar";
import "./Home.css";
import PostInputPopup from "./PostInputPopup";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useState } from "react";

const Home = () => {
  const popup = useSelector((state) => state.popup);
  const currUser = useSelector((state) => state.currUser);

  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  return (
    <div style={{ background: "#f3f2f0", height: "100%" }}>
      {loading && currUser ? (
        <LoadingPage />
      ) : (
        <>
          {popup && <PostInputPopup />}
          <Navbar />
          <Outlet />
        </>
      )}
    </div>
  );
};
export default Home;
