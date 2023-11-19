import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import {CartContext} from "@/providers/cart";
import CardItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

const Cart = () => {
  const {products, subTotal, totalDiscount, total} = useContext(CartContext);

  return ( 
    <div className="flex flex-col gap-8">
      <Badge 
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase" 
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* RENDER THE PRODUCTS */}
      <div className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <CardItem 
              key={product.id} 
              product={computeProductTotalPrice(product as any) as any} 
            />
          ))
        ) : (
          <p className="text-center font-semibold">
            Seu carrinho esta vazio!
          </p>
        )}
      </div>

      {/* CALCULATE CART TOTALS */}
      <div className="flex flex-col gap-3">
        
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal:</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Entrega:</p>
          <p className="uppercase font-semibold text-green-400">Grátis</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Descontos:</p>
          <p>R$ {totalDiscount.toFixed(2)}</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total Geral:</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>

      </div>
    </div>
   );
}
 
export default Cart;