import { CartContext, CartProduct } from "@/providers/cart";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CardItem = ({product}: CartItemProps) => {
  const {decreaseProductQuantity} = useContext(CartContext);
  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  }

  return ( 
    <div className="flex items-center justify-between">
      {/* RIGTH - IMAGE AND NAME */}
      <div className="flex items-center gap-4">
        <div className="bg-accent flex items-center justify-center rounded-lg h-[77px] w-[77px]">
          <Image 
            src={product.imageUrls[0]} 
            alt={product.name} 
            width={0} height={0} 
            sizes="100vw"
            className="h-auto w-auto max-w-[80%] max-h-[70%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="font-bold text-sm">R$ {product.totalPrice.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <p className="opacity-75 line-through text-xs">R$ {Number(product.basePrice).toFixed(2)}</p>
            )}
          </div>

          {/* QUANTITY ITEM */}
          <div className="flex items-center gap-1 mt-1">
            <Button variant="outline" size="icon" onClick={handleDecreaseProductQuantityClick}>
              <ChevronLeftIcon />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button variant="outline" size="icon">
              <ChevronRightIcon />
            </Button>
          </div>

        </div>
      </div>

      {/* LEFT - BUTTON DELETE */}
      <div>
        <Button size="icon" variant="outline">
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
   );
}
 
export default CardItem;