"use client"

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import { FiCrop } from "react-icons/fi";

const EasyCrop = ({ image, setImage, aspectRatio, widthOfImg,heightOfImg, croppedImage, setCroppedImage, inProductImages, croppedFile, setCroppedFile } : any) => {
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
      if (image !== null && croppedImage === null) {
        const croppedImageFromCropper = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation,
        );

        setCroppedImage(croppedImageFromCropper);
        console.log("croppedImage", croppedImageFromCropper);

        const file = await blobUrlToFile(croppedImageFromCropper as string, "crop.png");
  
        if (inProductImages) {
          setCroppedFile(file);
          setImage(null);
          setCroppedImage(null);
        } else {
          setImage(file);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image, croppedImage, inProductImages, setCroppedFile, setImage, setCroppedImage]);
  

  return (
    <div className=" flex flex-col gap-3 items-center justify-center">
      <div
        className=""
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className={`relative flex justify-center ${widthOfImg} ${heightOfImg ? heightOfImg : "h-64"} aspect-${aspectRatio}`}>
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

        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${ (image === null || croppedImage !== null) ? "hidden" : "flex"} items-center justify-center gap-2 w-full`}
          onClick={() => showCroppedImage()}
        >
          <FiCrop className="w-5 h-5"/>
          <span>Crop</span>
        </button>
    </div>
  );
};

export default EasyCrop;