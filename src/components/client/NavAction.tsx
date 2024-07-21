import { auth, signOut } from '@/auth';
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const NavAction = async () => {
    const session = await auth();

    const handleSignOut = async () => {
        "use server";
        await signOut();
    };
    return (
        <div className="flex-[1] flex justify-end">
            {session && session?.user ? (
                <div className="relative flex items-center justify-between gap-4 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <Image
                            src={session && (session.user.image as string)}
                            alt=""
                            width={28}
                            height={28}
                            layout="intrinsic"
                            className="rounded-full object-cover"
                            referrerPolicy="no-referrer"
                        />

                        <Link  href={"/dashboard"} className="text-blue-600 underline">
                            {session.user.name?.split(" ")[0]}
                        </Link>
                    </div>

                    <form action={handleSignOut}>
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
        </div>)
}

export default NavAction