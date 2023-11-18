import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import {CartContext} from "@/providers/cart";
import CardItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";

const Cart = () => {
  const {products} = useContext(CartContext);

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
        {products.map((product) => (
          <CardItem 
            key={product.id} 
            product={computeProductTotalPrice(product as any) as any} 
          />
        ))}
      </div>
    </div>
   );
}
 
export default Cart;