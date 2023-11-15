import { useState } from "react";
import Navbar from "../component/navbar";
import home from "../../public/home.png";
import Card from "../component/cardHome";
import Footer from "../component/footer";
import { useEffect } from "react";
import axios from "axios";
import { local } from "../routers/constanst";

function HomePage() {
  const [card, setCard] = useState();
  useEffect(() => {
    dataCard();
  }, []);

  const dataCard = async (e) => {
    try {
      const { data } = await axios.get(local, {
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

  return (
    <>
      <Navbar />
      <section className="py-10">
        {/* home */}
        <div className="w-full h-screen flex justify-center items-center relative bgHome">
          <div className="absolute w-full h-full flex justify-center items-center backdrop-blur-[1px]">
            <h1 className="text-[70px] font-bold text-white absolute z-10">Welcome Back Royales!</h1>
            <h1 className="text-[70px] font-bold text-stone-400 absolute ms-2 mt-2">Welcome Back Royales!</h1>
          </div>
        </div>
        {/* des */}
        <div className="w-full h-fit flex">
          <div className="leftHome w-[35%] h-[400px] m-10 rounded-[40px]"></div>
          <div className="right w-[65%] h-full flex flex-col justify-center items-center p-10">
            <h1 className="text-[40px] font-bold m-10">Land of Clash Royale</h1>
            <p className="text-center text-[20px]">
              Dalam dunia yang dihuni oleh prajurit pemberani, penyihir misterius, dan makhluk ajaib, Royale Lite menjadi penjelajah utama bagi semua orang yang ingin mengeksplorasi keindahan dan kekuatan di balik setiap kartu Clash Royale.
              Dengan hamparan daratan yang luas, pemain dapat menggali rahasia dari setiap kisah di balik setiap arena dan strategi di setiap pertempuran.
            </p>
          </div>
        </div>
        {/* collections */}
        <div className="w-full h-fit mt-12">
          <h1 className="text-center font-bold text-[60px]">Card Collections</h1>
          <p className="text-center text-[20px]">"Card Mastery Begins Here"</p>

          <div className="justify-center flex flex-wrap mt-5">
            {card &&
              card.map((el) => {
                return <Card data={el} option="marketCard" />;
              })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
