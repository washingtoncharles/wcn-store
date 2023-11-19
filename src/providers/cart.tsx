"use client";
import { ProductWithTotalPrice } from "@/helpers/product";
import { createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartBasePrice: number;
  cartTotalDiscount: number;
  cartTotalPrice: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const addProductToCart = (product: CartProduct) => {

    // CHECK IF PRODUCT IS ALREADY ON CART
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if(productIsAlreadyOnCart) {
      setProducts((prev) => prev.map((cartProduct) => {
        if(cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + product.quantity,
          };
        }
        return cartProduct;
        }),
      );
      return;
    }

    // ADD NEW PRODUCT
    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    {/* IF THE QUANTITY IS GREATER THAN 1, DECREASE THE QUANTITY */}
    setProducts((prev) => 
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })

        //IF THE QUANTITY IS 1, REMOVE THE PRODUCT
        .filter((cartProduct) => cartProduct.quantity > 0),
    )
  }

  {/* SUM 1 TO THE CURRENT QUANTITY OF THE ITEM */}
  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) => 
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            };
          }
          return cartProduct;
        })
    )
  }

  return ( 
    <CartContext.Provider 
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
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