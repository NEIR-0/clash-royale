import { useState } from "react";
import logo from "../../public/logo.png";
function Navbar() {
  return (
    <>
      <section className="fixed w-full h-12 bg-slate-50 px-5 shadow-md flex justify-between items-center z-10">
        <div className="logo">
          <img src={logo} alt="barbarian-kings" className="w-8 lg:w-12" />
        </div>
        <a href="#login">
          <button className="linked w-28 h-12 flex justify-center items-center transition-all duration-200 ease-in-out text-[17px] font-light lg:w-44 lg:h-12 lg:text-[20px] hover:bg-blue-400 hover:text-white">Start now</button>
        </a>
      </section>
    </>
  );
}

export default Navbar;
