import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { useContext } from "react";
import { FILE_URL } from "../../config";
import AuthContext from "../../context/AuthProvider";
import { API_URL } from "../../config";

const Navbar = () => {
  let navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { profile } = useContext(AuthContext);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    let data = await fetch(`${API_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    setNotifications(data);
  };

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <>
      <div className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar__left">
            <img src={logo} alt="groupomania logo" loading="lazy" />
          </div>
          <div className="navbar__right">
            <div className="navbar__info">
              {!profile.image ? (
                <i className="bi bi-person-circle size"></i>
              ) : (
                <img
                  src={FILE_URL + profile.image}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                  alt="user"
                />
              )}
              <h6 className="mx-2">{profile.name?.split(" ")[0]}</h6>
              <button
                className="btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <i
                  className="bi bi-bell-fill  position-relative"
                  style={{ fontSize: "1rem" }}
                >
                  {unreadNotifications.length > 0 && (
                    <span
                      className="badge rounded-circle bg-danger position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: "11px" }}
                    >
                      {unreadNotifications.length}
                    </span>
                  )}
                </i>
              </button>
            </div>
            <div className="dropdown">
              <a
                href="/"
                className="dropdown align-items-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="bi bi-chevron-compact-down px-1"
                  style={{ fontSize: "1.2rem", color: "#000" }}
                ></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Settings
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Notifications</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            {notifications.map((n) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {n.post.user.name} has published a new post{" "}
                <span class="badge bg-primary rounded-pill">
                  {n.read ? "Read" : "Unread"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
