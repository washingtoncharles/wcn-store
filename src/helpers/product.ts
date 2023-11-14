import { Product } from "@prisma/client"

interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const computeProductTotalPrice = (product: Product): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    };
  }

  //DISCOUNT BIGGER THAN 0
  const totalPrice = Number(product.basePrice) * (product.discountPercentage / 100);
  return {
    ...product,
    totalPrice,
  }

}