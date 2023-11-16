import { useState } from "react";
import logo from "../../public/logo.png";
import axios from "axios";
import { local } from "../routers/constanst";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const { data } = await axios.post(local + "login", form);

      localStorage.token = data.token;
      // console.log(data);

      navigate("/mainpages");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(form);

  // google
  async function handleCredentialResponse(params) {
    try {
      console.log("masuk <<<<");
      const { data } = await axios.post(local + "googleLogin", {
        data: {
          googletoken: params.credential,
        },
      });
      // console.log(data);
      localStorage.token = data.token;
      navigate("/mainpages");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center">
        <form onSubmit={submitForm} className="w-[400px] h-[500px] bg-stone-50 shadow-lg flex flex-col justify-evenly items-center rounded-lg">
          <div className="">
            <img src={logo} alt="barbarian-kings" className="w-28" />
          </div>
          {/* email */}
          <div className="">
            <label htmlFor="email">Email</label>
            <br />
            <input onChange={inputUser} type="text" name="email" className="outline-none rounded-md border border-stone-500 px-3 py-1 mt-2" />
          </div>
          {/* password */}
          <div className="">
            <label htmlFor="password">Password</label>
            <br />
            <input onChange={inputUser} type="text" name="password" className="outline-none rounded-md border border-stone-500 px-3 py-1 mt-2" />
          </div>
          <button className="px-10 py-3 bg-cyan-300 rounded-lg text-white duration-300 ease-in-out transition-all hover:bg-cyan-400 hover:text-stone-500">submit</button>
          <GoogleLogin
            onSuccess={handleCredentialResponse}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <Link to="/register">Register</Link>
        </form>
      </section>
    </>
  );
}

export default Login;
