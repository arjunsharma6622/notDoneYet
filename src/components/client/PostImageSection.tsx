"use client";

import LoadingModal from "@/app/dashboard/(modals)/LoadingModal";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import { useState } from "react";
import { isVideoUrl } from "@/lib/utils";

const ImagesModal = dynamic(
  () => import("./ImagesModal"),
  {
    loading: () => <LoadingModal />,
    ssr: false
  })



const MediaItem = ({ src, alt, width, height, layout, className, inGrid = false }: any) => {
  const [videoRatio, setVideoRatio] = useState<string | undefined>();

  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        controls={!inGrid}
        autoPlay={inGrid}
        loop={inGrid}
        muted={inGrid}
        playsInline={inGrid}
        className={`${className} ${inGrid ? "object-cover" : "object-contain bg-gray-100 dark:bg-gray-800"}`}
        style={inGrid ? {
          width: "100%",
          height: "100%"
        } : { 
          aspectRatio: videoRatio || "auto",
          maxHeight: "600px" 
        }}
        onClick={(e) => {
          if (!inGrid) e.stopPropagation();
        }}
        onLoadedMetadata={(e) => {
          if (!inGrid) {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth && videoHeight) {
              setVideoRatio(`${videoWidth}/${videoHeight}`);
            }
          }
        }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      layout={layout}
      className={className}
      objectFit={inGrid ? "cover" : "contain"}
    />
  );
};

const PostImageSection = ({ images, openModalOnClick = true }: any) => {
  const [openImagesModal, setOpenImagesModal] = useState(false);
  return (
    <div className="cursor-pointer max-w-[650px] mt-2">
      {images.length > 0 && (
        <div 
          className="w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800" 
          onClick={() => setOpenImagesModal(true)}
        >
          {images.length === 1 && (
            <div className="relative w-full max-h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <MediaItem
                alt=""
                width={800}
                height={800}
                layout="responsive"
                src={images[0]}
                className="w-full h-auto max-h-[600px]"
                inGrid={false}
              />
            </div>
          )}
          {images.length === 2 && (
            <div className="flex gap-[2px] h-[300px] sm:h-[400px]">
              <div className="relative w-1/2 h-full bg-gray-100 dark:bg-gray-800">
                <MediaItem layout="fill" src={images[0]} className="w-full h-full" inGrid={true} />
              </div>
              <div className="relative w-1/2 h-full bg-gray-100 dark:bg-gray-800">
                <MediaItem layout="fill" src={images[1]} className="w-full h-full" inGrid={true} />
              </div>
            </div>
          )}
          {images.length === 3 && (
            <div className="flex gap-[2px] h-[300px] sm:h-[400px]">
              <div className="relative w-1/2 h-full bg-gray-100 dark:bg-gray-800">
                <MediaItem layout="fill" src={images[0]} className="w-full h-full" inGrid={true} />
              </div>
              <div className="w-1/2 flex flex-col gap-[2px] h-full">
                <div className="relative w-full h-1/2 bg-gray-100 dark:bg-gray-800">
                  <MediaItem layout="fill" src={images[1]} className="w-full h-full" inGrid={true} />
                </div>
                <div className="relative w-full h-1/2 bg-gray-100 dark:bg-gray-800">
                  <MediaItem layout="fill" src={images[2]} className="w-full h-full" inGrid={true} />
                </div>
              </div>
            </div>
          )}
          {images.length >= 4 && (
            <div className="grid grid-cols-2 grid-rows-2 gap-[2px] h-[300px] sm:h-[400px]">
              {images.slice(0, 4).map((img: string, i: number) => (
                <div key={i} className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
                  <MediaItem layout="fill" src={img} className="w-full h-full" inGrid={true} />
                  {i === 3 && images.length > 4 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-3xl font-light">
                      +{images.length - 4}
                    </div>
                  )}
                </div>
              ))}
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
