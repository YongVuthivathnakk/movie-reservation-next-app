import Image from "next/image";
import { Footer, Header, Main } from "./components/home/home";

export default function Home() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
