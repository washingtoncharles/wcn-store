"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice
  // product: Pick<
  //   ProductWithTotalPrice, 
  //   'basePrice' 
  //   | 'description'
  //   | 'discountPercentage'
  //   | 'totalPrice'
  //   | 'name'
  // >
}

const ProductInfo = ({product}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const {addProductToCart} = useContext(CartContext);

  {/* DECREASE QUANTITY */}
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  }

  {/* INCREASE QUANTITY */}
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  }

  {/* ADD PRODUCT TO CART */}
  const handleAddToCartClick = () => {
    addProductToCart({...product, quantity});
  }
  
  return ( 
    <div className="flex flex-col px-5">
      <h2 className="test-lg ">{product.name}</h2>

      {/* TOTAL PRICE */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {product.totalPrice.toFixed(2)}</h1>
        {product.discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>

      {/* BASE PRICE */}
      {product.discountPercentage > 0 && (
        <p className="opacity-75 text-sm line-through">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      {/* QUANTITY ITEM */}
      <div className="flex items-center gap-3 mt-4">
        <Button variant="outline" size="icon" onClick={handleDecreaseQuantity}>
          <ChevronLeftIcon />
        </Button>

        <span>{quantity}</span>

        <Button variant="outline" size="icon" onClick={handleIncreaseQuantity}>
          <ChevronRightIcon />
        </Button>
      </div>

      {/* DESCRIPTION ITEM */}
      <div className="flex flex-col mt-8">
        <h3 className="font-bold">Descrição</h3>
        <p className="opacity-60 text-sm text-justify mt-2">{product.description}</p>
      </div>

      {/* ADD TO CART */}
      <Button className="w-full mt-8 mb-5 font-semibold uppercase" onClick={handleAddToCartClick}>
        Adicionar ao carrinho
      </Button>

      {/* SHIPPING METHOD */}
      <div className="bg-accent flex items-center px-5 py-2 rounded-lg justify-between mb-8">
        <div className="flex items-center gap-3">
          <TruckIcon size={20} />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">Correios®</span>
            </p>
            <p className="text-xs text-primary">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="font-bold text-xs">Frete grátis</p>
      </div>
    </div>
   );
}
 
export default ProductInfo;