import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link my-nav-link"
                  activeClassName="active"
                  to="/"
                  exact
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link my-nav-link"
                  activeClassName="active"
                  to="/create"
                >
                  Create competition
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link my-nav-link"
                  activeClassName="active"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
