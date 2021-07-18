import React from "react";
import icon from "../../assets/book-open.svg";
import "./styles.css";

const Header = () => {
  return (
    <div className="header">
      <img src={icon} alt="icon" />
      <span className="news-label">News</span>
    </div>
  );
};

export default Header;
