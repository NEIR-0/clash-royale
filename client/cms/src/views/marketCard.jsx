import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import logo from "../../public/logo.png";
import { local } from "../routers/constanst";
import CardMarket from "../component/cardMarket";
import Swal from "sweetalert2";

function MarketCard() {
  const [card, setCard] = useState();
  useEffect(() => {
    dataCard();
  }, []);

  const dataCard = async (e) => {
    try {
      const { data } = await axios.get(local + "market", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data);
      setCard(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(card);

  const addCard = async (id) => {
    // console.log("click", id);
    try {
      await axios.post(
        local + `inventory/${id}`,
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
        text: "you are one step closer to becoming a master card ",
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
      <section className="w-full h-fit p-10">
        <h1 className="text-center text-[60px] font-bold">Market Cards</h1>
        <p className="text-center tetx-[20px] font-light">lets collect as much as you can!</p>
        <div className="justify-center flex flex-wrap mt-5">
          {card &&
            card.map((el) => {
              return <CardMarket data={el} option={addCard} />;
            })}
        </div>
      </section>
    </>
  );
}

export default MarketCard;
