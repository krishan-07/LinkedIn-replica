import Navbar from "./Navbar";
import Feed from "./Feed";
import "./Home.css";
import PostInputPopup from "./PostInputPopup";
import { useSelector } from "react-redux";

const Home = () => {
  const popup = useSelector((state) => state.popup);
  return (
    <div style={{ background: "#f3f2f0" }}>
      {popup && <PostInputPopup />}
      <Navbar />
      <Feed />
    </div>
  );
};
export default Home;
