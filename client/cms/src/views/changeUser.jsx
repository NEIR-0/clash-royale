import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../public/logo.png";
import { local } from "../routers/constanst";
function ChangeUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    dataUser();
  }, []);

  const dataUser = async () => {
    try {
      //   console.log("masuk <<");
      const { data } = await axios.get(local + "users", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      console.log(data.username);
      setForm(() => {
        return {
          username: data.username,
          email: data.email,
          password: data.password,
        };
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

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
      const { data } = await axios.put(local + "users", form, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data);
      Swal.fire({
        icon: "success",
        title: "update user detail",
        text: data.message,
      });

      navigate("/mainpages/user");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };
  console.log(form);
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center">
        <form onSubmit={submitForm} className="w-[300px] h-fit bg-stone-50 shadow-lg flex flex-col justify-evenly items-center rounded-lg p-10 md:w-[400px] md:h-[300px]">
          <h1 className="text-[20px] mb-7 text-center md:text-[30px]">what i can call your sir~</h1>
          {/* username */}
          <div className="mb-7">
            <label htmlFor="username" className="text-[15px] md:text-base">
              Username
            </label>
            <br />
            <input value={form.username} onChange={inputUser} type="text" name="username" className="outline-none rounded-md border border-stone-500 px-3 py-1 mt-2" />
          </div>
          <button className="px-8 py-2 bg-cyan-300 rounded-lg text-white duration-300 ease-in-out transition-all hover:bg-cyan-400 hover:text-stone-500 md:px-10 md:py-3">submit</button>
        </form>
      </section>
    </>
  );
}

export default ChangeUser;
