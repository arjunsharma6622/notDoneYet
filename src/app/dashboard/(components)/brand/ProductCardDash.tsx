"use client";

import EditProduct from "@/app/dashboard/(modals)/Brand/EditProduct";
import { IconButton } from "@/components/ui/IconButton";
import Image from "next/legacy/image";
import { useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import DeleteProduct from "../../(modals)/Brand/DeleteProduct";

const ProductCard = ({ product }: any) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <div className=" w-full overflow-hidden flex flex-col gap-2">
        <div className="w-full overflow-hidden relative rounded-lg  cursor-pointer">
          <Image
            src={product?.images[0]}
            alt=""
            width={600}
            height={800}
            layout="intrinsic"
            className="hover:scale-105 transform transition duration-500 "
          />
          <div className="z-[20] flex text-xs items-center gap-1 absolute bottom-2 left-2 bg-white/90 px-2 py-2 rounded-md">
            <div className="flex justify-center items-center gap-1">
              <span>4.5</span>
              <BiSolidStar className="w-4 h-4 text-green-500" />
            </div>
            |<div>3.2k</div>
          </div>

          <div className="z-[20] absolute top-2 right-2 flex items-center gap-2">
            <IconButton variant={"edit"} onClick={() => setOpenEdit(true)} />
            <IconButton variant={"delete"} onClick={() => setOpenDelete(true)} />
          </div>

          <div className=" absolute bottom-0 w-full z-[10] h-24 bg-gradient-to-t from-black/60 from-5% to-transparent to-90%"></div>
        </div>
        <div className="flex flex-col gap-0">
          <div>
            <p className=" font-medium">{product?.name}</p>
          </div>
          <p className="text-xs text-gray-500">{product?.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium">
              Rs.{product?.pricing.presentPrice}
            </span>
            <span className="text-xs line-through text-gray-500">
              Rs.{product?.pricing.originalPrice}
            </span>
            <span className="text-xs text-red-500">
              ({product?.pricing?.discount}% off)
            </span>
          </div>
        </div>
      </div>
      {openEdit && (
        <div className="absolute">
          <EditProduct
            open={openEdit}
            setOpen={setOpenEdit}
            user={product}
            product={product}
          />
        </div>
      )}
      {openDelete && (
        <div className="absolute">
            <DeleteProduct
              open={openDelete}
              setOpen={setOpenDelete}
              user={product}
              product={product}
              />
        </div>
      )}
    </>
  );
};

export default ProductCard;
