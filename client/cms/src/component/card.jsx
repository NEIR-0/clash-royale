import { useState } from "react";
// {
//     "key": "flying-machine",
//     "name": "Flying Machine",
//     "sc_key": "DartBarrell",
//     "elixir": 4,
//     "type": "Troop",
//     "rarity": "Rare",
//     "arena": 5,
//     "description": "The Master Builder has sent his first contraption to the Arena! It's a fast and fun flying machine, but fragile!",
//     "id": 26000057,
//     "evolved_spells_sc_key": "",
//     "is_evolved": false
//   },

import logo from "../../public/logo.png";

function Card() {
  return (
    <>
      <section className="w-[300px] m-2 h-fit bg-red-500 shadow-xl p-5 rounded-md">
        <img src={logo} className="bg-white rounded-md mb-5" />
        <h1 className="text-center text-lg font-bold mb-3">Flying Machine</h1>
        <div className="flex justify-around mb-5">
          <div className="">
            <p>rarity: Rare,</p>
            <p>type: Troop,</p>
          </div>
          <div className="">
            <p>elixir: 4,</p>
            <p>arena: 5,</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="px-10 py-2 bg-slate-400 rounded-lg">buy</button>
        </div>
      </section>
    </>
  );
}

export default Card;
