import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {
  //VALIDATION FOR DISCOUNT PERCENTAGE GREATER THAN 0
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      },
    },
    take: 10
  });

  //VALIDATION FOR KEYBOARDS
  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards"
      }
    },
    take: 10
  })

  return (
    <div className="">
      {/* HOME PAGE MAIN BANNER */}
      <Image 
        className="w-full h-auto px-5"
        sizes="100vw"
        src="/banner-home-01.svg"
        height={0}
        width={0}
        alt="até 55% de Desconto esse mês!"
      />
      
      {/* LIST OF CATEGORIES */}
      <div className="mt-8 px-5">
        <Categories />
      </div>

      {/* PRODUCT LIST */}
      <div className="mt-8">
        <p className="mb-3 pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>

      {/* HOME PAGE SECONDARY BANNER */}
      <Image 
        className="w-full h-auto px-5"
        sizes="100vw"
        src="/banner-home-02.svg"
        height={0}
        width={0}
        alt="até 55% de Desconto em Mouses!"
      />

      {/* KEYBOARDS LIST */}
      <div className="mt-8">
        <p className="mb-3 pl-5 font-bold uppercase">Teclados</p>
        <ProductList products={keyboards} />
      </div>
      
    </div>
  )
}
