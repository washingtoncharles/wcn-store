import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({category}:CategoryItemProps) => {

  return ( 
    <Link href={`/category/${category.slug}`}>
      <Badge variant={"outline"} className="py-3 gap-2 flex items-center justify-center rounded-lg">
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        <span className="font-bold text-xs">{category.name}</span>
      </Badge>
    </Link>
   );
}
 
export default CategoryItem;