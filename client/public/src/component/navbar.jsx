import { useState } from "react";
import logo from "../../public/logo.png";
function Navbar() {
  return (
    <>
      <section className="fixed w-full h-12 bg-slate-50 px-5 shadow-md flex justify-between z-10">
        <div className="logo">
          <img src={logo} alt="barbarian-kings" className="w-12 h-12" />
        </div>
        <a href="">
          <button className="linked w-44 h-12 flex justify-center items-center transition-all duration-200 ease-in-out text-[20px] font-light hover:bg-blue-400 hover:text-white">Start now</button>
        </a>
      </section>
    </>
  );
}

export default Navbar;
