import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../public/logo.png";
import { local } from "../routers/constanst";

function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    dataUser();
  }, []);

  const dataUser = async () => {
    try {
      const { data } = await axios.get(local + "users", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="fixed w-full h-12 bg-slate-50 px-5 shadow-md flex justify-between z-10">
        <div className="logo">
          <img src={logo} alt="barbarian-kings" className="w-12 h-12" />
        </div>
        <div className="h-12 w-12 bg-yellow-400 flex justify-center items-center">
          <Link to="user" className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
            <i className="fa-solid fa-user text-black text-[20px]" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Navbar;
