import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import {CartContext} from "@/providers/cart";
import CardItem from "./cart-item";
import { ScrollArea } from "./scroll-area";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { Button } from "./button";

const Cart = () => {
  const {products, subTotal, totalDiscount, total} = useContext(CartContext);

  return ( 
    <div className="flex h-full flex-col gap-8">
      <Badge 
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase" 
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* RENDER THE PRODUCTS */}
      <div className="flex flex-col gap-5 h-full max-h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-5">
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
        </ScrollArea>
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

        {/* CHECKOUT */}
        <Button className="w-full mt-5 font-semibold uppercase">
          Finalizar Compra
        </Button>

      </div>
    </div>
   );
}
 
export default Cart;