import { IconButton } from "@/components/ui/IconButton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { FiArrowUpRight, FiInfo, FiMapPin } from "react-icons/fi";
import BasicProfileEdit from "../(modals)/BasicProfileEdit";
import ImageEdit from "../(modals)/images/ImageEdit";

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
            width={1600}
            height={400}
            alt=""
            className="object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
          />
          <img
            src={
              userData?.image ||
              "https://www.fr.com/images/demo/fish-richardson-header-default.png"
            }
            referrerPolicy="no-referrer"
            alt=""
            width={160}
            height={160}
            className="absolute left-6 md:-bottom-10 -bottom-6 border-4 border-white md:border-8 object-cover rounded-full"
          />

          <div className="absolute right-6 top-6">
            <IconButton
              variant={"edit"}
              onClick={() => setOpenImagesEdit(true)}
            />
          </div>
        </div>

        <div className="px-2 md:px-6 mt-10 flex flex-col">
          <span className="text-xs">{userRoles[userData?.role]}</span>

          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <h1 className="md:text-3xl text-lg font-bold">
                {userData?.name}
              </h1>
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
            <IconButton
              variant={"edit"}
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

          {userData.role !== "venue" && (
            <Link
              className="w-fit mt-2 text-sm text-primary"
              target="_blank"
              href={`/${userRoles[userData?.role]?.toLowerCase()}/${userData?.userName}`}
            >
              <span className="">View my profile</span>
              <FiArrowUpRight className="inline w-4 h-4 md:w-5 md:h-5 mb-1" />
            </Link>
          )}
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
