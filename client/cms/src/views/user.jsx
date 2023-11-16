import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { local, publicSite } from "../routers/constanst";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import coin from "../../public/coin.png";
import Card from "../component/cardHome";

function User() {
  const naviagate = useNavigate();
  const [user, setUser] = useState();
  const [inventory, setInventory] = useState();

  useEffect(() => {
    dataUser();
    listInventory();
  }, []);

  const dataUser = async () => {
    try {
      const { data } = await axios.get(local + "users", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listInventory = async () => {
    try {
      const { data } = await axios.get(local + "inventory", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data.Cards);
      setInventory(data.Cards);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(inventory);

  const logOut = () => {
    localStorage.clear();
    naviagate("/login");
  };
  const changeUser = () => {
    naviagate("/mainpages/changeUser");
  };
  // console.log(user);

  const changeAdmin = () => {
    naviagate("/mainpages/admin");
  };

  return (
    <>
      <section className="w-full pt-12">
        <div className="w-full h-fit bg-yellow-400 flex mb-12 relative">
          <img src={logo} className="w-20" />
          <div className="">
            <h1>username: {user && user.username}</h1>
            <h1>Email: {user && user.email}</h1>
            <h1 className="flex  items-center">
              wallet: {user && user.wallet}{" "}
              <span>
                <img className="w-5" src={coin} alt="" />
              </span>
            </h1>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <button onClick={changeUser} className="px-10 py-2 bg-white rounded-md me-5">
              Change
            </button>
            <button onClick={logOut} className="px-10 py-2 bg-white rounded-md">
              Log out
            </button>
          </div>
        </div>
        {/* admin */}

        {user && user.role === "admin" ? (
          <button onClick={changeAdmin} className="px-10 py-3 bg-red-500 rounded-md ms-10 mb-10">
            admin site
          </button>
        ) : (
          ""
        )}

        {/* inventory */}
        <h1 className="text-center text-[40px]">Yours Card Collections</h1>
        <div className="w-full flex flex-wrap justify-center items-center p-5">
          {inventory &&
            inventory.map((el) => {
              return <Card data={el} option={false} />;
            })}
        </div>
      </section>
    </>
  );
}

export default User;
