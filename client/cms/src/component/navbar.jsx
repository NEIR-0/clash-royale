import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/logo.png";
import { local } from "../routers/constanst";

function Navbar() {
  const { pathname } = useLocation();
  console.log(pathname, ">>>>>>>>>>>>>");
  return (
    <>
      <section className="fixed w-full h-12 bg-slate-50 px-5 shadow-md flex justify-between z-10">
        <div className="logo flex justify-center items-center">
          <a href="#homefirst">
            <img src={logo} alt="barbarian-kings" className="w-9 lg:w-12" />
          </a>
        </div>

        <div className="w-[200px] flex justify-evenly items-center">
          <Link
            to="/mainpages"
            // className="duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
            className={
              pathname === "/mainpages" ? "bg-cyan-400 text-white duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white" : "duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
            }
          >
            home
          </Link>
          <Link
            to="/mainpages/marketCard"
            // className="duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
            className={
              pathname === "/mainpages/marketCard"
                ? "bg-cyan-400 text-white duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
                : "duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
            }
          >
            market
          </Link>
          <Link
            to="/mainpages/marketCoin"
            // className="duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
            className={
              pathname === "/mainpages/marketCoin"
                ? "bg-cyan-400 text-white duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
                : "duration-200 ease-in-out transition-all px-4 p-3 hover:bg-cyan-400 hover:text-white"
            }
          >
            coin
          </Link>
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
