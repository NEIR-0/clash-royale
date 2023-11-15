import { OrbitControls } from "@react-three/drei";
import { Crown } from "./crown";

export const Mesh = () => {
  return (
    <>
      <ambientLight intensity={4} />
      <OrbitControls enableZoom={false} />
      <Crown />
    </>
  );
};
