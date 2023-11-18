import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";
import ProductList from "../../components/ui/product-list";

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

  //VALIDATION FOR MOUSES
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses"
      }
    },
    take: 10
  })

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* HOME PAGE MAIN BANNER */}
      <PromoBanner 
        src="/banner-home-01.svg"
        alt="até 55% de Desconto esse mês!"
      />
      
      {/* LIST OF CATEGORIES */}
      <div className="px-5">
        <Categories />
      </div>

      {/* PRODUCT LIST */}
      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      {/* HOME PAGE SECONDARY BANNER */}
      <PromoBanner 
        src="/banner-home-02.svg"
        alt="até 55% de Desconto em Mouses!"
      />

      {/* KEYBOARDS LIST */}
      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      {/* HOME PAGE TERCIARY BANNER */}
      <PromoBanner 
        src="/banner-home-03.svg"
        alt="até 20% de Desconto em Fones!"
      />

      {/* MOUSES LIST */}
      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
      
    </div>
  )
}
