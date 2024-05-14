import { auth } from "@/auth";
import ProductCard from "@/components/client/ProductCard";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import Filters from "./(components)/Filters";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import HeadActionOptions from "../(components)/HeadActionOptions";

const Page = async ({
  params,
}: {
  params: { userRole: string; userName: string };
}) => {
  const session = await auth();

  const userName = params.userName;
  const userRole = params.userRole;

  if (userRole !== "brand") {
    return null;
  }

  const userData = await axios
    .get(`${API_HEAD}/user/profile/details?role=${userRole}&userName=${userName}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  const allProducts = await axios
    .get(`${API_HEAD}/product/user?userName=${userName}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div className="flex items-center justify-center mt-3">
      <div className="w-full flex flex-col gap-4 px-5">


      <div className="flex justify-center items-center w-full">
        <div className="flex items-center gap-4">
            <div>
                <img src={userData?.image} alt="" className="w-12 h-12 rounded-full"/>
            </div>
            <div className="flex flex-col">
                <span className="text-3xl font-bold">{userData?.name}</span>
            </div>
        </div>

        </div>


      <div className="flex justify-between items-center w-full">
            <div className="flex flex-[1]">
                <p className="text-xs text-gray-500">results for <span className="text-black font-semibold text-xl">Track Pants</span></p>
            </div>

            <div className="flex items-center justify-center flex-[1]">
                <div className="w-[70%] relative">
            <input type="text" className="border focus:outline-none border-gray-300 rounded-full pl-12 w-full px-4 py-2" placeholder="Search"/>
            <div>
                <FiSearch className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            </div>
            </div>
        </div>

            <div className="flex flex-[1] justify-end">
                <div className="w-fit gap-2 border flex items-center text-sm rounded-md px-2 py-1">
              <span>Sort By </span>
              <FiChevronDown className="w-5 h-5"/>
              </div>
            </div>
          </div>


          <div className="flex gap-4">


        <div className="flex-[2.8] sticky top-24">
          <Filters />
        </div>

        <div className="flex-[10] flex flex-col gap-4">

          <div className="grid md:grid-cols-4 gap-4 gap-y-8 w-full">
            {allProducts?.map((product: any, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
