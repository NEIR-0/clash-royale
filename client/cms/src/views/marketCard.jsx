import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import logo from "../../public/logo.png";
import { local, publicSite } from "../routers/constanst";
import CardMarket from "../component/cardMarket";
import Swal from "sweetalert2";

function MarketCard() {
  const [card, setCard] = useState();
  const [search, setSearch] = useState("");
  // console.log(directios);
  useEffect(() => {
    dataCard();
  }, [search]);

  const dataCard = async (e) => {
    try {
      const { data } = await axios.get(publicSite + "market", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        params: {
          filter: search,
        },
      });
      // console.log(data);
      setCard(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };
  // console.log(card);

  const searching = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  // console.log(search);

  const addCard = async (id) => {
    // console.log("click", id);
    try {
      await axios.post(
        publicSite + `inventory/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "succes add card to inventory",
        text: "you are one step closer to becoming a master card",
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

  return (
    <>
      <section className="w-full h-fit pt-14">
        <h1 className="text-center text-[30px] font-bold md:text-[60px]">Market Cards</h1>
        <p className="text-center text-[20px] font-light">lets collect as much as you can!</p>
        <div className="search w-full flex justify-center items-center">
          <input onChange={searching} type="text" placeholder="Search the character.." className="shadow-lg rounded-lg px-5 w-[80%] h-[40px] mt-5 md:w-[70%] md:h-[50px]" />
        </div>
        <div className="justify-center flex flex-wrap mt-5">
          {card &&
            card.map((el) => {
              return <CardMarket key={el.id} data={el} option={addCard} />;
            })}
        </div>
      </section>
    </>
  );
}

export default MarketCard;
