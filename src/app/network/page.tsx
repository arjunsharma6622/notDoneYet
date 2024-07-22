import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FollowingUsers from "./(components)/FollowingUsers";

const Page = async () => {
  const session: any = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex justify-between gap-4 items-start md:w-[90%] mt-5">
        <div className="flex-[9] w-full flex flex-col gap-4 border rounded-md ">
          <div className="w-full px-5 border-b py-4">
            <h1 className="text-2xl font-bold">Atheletes You Follow</h1>
          </div>
          <FollowingUsers userId={session?.user?._id}/>
        </div>
        <div className="flex-[3] w-full"></div>
      </div>
    </div>
  );
};

export default Page;
