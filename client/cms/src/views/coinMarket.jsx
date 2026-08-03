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
        icon: "info",
        title: "Payment Instructions (Sandbox)",
        html: `
          <div style="text-align: left; font-size: 14px; line-height: 1.6;">
            <ol style="margin-left: 20px; list-style-type: decimal;">
              <li style="margin-bottom: 8px;">Select the <b>BCA Virtual Account</b> payment method on the Midtrans payment panel.</li>
              <li style="margin-bottom: 8px;">Copy the <b>Virtual Account Number</b> provided.</li>
              <li style="margin-bottom: 8px;">Open the payment simulator in a new tab:<br/>
                <a href="https://simulator.sandbox.midtrans.com/bca/va/index" target="_blank" rel="noopener noreferrer" style="color: #3085d6; font-weight: bold; text-decoration: underline;">
                  Open Midtrans BCA VA Simulator
                </a>
              </li>
              <li style="margin-bottom: 8px;">Paste the Virtual Account number into the simulator to complete the test transaction.</li>
            </ol>
          </div>
        `,
        confirmButtonText: "Proceed to Payment",
        confirmButtonColor: "#3b82f6",
      }).then((result) => {
        if (result.isConfirmed) {
          window.snap.pay(data.token);
        }
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
