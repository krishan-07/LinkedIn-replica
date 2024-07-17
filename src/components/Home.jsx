import Navbar from "./Navbar";
import Feed from "./Feed";
import "./Home.css";

const Home = () => {
  return (
    <div style={{ background: "#f3f2f0" }}>
      <Navbar />
      <Feed />
    </div>
  );
};
export default Home;
