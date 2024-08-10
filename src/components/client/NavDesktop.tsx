"use client";

import useAuth from "@/context/useAuth";
import { HeartPulse, Home, MapPinned, MessageSquareText, UsersRound } from "lucide-react";
import Link from "next/link";
import UnreadMsgsCount from "./UnreadMsgsCount";

const NavDesktop = ({ pathName }: { pathName: string }) => {
  const { auth } = useAuth()
  const { isAuthenticated, user: authenticatedUser } = auth;

  const menuItems = [
    {
      name: "Home",
      path: "/feed",
      icon: <Home strokeWidth={1.5} />,
      subItems: ["Home", "About", "Contact"],
    },
    {
      name: "Network",
      path: "/network",
      icon: <UsersRound strokeWidth={1.5} />,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: <HeartPulse strokeWidth={1.5} />,
    },
    {
      name: "Venues",
      path: "/venues",
      icon: <MapPinned strokeWidth={1.5} />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <MessageSquareText strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="flex gap-4 items-center justify-center">
      {menuItems.map((menuItem) => (
        <div key={menuItem.name} className="flex flex-col justify-between relative">
          <Link
            href={menuItem.path}
            className={`${pathName === menuItem.path ? "text-blue-600" : ""} px-2 text-base cursor-pointer flex gap-2 items-center`}
          >
            {menuItem.name === "Messages" ? (
              <div className="relative">
                <div className="text-xl">{menuItem.icon}</div>
                {(isAuthenticated && authenticatedUser) &&
                  <UnreadMsgsCount />
                }
              </div>
            ) : (
              <div className={`text-xl`}>{menuItem.icon}</div>
            )}
            {menuItem.name}
          </Link>
          {pathName === menuItem.path &&
            <div className="absolute -bottom-[15px] h-[4px] w-full bg-blue-200 rounded-t-xl"></div>
          }
        </div>
      ))}
    </div>
  );
};

export default NavDesktop;