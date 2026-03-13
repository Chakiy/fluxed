import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="logo">
          home
        </NavLink>

        <nav>
          <NavLink to="/work">work</NavLink>
          <NavLink to="/about">about</NavLink>
          <NavLink to="/contact">contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
