import { prismaClient } from "@/lib/prisma";

interface ProductDetailsPageProps {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async ({ params: { slug } }: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    }
  })
  {/* RETURN NULL SO THERE IS NO PRODUCT */}
  if (!product) {
    return null;
  }

  return ( 
    <h1>{product.name}</h1>
   );
}
 
export default ProductDetailsPage;