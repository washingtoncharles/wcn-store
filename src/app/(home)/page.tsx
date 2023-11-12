"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Categories from "./components/categories";

export default function Home() {
  const {data} = useSession();

  return (
    <div className="p-5">
      {data?.user?.name}
      <Image 
        className="w-full h-auto"
        sizes="100vw"
        src="/banner-home-01.svg"
        height={0}
        width={0}
        alt="até 55% de Desconto esse mês!"
      />

      <div className="mt-8">
        <Categories />
      </div>
      
    </div>
  )
}
