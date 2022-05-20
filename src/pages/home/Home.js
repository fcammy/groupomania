import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Member from "../../components/members/Member";

const Home = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  return (
    <div className="home">
      <Navbar />
      <div className="home_body">
        <Sidebar />
        <Feed />
        <Member />
      </div>
    </div>
  );
};

export default Home;
