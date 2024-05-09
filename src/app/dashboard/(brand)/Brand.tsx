import { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import AddProduct from "./(components)/AddProduct";
import ImageEdit from "../(components)/ImageEdit";

const Brand = ({ userData }: { userData: any }) => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openImagesEdit, setOpenImagesEdit] = useState(false);

  return (
    <div className="flex flex-col rounded-md border gap-5">
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
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          referrerPolicy="no-referrer"
          alt=""
          className="absolute left-6 md:-bottom-10 -bottom-6 border-4 w-20 h-20 border-white md:border-8 md:w-44 md:h-44 object-cover rounded-full"
        />

        <div className="text-gray-600 absolute right-6 top-6 bg-white cursor-pointer rounded-full p-[6px]">
          <FiEdit3 className="h-5 w-5 md:h-6 md:w-6" onClick={() => setOpenImagesEdit(true)}
/>
        </div>
      </div>
      <div className="px-2 md:px-6 mt-2 flex flex-col">
        <span className="text-xs">Athlete</span>

        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl text-lg font-bold">{userData?.name}</h1>
          <FiEdit3 className="cursor-pointer md:h-6 md:w-6 w-5 h-5 text-gray-600" />
        </div>

        <h1 className="text-sm md:text-base">{userData?.bio}</h1>
      </div>

      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Products</h2>

          <div className="flex justify-start items-center gap-4">
            <FiPlus
              className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              onClick={() => setOpenAddProduct(true)}
            />
            <FiEdit3
              className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              onClick={() => setOpenEditProduct(true)}
            />
          </div>
        </div>
      </div>

      {openAddProduct && (
        <div className="absolute">
          <AddProduct
            open={openAddProduct}
            setOpen={setOpenAddProduct}
            user={userData}
          />
        </div>
      )}

{openImagesEdit && (
        <div className="absolute">
          <ImageEdit
            open={openImagesEdit}
            setOpen={setOpenImagesEdit}
            user={userData}
          />
        </div>
      )}
    </div>
  );
};

export default Brand;
