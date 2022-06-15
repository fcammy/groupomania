import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { useContext } from "react";
import { FILE_URL } from "../../config";
import AuthContext from "../../context/AuthProvider";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { profile } = useContext(AuthContext);

  return (
    <div className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="navbar__left">
          <img src={logo} alt="groupomania logo" loading="lazy" />
        </div>
        <div className="navbar__right">
          <div className="navbar__info">
            <img
              src={FILE_URL + profile.image}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              alt="user"
            />
            <h6 className="mx-2">{profile.name?.split(" ")[0]}</h6>
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
  );
};

export default Navbar;
