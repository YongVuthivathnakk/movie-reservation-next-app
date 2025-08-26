"use client";

import { HomeHeader } from "./components/home/header";
import { HomeMain } from "./components/home/main";
import { HomeFooter } from "./components/home/footer";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";


export default function Home() {

  const router = useRouter();
  
  const session = useQuery(api.auth.isAuthenticated);
  
  useEffect(() => {
    if(session) {
      router.replace("/");
    }
  }, [session, router]);


  return (
    <div>
      <HomeHeader />
      <HomeMain />
      <HomeFooter />
    </div>
  );
}
