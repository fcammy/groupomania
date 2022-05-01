import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Header = () => (
  <div className="">
    <nav className="main-nav navbar navbar-expand-md mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" height={50} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item navButton">
              <Link className="nav-link text-black" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item navButton">
              <Link className="nav-link text-black" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;
