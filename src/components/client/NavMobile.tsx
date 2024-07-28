import { HeartPulse, Home, MapPinned, Menu, UsersRound } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const NavMobile = () => {

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home strokeWidth={1.5}/>,
      subItems: ["Home", "About", "Contact"],
    },
    {
      name: "Network",
      path: "/network",
      icon: <UsersRound strokeWidth={1.5}/>,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <HeartPulse strokeWidth={1.5} />,
    },
    {
      name: "Venues",
      path: "/venues",
      icon: <MapPinned strokeWidth={1.5}/>,
    },
  ];

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className={`h-7 w-7 cursor-pointer md:hidden`} />
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid w-[200px] p-4">
            <div className="flex flex-col gap-4">
              {menuItems.map((menuItem) => (
                <Link
                  key={menuItem.name}
                  href={menuItem.path}
                  className="px-2 text-base cursor-pointer flex gap-2 items-center"
                >
                  <div className="text-xl">{menuItem.icon}</div>
                  {menuItem.name}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavMobile;
