import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";

function CardDetail({ data, option }) {
  //   console.log(option);
  return (
    <>
      <section className="w-[300px] m-2 h-fit bg-white shadow-md flex flex-col border border-stone-600 p-5 rounded-md">
        <img src={data && data.imgUrl} className="m-auto w-[200px]  rounded-md mb-5" />
        <h1 className="text-center text-lg font-bold mb-3">{data && data.name}</h1>
        <div className="flex justify-around mb-5">
          <div className="">
            <p>
              rarity: <span>{data && data.rarity}</span>
            </p>
            <p>
              type: <span>{data && data.type}</span>
            </p>
          </div>
          <div className="">
            <p>
              elixir: <span>{data && data.elixir}</span>
            </p>
            <p>
              cardPrice: <span>{data && data.cardPrice}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              option(data.id);
            }}
            className="px-10 py-2 bg-slate-400 rounded-lg"
          >
            detail card
          </button>
        </div>
      </section>
    </>
  );
}

export default CardDetail;
