import { auth } from "@/auth";
import RecommendedPosts from "@/components/client/RecommendedPosts";
import UserInfoCard from "@/components/client/UserInfoCard";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  // const coks : any = cookies().get('authjs.session-token');
  // console.log("coks", coks.value);

  // const x = await decode({
  //   token: coks.value,
  //   salt: "authjs.session-token",
  //   secret: process.env.AUTH_SECRET as string
  // })

  // console.log("x", x);

  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex justify-center gap-5 w-full">
      {user ? (
        <div className="w-full flex gap-10 md:flex-row flex-col items-start m-2">
          <div className="flex-[3] hidden md:block">
            <UserInfoCard userId={user?._id}/>
          </div>
          <div className="flex-[6]">
            <Suspense fallback={<div>Loading...</div>}>
              <RecommendedPosts userId={user?._id}/>
            </Suspense>
          </div>
          <div className="flex-[3]"></div>
        </div>
      ) : (
        // <div>
        //   <p>Please Login</p>
        //   <Link href="/login">
        //     <Button>Login</Button>
        //   </Link>
        // </div>
        redirect("https://ndy-static.vercel.app")
      )}
    </div>
  );
}
