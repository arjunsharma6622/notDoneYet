"use client"

import { useState } from "react";
import ImagesModal from "./ImagesModal";

const PostImageSection = ({images} : any) => {
    const [openImagesModal, setOpenImagesModal] = useState(false);
  return (
    <div className="cursor-pointer">
        {images.length > 0 && (
            <div onClick={() => setOpenImagesModal(true)}>
                {images.length === 1 && (
                    <img src={images[0]} className="w-full h-full object-cover rounded-md" />
                )}
                {images.length === 2 && (
                    <div className="grid grid-cols-2 gap-2">
                        <img src={images[0]} className="w-full h-full object-cover rounded-md" />
                        <img src={images[1]} className="w-full h-full object-cover rounded-md" />
                    </div>
                )}
                {images.length === 3 && (
                    <div className=" flex gap-1 rounded-md">
                        <div className="flex-[6]">
                        <img src={images[0]} className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col h-fit w-full flex-[4] gap-1">
                        <img src={images[1]} className="w-full object-cover rounded-md" />
                        <img src={images[2]} className="w-full object-cover rounded-md" />
                        </div>
                    </div>
                )}
                {images.length >= 4 && (
                    <div className=" flex gap-1 rounded-md">
                    <div className="flex-[6]">
                    <img src={images[0]} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="flex flex-col h-fit w-full flex-[4] gap-1">
                    <img src={images[1]} className="w-full object-cover rounded-md" />
                    <div className="relative">
                    <img src={images[2]} className="w-full object-cover rounded-md" />
                        <div className="flex items-center justify-center w-full h-full absolute right-0 bottom-0 bg-black/50 text-gray-200 text-xl px-2 py-1 rounded-md">+{images.length - 3}</div>
                    </div>
                    </div>
                </div>
                )}
            </div>
        )}

{openImagesModal && (
        <div className="absolute">
          <ImagesModal
            images={images}
            open={openImagesModal}
            setOpen={setOpenImagesModal}
          />
        </div>
      )}
    </div>
  )
}

export default PostImageSection