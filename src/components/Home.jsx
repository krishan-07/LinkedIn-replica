import Navbar from "./Navbar";
import "./Home.css";
import PostInputPopup from "./PostInputPopup";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Home = () => {
  const popup = useSelector((state) => state.popup);
  return (
    <div style={{ background: "#f3f2f0", height: "100%" }}>
      {popup && <PostInputPopup />}
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Home;
