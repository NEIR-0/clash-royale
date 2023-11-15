import { useState } from "react";
import { Link } from "react-router-dom";
import coin from "../../public/coin.png";

function CardCoin({ data, option }) {
  return (
    <>
      <section className="w-[300px] m-2 h-fit bg-white shadow-md flex flex-col border border-stone-600 p-5 rounded-md">
        <img src={coin} alt="" />
      </section>
    </>
  );
}

export default CardCoin;
