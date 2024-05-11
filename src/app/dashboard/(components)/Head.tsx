import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import BasicProfileEdit from "../(modals)/BasicProfileEdit";
import ImageEdit from "../(modals)/images/ImageEdit";

const Head = ({ userData }: { userData: any }) => {
  const [openImagesEdit, setOpenImagesEdit] = useState(false);
  const [openDetailsEdit, setOpenDetailsEdit] = useState(false);

  const userRoles: { [key: string]: string } = {
    athlete: "Athlete",
    brand: "Brand",
    doctor: "Doctor",
    venueOwner: "Venue",
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

        <div className="text-gray-600 absolute right-6 top-6 bg-white cursor-pointer rounded-full p-[6px]">
          <FiEdit3
            className="h-5 w-5 md:h-6 md:w-6"
            onClick={() => setOpenImagesEdit(true)}
          />
        </div>
      </div>



      <div className="px-2 md:px-6 mt-10 flex flex-col">
          <span className="text-xs">{userRoles[userData?.role]}</span>

          <div className="flex justify-between items-center">
            <h1 className="md:text-3xl text-lg font-bold">{userData?.name}</h1>
            <FiEdit3
              className="cursor-pointer md:h-6 md:w-6 w-5 h-5 text-gray-600"
              onClick={() => setOpenDetailsEdit(true)}
            />
          </div>

          <h1 className="text-sm md:text-base">{userData?.bio}</h1>
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
