"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CiMedicalCase } from 'react-icons/ci';
import { FiHome, FiMenu, FiMessageSquare, FiUser, FiX } from 'react-icons/fi';
import { GrMapLocation } from 'react-icons/gr';
import { Button } from '../ui/button';

const NavMobile = ({session} : any) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
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

      const socialImages = [
        {
          name: "linkedin",
          icon: "linkedIn.svg",
        },
        {
          name: "youtube",
          icon: "youtube.svg",
        },
        {
          name: "medium",
          icon : "twitter.svg",
        },
        {
          name: "github",
          icon: "github.svg",
        },
      ]
  return (
    <>
      <div>
        <div>
          <FiMenu
            className="w-6 h-6"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          />
        </div>
      </div>

      {openMobileMenu && (
        <div className="h-screen overflow-hidden flex flex-col items-center justify-start top-0 left-0 w-full z-[999] fixed bg-white/90 backdrop-blur-sm">
          <div className="w-[90%] flex justify-center items-start flex-col gap-5 mt-5">
            <div className="flex justify-end items-center w-full">
              <FiX
                className="w-6 h-6"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              />
            </div>
            {session?.user ? (
              <div className="border-b w-full pb-4">
                <div className="flex items-center justify-start gap-4">
                  <Image
                    src={
                      (session && session.user.image) ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt=""
                    className="rounded-full object-cover"
                    width={40}
                    height={40}
                    layout='intrinsic'
                    referrerPolicy="no-referrer"
                  />
                  <Link
                    href={"/dashboard"}
                    className=""
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                  >
                    <span className="text-blue-600 underline">
                      {session && session.user.name?.split(" ")[0]}
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4">
                  <Button
                    asChild
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            )}

            <div className="border-b w-full pb-4">
              <div className="flex flex-col gap-4 w-full">
                {menuItems.map((menuItem) => (
                  <Link
                    key={menuItem.name}
                    href={menuItem.path}
                    className="px-2 text-base cursor-pointer flex gap-2 items-center"
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                  >
                    <div className="text-xl">{menuItem.icon}</div>
                    {menuItem.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm">Connect with us on</p>
              <div className="flex w-full items-center justify-start gap-4">
                { socialImages.map(({name, icon}) => (
                <div key={name}>
                  <Image
                    src={`/images/social/${icon}`}
                    alt={name}
                    width={32}
                    height={32}
                  />
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavMobile;
