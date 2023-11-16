import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { local, publicSite } from "../routers/constanst";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import coin from "../../public/coin.png";
import Card from "../component/cardHome";
import CardDetail from "../component/cardDetail";

function User() {
  const naviagate = useNavigate();
  const [user, setUser] = useState();
  const [inventory, setInventory] = useState();
  const [detail, setDetail] = useState(false);
  const [detailCard, setDetailCard] = useState("");

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

  const showDetail = async (id) => {
    // console.log("click", id);
    setDetail((last) => (last === false ? true : false));
    try {
      const { data } = await axios.get(`http://localhost:3000/card/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      setDetailCard(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(detailCard);
  return (
    <>
      <section className="w-full pt-12">
        <div className="w-full h-fit shadow-lg bg-slate-200 flex py-5 px-5 md:mb-12 relative">
          <div className="flex justify-center items-center me-6">
            <div className="w-14 h-14 rounded-full bg-white flex justify-center items-center md:w-20 md:h-20">
              <i className="fa-solid fa-user text-black text-[20px] md:text-[30px]" />
            </div>
          </div>
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
          <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2">
            <button onClick={changeUser} className="px-10 py-2 bg-white rounded-md me-5">
              Change
            </button>
            <button onClick={logOut} className="px-10 py-2 bg-white rounded-md">
              Log out
            </button>
          </div>
        </div>
        <div className="md:hidden flex justify-center items-center py-6">
          <button onClick={changeUser} className="px-10 py-2 bg-cyan-300 text-white rounded-md me-5">
            Change
          </button>
          <button onClick={logOut} className="px-10 py-2 bg-cyan-300 text-white rounded-md">
            Log out
          </button>
        </div>
        {/* admin */}

        {user && user.role === "admin" ? (
          <div className="md:hidden w-full flex justify-center mb-10">
            <button onClick={changeAdmin} className="px-10 py-2 bg-red-400 text-white rounded-md">
              admin site
            </button>
          </div>
        ) : (
          ""
        )}

        {user && user.role === "admin" ? (
          <button onClick={changeAdmin} className="hidden md:block px-10 py-3 bg-cyan-300 text-white rounded-md ms-10 mb-10">
            admin site
          </button>
        ) : (
          ""
        )}

        {/* inventory */}
        <h1 className="text-center text-[30px] md:text-[40px]">Yours Card Collections</h1>
        <div className="w-full flex flex-wrap justify-center items-center p-5">
          {inventory &&
            inventory.map((el) => {
              return <CardDetail data={el} option={showDetail} />;
            })}
        </div>
        {detail === true ? (
          <div className="w-full h-screen fixed left-0 top-0 pt-14 flex justify-center items-center backdrop-blur-sm ">
            <div className="w-[350px] h-fit p-5 bg-stone-300 rounded-lg relative md:w-[400px]">
              <button onClick={showDetail} className="absolute right-5 top-3 w-7 h-7 bg-white rounded-full flex justify-center">
                <h1>x</h1>
              </button>
              <img src={detailCard && detailCard.imgUrl} className="m-auto w-[200px] rounded-md mb-5" />
              <h1 className="text-center text-lg font-bold mb-3 underline">{detailCard && detailCard.name}</h1>
              <h1 className="text-center text-base mb-10 ">{detailCard && detailCard.description}</h1>

              <div className="flex justify-around mb-5">
                <div className="">
                  <p>
                    rarity: <span className="font-bold">{detailCard && detailCard.rarity}</span>
                  </p>
                  <p>
                    type: <span className="font-bold">{detailCard && detailCard.type}</span>
                  </p>
                </div>
                <div className="">
                  <p>
                    elixir: <span className="font-bold">{detailCard && detailCard.elixir}</span>
                  </p>
                  <p>
                    cardPrice: <span className="font-bold">{detailCard && detailCard.cardPrice}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default User;
