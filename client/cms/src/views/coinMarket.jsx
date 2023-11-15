import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import logo from "../../public/logo.png";
import { local } from "../routers/constanst";
import Swal from "sweetalert2";
import CardCoin from "../component/coinCard";

function CoinMarket() {
  const [coin, setCoin] = useState();
  useEffect(() => {
    dataCoin();
  }, []);

  const dataCoin = async () => {
    try {
      const { data } = await axios.get(local + "coins", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      //   console.log(data);
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(coin);

  return (
    <>
      <section className="w-full h-fit p-10">
        <h1 className="text-center text-[60px] font-bold">Market Cards</h1>
        <p className="text-center tetx-[20px] font-light">lets collect as much as you can!</p>
        <div className="justify-center flex flex-wrap mt-5">
          {coin &&
            coin.map((el) => {
              return <CardCoin data={el} />;
            })}
        </div>
      </section>
    </>
  );
}

export default CoinMarket;
