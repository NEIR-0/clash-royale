import { useState } from "react";
import Navbar from "../component/navbar";
import home from "../../public/home.png";
import Card from "../component/cardHome";
import Footer from "../component/footer";
import { useEffect } from "react";
import axios from "axios";
import { local, publicSite } from "../routers/constanst";
import Swal from "sweetalert2";

function HomePage() {
  const [card, setCard] = useState();
  useEffect(() => {
    dataCard();
  }, []);

  const dataCard = async (e) => {
    try {
      const { data } = await axios.get(publicSite, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
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

  return (
    <>
      <Navbar />
      <section className="py-10">
        {/* home */}
        <div id="homefirst" className="w-full h-screen flex justify-center items-center relative bgHome">
          <div className="absolute w-full h-full flex justify-center items-center backdrop-blur-[1px]">
            <h1 className="text-[50px] text-center font-bold text-white absolute z-10 md:text-[70px]">Welcome Back Royales!</h1>
            <h1 className="text-[50px] text-center font-bold text-stone-400 absolute ms-2 mt-2 md:text-[70px]">Welcome Back Royales!</h1>
          </div>
        </div>
        {/* des */}
        <div className="w-full h-fit flex flex-col md:flex-row">
          <div className="leftHome h-[400px] m-10 rounded-[40px] md:w-[35%]"></div>
          <div className="right h-full flex flex-col justify-center items-center p-10 md:w-[65%]">
            <h1 className="text-[30px] text-center font-bold -mt-5 mb-5 md:m-10 md:text-[40px]">Land of Clash Royale</h1>
            <p className="text-center md:text-[16px] lg:text-[20px]">
              In a world inhabited by brave warriors, mysterious wizards and magical creatures, Royale Lite becomes the ultimate explorer for everyone who wants to explore the beauty and power behind every Clash Royale card. With a vast
              expanse of land, players can dig into the secrets of every story behind every arena and strategy in every battle.
            </p>
          </div>
        </div>
        {/* collections */}
        <div className="w-full h-fit mt-12">
          <h1 className="text-center font-bold text-[30px] md:text-[60px]">Card Collections</h1>
          <p className="text-center text-[15px] md:text-[20px]">"Card Mastery Begins Here"</p>

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
