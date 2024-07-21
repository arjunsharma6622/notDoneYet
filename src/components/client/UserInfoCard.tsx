import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import Image from "next/legacy/image";

const UserInfoCard = async ({userId, userName} : {userId?: string, userName?: string}) => {
  if (!userId && !userName) {
    throw new Error("Either userId or userName must be provided");
  }

  const queryParam = userId ? `userId=${userId}` : `userName=${userName}`;

  const userData = await axios.get(`${API_HEAD}/user/getUser?${queryParam}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div className="flex flex-col gap-2 items-center justify-start border rounded-md h-fit px-4 py-4">
      <Image
        width={40}
        height={40}
        layout="intrinsic"
        alt=""
        src={userData?.image}
        className="rounded-full w-20 h-20"
        referrerPolicy="no-referrer"
      />

      <div className="flex flex-col gap-1 items-center">
        <p className="text-lg">{userData?.name}</p>
        <p className="text-xs text-center">{userData?.bio}</p>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm">
        <span>{userData?.followers?.length} Followers</span>
        <span>{userData?.following?.length} Following</span>
      </div>
    </div>
  );
};

export default UserInfoCard;
