import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import ProfilePage from "../profile/profile";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Sidebar />
      <ProfilePage />
      <Footer />
    </>
  );
};

export default Main;
