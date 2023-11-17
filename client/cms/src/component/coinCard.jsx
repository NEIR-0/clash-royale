import { useState } from "react";
import { Link } from "react-router-dom";
import coin from "../../public/coin.png";

function CardCoin({ data, handle }) {
  return (
    <>
      <section className="w-[300px] m-2 h-fit bg-white shadow-md flex flex-col border border-stone-600 p-5 rounded-md duration-300 ease-in-out transition-all group hover:scale-105">
        <div className="">
          <img src={coin} alt="coin-icon" />
          <h1 className="text-center text-[#4B3043] text-[30px] font-bold">{data.amount}</h1>
          <h1 className="text-center mb-5">Rp. {data.price}</h1>
          <div className="w-full h-fit flex justify-center items-center">
            <button
              onClick={() => {
                handle(data.id);
              }}
              className="px-10 py-3 bg-stone-500 rounded-lg text-black duration-200 ease-in-out transition-all hover:bg-stone-600 hover:text-white"
            >
              Buy Coin
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardCoin;
