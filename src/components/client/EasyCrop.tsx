"use client"

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";

const EasyCrop = ({ image, setImage, aspectRatio, widthOfImg, croppedImage, setCroppedImage } : any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [croppedImage, setCroppedImage] : any = useState(null);

  const onCropComplete = useCallback((croppedArea : any, croppedAreaPixels : any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const blobUrlToFile = async (url : string, fileName : string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation,
      );
      setCroppedImage(croppedImage);
      const file = await blobUrlToFile(croppedImage as string, "crop.png");
      setImage(file);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div className=" flex flex-col gap-3 items-center justify-center">
      <div
        className=""
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className={`relative flex justify-center ${widthOfImg} h-64`}>
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            classes={{
              containerClassName: "rounded-xl w-full",
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          style={{
            display: image === null || croppedImage !== null ? "none" : "block",
          }}
          className="bg-green-500 text-white py-2 px-4 rounded w-full"
          onClick={showCroppedImage}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EasyCrop;