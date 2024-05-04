import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CiMedicalCase } from "react-icons/ci";
import { FiHome, FiMessageSquare, FiUser } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";

const Navbar = async () => {
  // const [userMenuOpen, setUserMenuOpen] = useState(false);
  //   const { data: session } = useSession();
  //   const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const session = await auth();

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
      path: "/venue",
      icon: <GrMapLocation />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <FiMessageSquare />,
    },
  ];

  return (
    <div className="sticky top-0 z-[30] bg-white">
      <div className="w-full  top-4 md:flex hidden px-20 py-3 border border-b items-center">
        <div className="w-full flex justify-center items-center">
          <div className="flex-[4] px-5 flex justify-center gap-4 items-center w-full">
            <span className=" font-extrabold text-2xl">NDY</span>
            <input
              type="text"
              placeholder="search"
              className="border border-gray-300 p-2 rounded-sm focus:outline-none w-72"
            />
          </div>

          <div className="flex-[8] flex gap-4 items-center justify-center w-full">
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.name}
                href={menuItem.path}
                className="px-2 text-base cursor-pointer flex gap-2 items-center"
              >
                { menuItem.name === "Messages" ?
                <div className="relative">
                <div className="text-xl">{menuItem.icon}</div>
                <div className="text-white absolute font-medium -top-[7px] -right-[7px] h-4 w-4 px-1 py-1 flex text-[10px] items-center justify-center bg-red-500 rounded-full">
                  3
                </div>
                </div>
                :
                <div className="text-xl">{menuItem.icon}</div>
                }
                {menuItem.name}
              </Link>
            ))}

            {session && session?.user ? (
              <div className="relative flex items-center justify-between gap-2 cursor-pointer">
                <img
                  src={session && (session.user.image as string)}
                  alt=""
                  className="rounded-full w-6 h-6 object-cover"
                  width={100}
                  height={100}
                  referrerPolicy="no-referrer"
                />

                <Link href={"/dashboard"} className="text-blue-600 underline">
                  Me
                </Link>

                <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Logout</Button>
          </form>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Signup</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full px-2 py-3 md:hidden flex relative justify-between items-center gap-4 border border-b">
        <div className=" flex gap-2 justify-start items-center w-full">
          <span className=" font-extrabold text-xl">NDY</span>
          <input
            type="text"
            placeholder="search"
            className="border border-gray-300 p-[6px] text-sm rounded-sm focus:outline-none w-full"
          />
        </div>

        {/* <div>
              <div>
                <FiMenu className="w-6 h-6" onClick={() => setOpenMobileMenu(!openMobileMenu)}/>
              </div>
            </div> */}

        {/* { openMobileMenu &&

            <div className="h-screen overflow-hidden flex flex-col items-center justify-start top-0 left-0 w-full z-[999] fixed bg-white/90 backdrop-blur-sm">
<div className="w-[90%] flex justify-center items-start flex-col gap-5 mt-5">


<div className="flex justify-end items-center w-full">
                <FiX className="w-6 h-6" onClick={() => setOpenMobileMenu(!openMobileMenu)}/>
              </div>
{ session?.user ?
<div className="border-b w-full pb-4">
              <div className="flex items-center justify-start gap-4">
                <img
                  src={
                    (session && session.user.profileImg) ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt=""
                  className="rounded-full w-10 h-10 object-cover"
                  width={100}
                  height={100}
                  referrerpolicy="no-referrer"
                />
                <Link href={"/dashboard"} className="" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                <span className="text-blue-600 underline">
                  Me
                </span>
                </Link>
              </div>
              
            </div>

            :

            <div>
              <div className="flex items-center gap-4">
                <Button asChild onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                  <Link href="/signup">Sign Up</Link>
                </Button>
            </div>

            </div>

                }


<div className="border-b w-full pb-4">
              <div className="flex flex-col gap-4 w-full">
              {
                menuItems.map((menuItem) => (
                  <Link
                    key={menuItem.name}
                    href={menuItem.path}
                    className="px-2 text-base cursor-pointer flex gap-2 items-center"
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                  >
                    <div className="text-xl">{menuItem.icon}</div>
                    {menuItem.name}
                  </Link>
                ))
              }
              </div>
              </div>

<div className="flex flex-col gap-4">
  <p className="text-sm">Connect with us on</p>
            <div className="flex w-full items-center justify-start gap-4">

              <div>
                <img src="/images/social/linkedIn.svg" alt="" className="w-8 h-8"/>
              </div>
              <div>
                <img src="/images/social/youtube.svg" alt="" className="w-8 h-8"/>
              </div>
              <div>
                <img src="/images/social/medium.svg" alt="" className="w-8 h-8"/>
              </div>
              <div>
                <img src="/images/social/github.svg" alt="" className="w-8 h-8"/>
              </div>

            </div>
            </div>

            </div>

            </div>

} */}
      </div>
    </div>
  );
};

export default Navbar;
