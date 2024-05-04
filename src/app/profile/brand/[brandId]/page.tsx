import axios from "axios";
import BrandProfile from "./BrandProfile";
import { BASE_URL } from "@/lib/utils";

const Page = async ({ params }: { params: { brandId: string } }) => {
  const userID = params.brandId;

  const userData = await axios
    .get(`${BASE_URL}/api/user/${userID}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="md:w-[95%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
        <div className="w-full flex flex-col gap-5 md:flex-[9]">
          {userData && <BrandProfile userData={userData} />}
        </div>
        <div className="w-full flex flex-col md:flex-[3]"></div>
      </div>
    </div>
  );
};

export default Page;
