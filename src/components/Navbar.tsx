import { auth } from "@/auth";
import NavAction from "./client/NavAction";
import NavDesktop from "./client/NavDesktop";
import NavMobile from "./client/NavMobile";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = async () => {
  const session : any = await auth()
  return (
    <div className="sticky top-0 z-[30] bg-white">
      <div className="w-full  top-4 md:flex hidden px-20 py-3 border border-b items-center">
        <div className=" w-full flex justify-between items-center gap-8">
          <div className="flex-[1] flex justify-start gap-4 items-center w-full">
              <img src={"/logo.png"} alt="logo" className="object-contain w-16"/>
          </div>
          {/* <Link href={"http://localhost:8000/auth/google"} target="_self"  className="bg-yellow-400 text-white">Google LGN</Link> */}
          <NavDesktop userId={session?.user?._id}/>
          <NavAction />
        </div>
      </div>

      <div className="w-full px-2 py-3 md:hidden flex relative justify-between items-center gap-4 border border-b">
        <div className=" flex gap-4 justify-start items-center w-full">
          <img src={"/logo.png"} alt="logo" className="object-contain w-14" />
        </div>
        <NavMobile userId={session?.user?._id}/>
      </div>
    </div>
  );
};

export default Navbar;
