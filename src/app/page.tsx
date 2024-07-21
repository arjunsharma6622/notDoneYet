import { auth } from "@/auth";
import RecommendedPosts from "@/components/client/RecommendedPosts";
import UserInfoCard from "@/components/client/UserInfoCard";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { redirect } from "next/navigation";


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
  let userData = {};

  if (user) {
    userData = await axios
      .get(`${API_HEAD}/user/${user?._id}`)
      .then((res) => res.data)
      .catch((err) => console.error("Error", err));
  }

  return (
    <div className="flex justify-center gap-5 w-full">
      {user && userData ? (
        <div className="w-full flex gap-10 md:flex-row flex-col items-start m-5">
          <div className="flex-[3]">
            <UserInfoCard userData={userData} />
          </div>
          <div className="flex-[6]">
            <RecommendedPosts currUser={userData} />
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
