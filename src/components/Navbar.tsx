import { signOut } from "@/auth";
import Image from "next/legacy/image";
import NavDesktop from "./client/NavDesktop";
import NavMobile from "./client/NavMobile";
import NavAction from "./client/NavAction";

const Navbar = async () => {
  return (
    <div className="sticky top-0 z-[30] bg-white">
      <div className="w-full  top-4 md:flex hidden px-20 py-3 border border-b items-center">
        <div className=" w-full flex justify-between items-center gap-8">
          <div className="flex-[1] flex justify-start gap-4 items-center w-full">
              <Image src={"/logo.png"} alt="logo" width={56} height={10} className="object-contain"/>
          </div>
          <NavDesktop />

          <NavAction />


        </div>
      </div>

      <div className="w-full px-2 py-3 md:hidden flex relative justify-between items-center gap-4 border border-b">
        <div className=" flex gap-2 justify-start items-center w-full">
          <Image src={"/images/logo.png"} alt="logo" width={44} height={44} className=" object-contain aspect-auto w-full" />
          <input
            type="text"
            placeholder="search"
            className="border border-gray-300 p-[6px] text-sm rounded-sm focus:outline-none w-full"
          />
        </div>
        <NavMobile />
      </div>
    </div>
  );
};

export default Navbar;
