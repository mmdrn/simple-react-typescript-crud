import { FC } from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.webp";
import "./style.scss";

const Header: FC = () => {
  return (
    <div className="main-header">
      <div className="container">
        <Link className="logo" to="/">
          <img src={logo} alt="we are eco" />
        </Link>
        <div className="menu">
          <Link className="item" to="/">
            خانه
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
