import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      await axios.put(local + "users", form, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data);

      navigate("/mainpages");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(form);
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center">
        <form onSubmit={submitForm} className="w-[400px] h-[300px] bg-stone-50 shadow-lg flex flex-col justify-evenly items-center rounded-lg">
          <h1 className="text-[30px]">what i can call your sir~</h1>
          {/* username */}
          <div className="">
            <label htmlFor="username">Username</label>
            <br />
            <input value={form.username} onChange={inputUser} type="text" name="username" className="outline-none rounded-md border border-stone-500 px-3 py-1 mt-2" />
          </div>
          <button className="px-10 py-3 bg-cyan-300 rounded-lg text-white duration-300 ease-in-out transition-all hover:bg-cyan-400 hover:text-stone-500">submit</button>
        </form>
      </section>
    </>
  );
}

export default ChangeUser;
