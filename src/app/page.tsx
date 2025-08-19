import Image from "next/image";
import { HomeHeader } from "./components/home/header";
import { HomeMain } from "./components/home/main";
import { HomeFooter } from "./components/home/footer";


export default function Home() {
  return (
    <div>
      <HomeHeader />
      <HomeMain />
      <HomeFooter />
    </div>
  );
}
