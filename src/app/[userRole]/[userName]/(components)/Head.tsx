import { MapPin } from "lucide-react";
import HeadActionOptions from "./HeadActionOptions";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Head = ({ userData, session }: any) => {
  const userRoles: { [key: string]: string } = {
    athlete: "Athlete",
    brand: "Brand",
    doctor: "Doctor",
    venue: "Venue",
  };

  return (
    <div>
      <div className="relative">
        <Image
          width={700}
          height={50}
          src={
            userData.backgroundImg ||
            "https://www.fr.com/images/demo/fish-richardson-header-default.png"
          }
          alt=""
          className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
        />
        <Image
          width={200}
          height={200}
          src={
            userData.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
          className="absolute left-10 -bottom-6 md:-bottom-8 border-white border-4 md:border-8 w-20 h-20 md:w-44 md:h-44 object-cover rounded-full"
        />
      </div>

      <div className="px-2 md:px-6 mt-2 md:mt-6 flex items-start flex-col gap-3 justify-between">
        <div className="flex flex-col gap-0">
          <span className="text-[10px] md:text-xs">{userRoles[userData.role]}</span>

          <div className="flex gap-3 items-center">
            <h1 className="text-2xl md:text-3xl font-bold">{userData.name}</h1>
            <Separator orientation="vertical" className="h-3 bg-gray-400" />
            <div className="flex items-center gap-2">
              <div className="text-xs md:text-sm font-normal flex gap-1 items-center px-2 py-1 bg-gray-200 rounded-md">
                {userData.followers?.length} <span>Followers</span>
              </div>
            </div>
          </div>

          <h1 className="md:mt-1 text-xs md:text-sm">{userData.bio}</h1>
          {userData.address && (
            <div className="flex items-center justify-start gap-1 mt-1">
              <MapPin className="text-gray-500 w-3 h-3 md:w-4 md:h-4" />
              <p className="text-xs md:text-sm text-gray-500">{`${userData.address?.city}, ${userData.address?.state}, ${userData.address?.country}`}</p>
            </div>
          )}
        </div>

        <HeadActionOptions userData={userData} session={session} />
      </div>
    </div>
  );
};

export default Head;
