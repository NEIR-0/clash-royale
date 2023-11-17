import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "../component/mesh";
function Homepage() {
  return (
    <>
      <section className="w-full h-fit pt-12">
        <div className="w-full h-[300px] bg-yellow-400 bgimg pt-12 lg:h-screen"></div>
        <div className="w-full h-[400px] bg-[#04192E] relative">
          <div className="w-full h-full absolute flex justify-evenly items-center">
            <h1
              className="text-[60px] -mt-[270px] font-bold text-white lg:mt-0"
              // data-aos="fade-right"
            >
              Lets
            </h1>
            <h1
              className="text-[60px] -mb-[270px] font-bold text-white lg:mb-0"
              // data-aos="fade-left"
            >
              wins
            </h1>
          </div>
          <Canvas
            camera={{
              fov: 50,
              position: [10, 2, 10],
            }}
          >
            <Mesh />
          </Canvas>
        </div>
        <div className="w-full h-screen bg-yellow-400 bglogin relative">
          <div className="absolute w-full h-full backdrop-blur-[1px] flex justify-center items-center">
            <a href="https://cms-royale.web.app/login" className="absolute ">
              <button id="login" className="px-9 py-6 bg-white rounded-lg text-[20px] z-10 duration-200 ease-in-out transition-all font-bold hover:shadow-xl hover:bg-red-500 hover:text-white">
                Call The Adnventurer
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;
