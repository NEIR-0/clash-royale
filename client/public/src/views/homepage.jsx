import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "../component/mesh";
function Homepage() {
  return (
    <>
      <section className="w-full h-fit">
        <div className="w-full h-screen bg-yellow-400 bgimg pt-12"></div>
        <div className="w-full h-[400px] bg-[#04192E] relative">
          <div className="w-full h-full absolute flex justify-evenly items-center">
            <h1 className="text-[60px] font-bold text-white" data-aos="fade-right">
              Lets
            </h1>
            <h1 className="text-[60px] font-bold text-white" data-aos="fade-left">
              wins
            </h1>
          </div>
          <Canvas
            camera={{
              fov: 50,
              position: [0, 2, 10],
            }}
          >
            <Mesh />
          </Canvas>
        </div>
        <div className="w-full h-screen bg-yellow-400 bglogin relative">
          <div className="absolute w-full h-full backdrop-blur-[1px] flex justify-center items-center">
            <button className="px-9 py-6 bg-white rounded-lg text-[20px] absolute z-10 duration-200 ease-in-out transition-all font-bold hover:shadow-xl hover:bg-red-500 hover:text-white">Call The Adnventurer</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;
