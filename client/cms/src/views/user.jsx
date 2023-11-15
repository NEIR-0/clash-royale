import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { local } from "../routers/constanst";
import logo from "../../public/logo.png";
import Card from "../component/cardHome";

function User() {
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
  console.log(inventory);

  return (
    <>
      <section className="w-full pt-12">
        <div className="w-full h-fit bg-yellow-400 flex mb-12">
          <img src={logo} className="w-20" />
          <div className="">
            <h1>username: {user && user.username}</h1>
            <h1>Email: {user && user.email}</h1>
            <h1>wallet: {user && user.wallet}</h1>
          </div>
        </div>
        {/* inventory */}
        <h1 className="text-center text-[40px]">Yours Card Collections</h1>
        <div className="w-full flex flex-wrap justify-between items-center p-5">
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
