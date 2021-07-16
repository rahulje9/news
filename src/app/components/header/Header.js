import React from "react";
import "./styles.css";
import icon from "../../assets/book-open.svg";

const Header = () => {
  return (
    <div className="header">
      <img src={icon} alt="icon" />
      <span className="news-label">News</span>
    </div>
  );
};

export default Header;
