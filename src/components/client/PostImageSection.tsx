"use client";

import { useState } from "react";
import ImagesModal from "./ImagesModal";
import Image from "next/legacy/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

const PostImageSection = ({ images, openModalOnClick = true }: any) => {
  const [openImagesModal, setOpenImagesModal] = useState(false);
  return (
    <div className="cursor-pointer max-w-[650px]">
      {images.length > 0 && (
        <div className="w-full" onClick={() => setOpenImagesModal(true)}>
          {images.length === 1 && (
            <Image
              alt=""
              width={650}
              height={325}
              layout="intrinsic"
              src={images[0]}
              className="w-full object-cover rounded-md aspect-[2/1]"
            />
          )}
          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-2">
              <Image
                alt=""
                width={650}
                layout="intrinsic"
                height={450}
                src={images[0]}
                className="w-full h-full object-cover rounded-md aspect-[2/1]"
              />
              <Image
                alt=""
                width={650}
                height={450}
                src={images[1]}
                className="w-full object-cover rounded-md aspect-[2/1]"
              />
            </div>
          )}
          {images.length === 3 && (
            <div className=" flex gap-1 rounded-md">
              <div className="flex-[6] relative">
                <Image
                  alt=""
                  layout="fill"
                  src={images[0]}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col h-fit w-full flex-[4] gap-1">
                <Image
                  alt=""
                  width={650}
                  height={325}
                  layout="intrinsic"
                  src={images[1]}
                  className="w-full object-cover rounded-md"
                />
                <Image
                  alt=""
                  width={650}
                  height={325}
                  layout="intrinsic"
                  src={images[2]}
                  className="w-full object-cover rounded-md"
                />
              </div>
            </div>
          )}
          {images.length >= 4 && (
            <div className=" flex relative gap-1 rounded-md">
              <div className="flex-[6]">
                <Image
                  alt=""
                  width={650}
                  height={325}
                  layout="intrinsic"
                  src={images[0]}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col h-fit w-full flex-[4] gap-1">
                <Image
                  alt=""
                  width={650}
                  height={325}
                  layout="intrinsic"
                  src={images[1]}
                  className="w-full object-cover rounded-md"
                />
                <div className="relative">
                  <Image
                    alt=""
                    width={650}
                    height={325}
                    layout="intrinsic"
                    src={images[2]}
                    className="w-full object-cover rounded-md"
                  />
                  <div className="flex items-center justify-center w-full h-full absolute right-0 bottom-0 bg-black/50 text-gray-200 text-xl px-2 py-1 rounded-md">
                    +{images.length - 3}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* <Carousel className="md:hidden">
        <CarouselContent>
          {images?.map((image: any) => (
            <CarouselItem key={image}>
              <Image
                src={image}
                width={500}
                height={500}
                alt="image"
                className="w-full object-cover aspect-[2/1]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images?.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
 */}


      {openImagesModal && openModalOnClick && (
        <div className="absolute">
          <ImagesModal
            images={images}
            open={openImagesModal}
            setOpen={setOpenImagesModal}
          />
        </div>
      )}
    </div>
  );
};

export default PostImageSection;
