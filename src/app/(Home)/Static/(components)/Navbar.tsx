"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className={`fixed flex items-center justify-center w-full z-[40] -top-2`}>
      <Link href="#" className={`flex w-[80%] md:w-1/4 items-center justify-center gap-2 transition-all duration-200 mx-auto py-4  md:px-10 px-6 rounded-b-[2rem] ${!isVisible ? 'bg-white backdrop-blur-sm top-0 shadow-xl' : 'bg-transparent'}`} prefetch={false}>
        <Image
          src="/logo_long.svg"
          alt="Logo"
          width={200}
          height={700}
          className="w-32 md:w-44 mt-1"
        />
      </Link>
    </div>
  )
}