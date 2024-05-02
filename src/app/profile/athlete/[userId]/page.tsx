import { auth } from "@/auth";
import axios from "axios";
import AthleteProfile from "./AthleteProfile";
import { BASE_URL } from "@/lib/utils";

const Page = async ({ params } : { params: { userId: string } }) => {
  const session = await auth()
  const userID = params.userId;

  const userData = await axios.get(`${BASE_URL}/api/user/${userID}`).then((res) => res.data).catch((err) => console.error("Error", err))


  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="md:w-[95%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
        <div className="w-full flex flex-col gap-5 md:flex-[9]">
          {userData && (
            <AthleteProfile userData={userData} />
          )}
        </div>
        <div className="w-full flex flex-col md:flex-[3]"></div>
      </div>
{/* } */}
    </div>
  );
};

export default Page;
