import { useState } from "react";
import { FiArrowUpRight, FiEdit3, FiInfo, FiMapPin } from "react-icons/fi";
import BasicProfileEdit from "../(modals)/BasicProfileEdit";
import ImageEdit from "../(modals)/images/ImageEdit";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Head = ({ userData }: { userData: any }) => {
  const [openImagesEdit, setOpenImagesEdit] = useState(false);
  const [openDetailsEdit, setOpenDetailsEdit] = useState(false);

  const userRoles: { [key: string]: string } = {
    athlete: "Athlete",
    brand: "Brand",
    doctor: "Doctor",
    venue: "Venue",
  };

  return (
    <>
      <div>
        <div className="relative">
          <img
            src={
              userData?.backgroundImg ||
              "https://www.fr.com/images/demo/fish-richardson-header-default.png"
            }
            referrerPolicy="no-referrer"
            alt=""
            className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
          />
          <img
            src={
              userData?.image ||
              "https://www.fr.com/images/demo/fish-richardson-header-default.png"
            }
            referrerPolicy="no-referrer"
            alt=""
            className="absolute left-6 md:-bottom-10 -bottom-6 border-4 w-20 h-20 border-white md:border-8 md:w-44 md:h-44 object-cover rounded-full"
          />

          <div
            onClick={() => setOpenImagesEdit(true)}
            className="text-gray-600 absolute right-6 top-6 bg-white cursor-pointer rounded-full p-[6px]"
          >
            <FiEdit3 className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>

        <div className="px-2 md:px-6 mt-10 flex flex-col">
          <span className="text-xs">{userRoles[userData?.role]}</span>

          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
            <h1 className="md:text-3xl text-lg font-bold">{userData?.name}</h1>
            <Separator orientation="vertical" className="h-3 bg-gray-400" />
            <div className="flex items-center gap-2">
              <div className="text-sm font-normal flex gap-1 items-center px-2 py-1 bg-gray-200 rounded-md">
                {userData.followers?.length} <span>Followers</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-500"></div>
              <div className="text-sm font-normal flex gap-1 items-center px-2 py-1 bg-gray-200 rounded-md">
                {userData.following?.length} <span>Following</span>
              </div>
            </div>
          </div>
            <FiEdit3
              className="cursor-pointer md:h-6 md:w-6 w-5 h-5 text-gray-600"
              onClick={() => setOpenDetailsEdit(true)}
            />
          </div>

          <h1 className="text-sm md:text-base">{userData?.bio}</h1>
          {userData?.address ? (
            <div className="flex items-center justify-start gap-1">
              <FiMapPin className="text-gray-500 w-4 h-4" />
              <p className="mt-1 text-sm text-gray-500">{`${userData.address?.city}, ${userData.address?.state}, ${userData.address?.country}`}</p>
            </div>
          ) : (
            <div>
              <div className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                <FiInfo className="w-4 h-4 mr-1" />
                <p>
                  No address added.{" "}
                  <span
                    onClick={() => setOpenDetailsEdit(true)}
                    className="text-primary cursor-pointer"
                  >
                    Add address?
                  </span>
                </p>
              </div>
            </div>
          )}

          <Link
            className="w-fit mt-2 text-sm text-primary"
            target="_blank"
            href={`/${userRoles[userData?.role].toLowerCase()}/${userData?.userName}`}
          >
            <span className="">View my profile</span>
            <FiArrowUpRight className="inline w-4 h-4 md:w-5 md:h-5 mb-1" />
          </Link>
        </div>
      </div>

      {openImagesEdit && (
        <div className="absolute">
          <ImageEdit
            open={openImagesEdit}
            setOpen={setOpenImagesEdit}
            user={userData}
          />
        </div>
      )}
      {openDetailsEdit && (
        <div className="absolute">
          <BasicProfileEdit
            open={openDetailsEdit}
            setOpen={setOpenDetailsEdit}
            user={userData}
          />
        </div>
      )}
    </>
  );
};

export default Head;
