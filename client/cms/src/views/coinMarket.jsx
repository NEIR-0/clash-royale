import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { local, publicSite } from "../routers/constanst";
import Swal from "sweetalert2";
import CardCoin from "../component/coinCard";

function CoinMarket() {
  const [coin, setCoin] = useState();
  useEffect(() => {
    dataCoin();
  }, []);

  const dataCoin = async () => {
    try {
      const { data } = await axios.get(publicSite + "coins", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      //   console.log(data);
      setCoin(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };
  //   console.log(coin);

  const handlepayment = async (id) => {
    try {
      await axios.post(
        publicSite + `orders/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        }
      );
      // console.log(data);

      const { data } = await axios.get(publicSite + "payment/midtrans/token", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data);
      Swal.fire({
        icon: "success",
        title: "succes add your order",
        text: "you are one step closer to becoming a master card",
      });
      window.snap.pay(data.token);
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
        <div className="justify-center flex flex-wrap mt-5">
          {coin &&
            coin.map((el) => {
              return <CardCoin key={el.id} data={el} handle={handlepayment} />;
            })}
        </div>
      </section>
    </>
  );
}

export default CoinMarket;
