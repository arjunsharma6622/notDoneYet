import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="h-dvh flex items-center justify-center">
      {user ? (
        <div className="flex items-center gap-4 flex-col">
          <img referrerPolicy="no-referrer" src={user?.image as string} alt={user?.name as string} className="w-24 h-24 rounded-full" />
          <h1>Hi {user.name}</h1>
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
          <Button type="submit">
            <Link href="/login">Login</Link>
          </Button>
          <Button type="submit">
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
