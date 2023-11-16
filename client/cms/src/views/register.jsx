import { useContext, useState } from "react";
import logo from "../../public/logo.png";
import axios from "axios";
import { local } from "../routers/constanst";
import { useNavigate, Link } from "react-router-dom";

// context
import { useTheme } from "../context/darkLightMode";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const inputUser = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("masuk <<<<<");
      const { data } = await axios.post(local + "register", form);
      console.log(data);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // context
  const { theme, handleThame } = useContext(useTheme);
  // {theme === "light" ? "" : ""}

  return (
    <>
      <section
        className={
          theme === "light" ? "w-full h-screen flex justify-center items-center relative duration-300 ease-in-out transition-all" : "w-full h-screen flex justify-center items-center relative bg-black duration-300 ease-in-out transition-all"
        }
      >
        {/* context */}
        <div className="absolute top-5 right-5">
          <button
            onClick={handleThame}
            className={
              theme === "light"
                ? "bg-cyan-300 text-white rounded-full duration-300 ease-in-out transition-all px-4 py-2 md:px-10 md:py-2"
                : "bg-blue-500 text-black rounded-full duration-300 ease-in-out transition-all px-4 py-2 md:px-10 md:py-2"
            }
          >
            {theme === "light" ? <i class="fa-solid fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
          </button>
        </div>
        <form
          onSubmit={submitForm}
          // className="w-[400px] h-[500px] bg-stone-50 shadow-lg flex flex-col justify-evenly items-center rounded-lg"
          className={
            theme === "light"
              ? "bg-stone-50 shadow-lg flex flex-col justify-evenly items-center rounded-lg duration-300 ease-in-out transition-all w-[300px] h-[450px] md:w-[400px] md:h-[500px]"
              : "bg-slate-400 shadow-lg flex flex-col justify-evenly items-center rounded-lg duration-300 ease-in-out transition-all w-[300px] h-[450px] md:w-[400px] md:h-[500px]"
          }
        >
          <div className="">
            <img src={logo} alt="barbarian-kings" className="w-20 md:w-28" />
          </div>

          {/* username */}
          <div className="">
            <label htmlFor="username" className={theme === "light" ? "duration-300 ease-in-out transition-all text-black" : "duration-300 ease-in-out transition-all text-white"}>
              Username
            </label>
            <br />
            <input onChange={inputUser} type="text" name="username" className="outline-none rounded-md border border-stone-500 md:px-3 md:py-1 md:mt-2" />
          </div>

          {/* email */}
          <div className="">
            <label htmlFor="email" className={theme === "light" ? "duration-300 ease-in-out transition-all text-black" : "duration-300 ease-in-out transition-all text-white"}>
              Email
            </label>
            <br />
            <input onChange={inputUser} type="text" name="email" className="outline-none rounded-md border border-stone-500 md:px-3 md:py-1 md:mt-2" />
          </div>

          {/* password */}
          <div className="">
            <label htmlFor="password" className={theme === "light" ? "duration-300 ease-in-out transition-all text-black" : "duration-300 ease-in-out transition-all text-white"}>
              Password
            </label>
            <br />
            <input onChange={inputUser} type="text" name="password" className="outline-none rounded-md border border-stone-500 md:px-3 md:py-1 md:mt-2" />
          </div>
          <button
            className={
              theme === "light"
                ? "bg-cyan-300 rounded-lg text-white duration-300 ease-in-out transition-all hover:bg-cyan-400 hover:text-stone-500 px-6 py-2 md:px-10 md:py-3"
                : "bg-blue-500 rounded-lg text-black duration-300 ease-in-out transition-all hover:bg-blue-400 hover:text-white px-6 py-2 md:px-10 md:py-3"
            }
          >
            submit
          </button>
          <Link to="/login" className={theme === "light" ? "duration-300 ease-in-out transition-all text-black" : "duration-300 ease-in-out transition-all text-white"}>
            Login
          </Link>
        </form>
      </section>
    </>
  );
}

export default Register;
