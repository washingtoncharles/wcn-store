"use client";
import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, PercentIcon, ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";

const Header = () => {
  const {status, data} = useSession();

  const handleLoginClick = async () => {
    await signIn("google")
    //console.log("handleLoginClick")
  }

  const handleLogoutClick = async () => {
    await signOut()
    //console.log("handleLoginClick")
  }

  return ( 
    <Card className="flex justify-between p-[1.875rem] items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">Menu</SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && (<AvatarImage src={data.user.image}/>)}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sn opacity-75">Boas Compras!</p>
                </div>
              </div>

              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button className="w-full justify-start gap-2" onClick={handleLoginClick}>
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}

            {status === "authenticated" && (
              <Button className="w-full justify-start gap-2" onClick={handleLogoutClick}>
                <LogOutIcon size={16} />
                Fazer Logout
              </Button>
            )}
            

            <Button variant={"outline"} className="w-full justify-start gap-2">
              <HomeIcon size={16} />
              Inicio
            </Button>

            <Button variant={"outline"} className="w-full justify-start gap-2">
              <PercentIcon size={16} />
              Ofertas
            </Button>

            <Button variant={"outline"} className="w-full justify-start gap-2">
              <ListOrderedIcon size={16} />
              Catálogo
            </Button>
          </div>
          
        </SheetContent>
      </Sheet>
      
      <h1 className="text-lg font-semibold"><span className="text-primary">WCN</span> Store</h1>

      <Button size={"icon"} variant={"outline"}>
        <ShoppingCart />
      </Button>
    </Card>
   );
}
 
export default Header;