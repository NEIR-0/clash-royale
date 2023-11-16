import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../public/logo.png";
import { local } from "../routers/constanst";

function Navbar() {
  return (
    <>
      <section className="fixed w-full h-12 bg-slate-50 px-5 shadow-md flex justify-between z-10">
        <div className="logo flex justify-center items-center">
          <a href="#homefirst">
            <img src={logo} alt="barbarian-kings" className="w-9 lg:w-12" />
          </a>
        </div>

        <div className="w-[200px] flex justify-evenly items-center">
          <Link to="/mainpages">home</Link>
          <Link to="/mainpages/marketCard">market</Link>
          <Link to="/mainpages/marketCoin">coin</Link>
        </div>

        <div className="h-12 w-12 flex justify-center items-center">
          <Link to="user" className="w-7 h-7 rounded-full bg-white flex justify-center items-center lg:w-10 lg:h-10">
            <i className="fa-solid fa-user text-black text-[15px] lg:text-[20px]" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Navbar;
