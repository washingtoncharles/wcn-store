import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";

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
      <PromoBanner 
        src="/banner-home-01.svg"
        alt="até 55% de Desconto esse mês!"
      />
      
      {/* LIST OF CATEGORIES */}
      <div className="mt-8 px-5">
        <Categories />
      </div>

      {/* PRODUCT LIST */}
      <div className="mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      {/* HOME PAGE SECONDARY BANNER */}
      <PromoBanner 
        src="/banner-home-02.svg"
        alt="até 55% de Desconto em Mouses!"
      />

      {/* KEYBOARDS LIST */}
      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
      
    </div>
  )
}
