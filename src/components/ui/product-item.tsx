import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}
const ProductItem = ({product}: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4">  
      {/*IMAGE*/}
      <div className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center">
        <Image 
          src={product.imageUrls[0]} 
          height={0} width={0} 
          sizes="100vw" 
          alt={product.name} 
          className="h-auto w-auto max-w-[80%] max-h-[70%]"
          style={
            {
              objectFit: "contain",
            }
          }
        />

        {/* LABEL WITH DISCOUNT PERCENTAGE */}
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 px-2 py-[2px]">
            <ArrowDownIcon size={15} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>


      {/* TEXT */}
      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>

        {/* CONDITIONAL FOR PRESENTING DISCOUNTED VALUE */}
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold ">
                R$ {product.totalPrice.toFixed(2)}
              </p>
              <p className="opacity-75 line-through text-[0.6875rem]">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">
              R$ {product.basePrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
 
export default ProductItem;