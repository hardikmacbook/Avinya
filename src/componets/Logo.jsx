import React from "react";
import AvinyaLogo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        <img
          className="w-[120px] sm:w-[100px] lg:w-[150px] h-[40px] sm:h-[50px] lg:h-[70px] object-contain transition-all duration-300"
          src={AvinyaLogo}
          alt="avinya logo"
          width="180"
          height="80"
        />
      </Link>
    </>
  );
};

export default Logo;
