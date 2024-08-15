"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import getCroppedImg from "./Crop";

const EasyCrop = ({
  image,
  setImage,
  aspectRatio,
  widthOfImg,
  heightOfImg,
  imageUrls,
  setImageUrls,
  baseUrlPath,
  inProfileImages,
  setProfileImage,
  inSports,
  sportImagePath,
  inVenueImages,
  venueImagePath,
}: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const blobUrlToFile = async (url: string, fileName: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const showCroppedImage = useCallback(async () => {
    try {
      if (image !== null) {
        const croppedImageFromCropper = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation,
        );

        setIsUploading(true);

        const file = await blobUrlToFile(
          croppedImageFromCropper as string,
          "crop.png",
        );
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "ml_default");
        imageData.append("folder", baseUrlPath);

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
          imageData,
        );

        const imageUrl = uploadResponse.data.secure_url;

        if (inProfileImages) {
          setProfileImage(imageUrl);
          setImage(null);
        } else if (inSports) {
          setImageUrls(sportImagePath, [...imageUrls, imageUrl]);
          setImage(null);
        } else if(inVenueImages){
          setImageUrls(venueImagePath, [...imageUrls, imageUrl]);
          setImage(null);
        } else {
          setImageUrls((prev: any) => [...prev, imageUrl]);
          setImage(null);
        }
        toast.success("Image uploaded successfully");

        setIsUploading(false);
      }
    } catch (e) {
      setIsUploading(false);
      toast.error("Error uploading image");
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image, setImage]);

  return (
    <div className=" flex flex-col gap-3 items-center justify-center">
      <div
        className="border border-gray-200 rounded-xl"
        style={{
          display: image === null ? "none" : "block",
        }}
      >
        <div
          className={`relative flex justify-center ${widthOfImg} ${heightOfImg ? heightOfImg : "h-64"} aspect-${aspectRatio}`}
        >
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
      type="button"
        className={`bg-blue-600 text-white py-2 px-4 rounded-full ${image === null ? "hidden" : "flex"} items-center justify-center gap-2 w-fit px-6`}
        onClick={() => {
          showCroppedImage();
        }}
        disabled={isUploading}
      >
        {!isUploading ? (
          <>
            <FiUploadCloud className="w-5 h-5" />
            <span>Upload</span>
          </>
        ) : (
          <>
            <Spinner className="w-5 h-5 text-white" />
            <span>Uploading</span>
          </>
        )}
      </button>
    </div>
  );
};

export default EasyCrop;
