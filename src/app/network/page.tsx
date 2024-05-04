import { auth } from "@/auth";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import FollowingUserCard from "./(components)/FollowingUserCard";

const Page = async () => {
  const session: any = await auth();

  const following = await axios.get(`${BASE_URL}/api/user/following/${session?.user?._id}`).then((res) => res.data).catch((err) => console.error("Error", err));

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex justify-between gap-4 items-start md:w-[90%] mt-5">
        <div className="flex-[9] w-full flex flex-col gap-4 border rounded-md ">
          <div className="w-full px-5 border-b py-4">
            <h1 className="text-2xl font-bold">Atheletes You Follow</h1>
            <p>You Follow {following?.length} athletes</p>
          </div>

          <div className="flex flex-col px-5">
            {following?.map((follow: any, index: number) => (
              <FollowingUserCard
                key={follow._id}
                follow={follow}
                following={following}
                index={index}
                session={session}
              />
            ))}
          </div>
        </div>

        <div className="flex-[3] w-full"></div>
      </div>
    </div>
  );
};

export default Page;
