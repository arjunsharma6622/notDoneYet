import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import Image from "next/legacy/image";
import { BiSolidStar } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

const Page = async ({
  params,
}: {
  params: { userRole: string; userName: string; productId: string };
}) => {
  const userRole = params.userRole;
  const userName = params.userName;
  const productId = params.productId;
  const productData = await axios
    .get(`${API_HEAD}/product/productData/${productId}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  const userData = await axios
    .get(
      `${API_HEAD}/user/profile/details?role=${userRole}&userName=${userName}`
    )
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));


  return (
    <div className="flex items-center justify-center">
        <div className="w-[95%] mt-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={userData?.image}
            alt=""
            width={32}
            height={32}
            layout="intrinsic"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold">{userData?.name}</span>
        </div>
      </div>
      <div className=" flex gap-10">
        <div className="flex flex-[7]">
          <div className="grid grid-cols-2 gap-4 gap-y-4">
            {productData?.images.map((image: string, index: number) => (
              <div key={index}>
                <img src={image} alt="" className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-[5] w-full">
          <div className="flex flex-col gap-4 w-full">
            <div>
            <h1 className="text-3xl font-bold">{productData?.name}</h1>
            <p className="text-gray-500 font-light">{productData?.description}</p>
            </div>

            <div className=" flex text-sm items-center gap-2 px-3 py-2 bg-gray-100 w-fit rounded-md">
          <div className="flex justify-center items-center gap-1">
            <span>4.5</span>
            <BiSolidStar className="w-4 h-4 text-green-500" />
          </div>
          |<div>3.2k Ratings</div>
        </div>

        <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold">Rs.{productData?.pricing.presentPrice}</p>
            <p className="text-gray-500 line-through text-base">Rs.{productData?.pricing.originalPrice}</p>
            <p className="text-red-500 font-medium">{productData?.pricing.discount}% Off</p>
            </div>

<div className="py-6 border-y pb-6 flex flex-col gap-4">
    <div className="flex flex-col gap-2">
        <p>Select size</p>
            <div className="flex items-center gap-4 ">
                {productData?.sizes.map((size : string | number, index : number) => (
                  <div key={index} className={`bg-gray-100 flex items-center justify-center rounded-full w-12 h-12`}>{size}</div>
                ))}
            </div>
            </div>
            <div className="flex items-center gap-4 pt-4">
                <button className="bg-blue-500 text-white rounded-md px-5 py-3 flex items-center gap-2">
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>
            </div>
            </div>
            

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Page;
