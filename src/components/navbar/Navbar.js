import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { profile } = useContext(AuthContext);
  return (
    <div className="container-md">
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary bg-opacity-75">
        <div className="container-fluid d-flex align-items-center justify-content-around">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link className="navbar-brand mt-2 mt-lg-0" to="/">
              <img
                src={logo}
                alt="groupomania logo"
                loading="lazy"
                className="logo"
              />
            </Link>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="px-10 d-flex justify-content-between">
              <img
                className="d-flex align-items-center"
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
                alt="user"
              />
              <strong className="d-none d-sm-block ms-1 px-1">
                {profile.name}
              </strong>
            </span>
            <span className="d-flex align-items-sm-center px-3  ">
              <i
                className="bi bi-bell-fill  position-relative"
                style={{ fontSize: "1rem" }}
              >
                <span
                  className="badge rounded-circle bg-danger position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "11px" }}
                >
                  2
                </span>
              </i>
            </span>
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
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="#">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLogout}
                    type="button"
                    className="dropdown-item"
                    to="#"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
