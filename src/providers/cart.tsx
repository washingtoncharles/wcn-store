"use client";
import { Product } from "@prisma/client";
import { createContext } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartBasePrice: number;
  cartTotalDiscount: number;
  cartTotalPrice: number;
}

const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
})

const CartProvider = ({children}: {children: React.ReactNode}) => {
  return ( 
    <CartContext.Provider 
      value={{
        products: [],
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        cartTotalPrice: 0,
      }}
    >
      {children}
    </CartContext.Provider>
   );
}
 
export default CartProvider;