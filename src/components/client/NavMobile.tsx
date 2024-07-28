import { Menu } from "lucide-react";
import Link from "next/link";
import { CiMedicalCase } from "react-icons/ci";
import { FiHome, FiUser } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import NavAction from "./NavAction";

const NavMobile = () => {

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FiHome />,
      subItems: ["Home", "About", "Contact"],
    },
    {
      name: "Network",
      path: "/network",
      icon: <FiUser />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <CiMedicalCase strokeWidth={1} />,
    },
    {
      name: "Venues",
      path: "/venues",
      icon: <GrMapLocation />,
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
            <NavAction />
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
