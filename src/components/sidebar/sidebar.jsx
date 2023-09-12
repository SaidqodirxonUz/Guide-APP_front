/* eslint-disable react-hooks/exhaustive-deps */
import "./sidebar.scss";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const sidebarNavItems = [
  {
    display: "Profile",
    icon: <i className="bx bx-user"></i>,
    to: "/",
    section: "",
  },
  {
    display: "Guide",
    icon: <i className="bx bx-receipt"></i>,
    to: "/guide",
    section: "guide",
  },
  {
    display: "Users",
    icon: <i className="bx bx-star"></i>,
    to: "/users",
    section: "users",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast("Chiqildi ", { type: "info" });
    navigate("/login");
  }

  const userRole = localStorage.getItem("role");

  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const sidebarItem = sidebarRef.current.querySelector(
      ".sidebar__menu__item"
    );
    if (sidebarItem) {
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }
  }, []);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(key + 1);
  }, [sidebarNavItems]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo d-flex mx-4">
        <img
          src="/logo.jpg"
          alt="Logo"
          style={{ borderRadius: "50%", width: "5rem", marginRight: "1rem" }}
        />
        <h3>Guides</h3>
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) =>
          !userRole && item.to === "/users" ? (
            ""
          ) : (
            <Link to={item.to} key={`${index}_${key}`}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          )
        )}
        <Link
          to={"/login"}
          onClick={handleLogout}
          className="sidebar__menu__item"
          style={{ textDecoration: "none", fontSize: "1.25rem" }}
        >
          <i
            className="bx bxs-door-open"
            style={{
              textDecoration: "none",
              fontSize: "1.75rem",
              marginRight: "0.75rem",
            }}
          ></i>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
