import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FollowingUsers from "./(components)/FollowingUsers";
import Users from "./(components)/Users";

const Page = async () => {
  const session: any = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex justify-between gap-4 items-start w-full mx-5 mt-5">
      <div className="flex-[3] w-full">
      <div className="w-full px-5 py-4">
        <h1 className="text-2xl font-bold">Discover new network</h1>
      </div>
      <Users />
      </div>

        <div className="flex-[1] w-full flex flex-col gap-4 border rounded-md ">
          {/* <FollowingUsers userId={session?.user?._id}/> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
