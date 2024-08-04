"use client";

import { HeartPulse, Home, MapPinned, MessageSquareText, UsersRound } from "lucide-react";
import Link from "next/link";
import UnreadMsgsCount from "./UnreadMsgsCount";

const NavDesktop = () => {

  const menuItems = [
    {
      name: "Home",
      path: "/",
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
        <Link
          key={menuItem.name}
          href={menuItem.path}
          className="px-2 text-base cursor-pointer flex gap-2 items-center"
        >
          {menuItem.name === "Messages" ? (
            <div className="relative">
              <div className="text-xl">{menuItem.icon}</div>
                <UnreadMsgsCount />
            </div>
          ) : (
            <div className="text-xl">{menuItem.icon}</div>
          )}
          {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default NavDesktop;
