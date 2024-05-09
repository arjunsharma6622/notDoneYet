"use client"

import { updateUser } from "@/actions/updateUser";
import EasyCrop from "@/components/client/EasyCrop";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { FiImage, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

const ProfileImage = ({user} : any) => {

  const [image, setImage ] : any = useState(null);
  const [imageToShow, setImageToShow] :  any = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    setImageToShow(URL.createObjectURL(files[0] as Blob));
    setImage(files[0]);
}

  const handleCroppedImage : any = (img: any) => {
    setImage(img);
    setImageToShow(img);
}


const handleSaveImage = async () => {
  try{
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "ml_default");
    imageData.append("folder", `ndy/users/${user?._id}`);

    const uploadResponse : any = await axios.post(
      "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
      imageData,
    );
    const imageUrl = uploadResponse?.data?.secure_url;

    setUploadedImage(imageUrl);
    setCroppedImage(null)
    setImage(null)
    setImageToShow(null)

    await axios.patch(`/api/user/${user?._id}`, {image: imageUrl});

    toast.success("Image uploaded successfully");
  } catch (err) {
    console.error("Error uploading images to Cloudinary:", err);
  }
}

  return (
    <div className="flex flex-col gap-4">
    {user?.image && !image && (
        <div className="flex flex-col gap-4">
        <div className="relative">
            <div className="w-fit relative rounded-full shadow-lg">
                <img src={user?.image} alt="profile" className="w-44 rounded-full"/>
            </div>
        </div>

<div className="border-dashed border rounded-lg w-fit px-4 py-2">
<label htmlFor="imageFile" className="cursor-pointer ">
    <div className="flex items-center justify-center gap-2">
    <FiImage className="w-6 h-6 text-gray-600"/>
    <span className="text-gray-600 text-sm">Upload New Image</span>
    </div>
    <input type="file" id="imageFile" onChange={(e : any) => handleImageChange(e)} className="hidden"/>
</label>
</div>

</div>
    )}

      <div className="flex gap-4 mb-4  rounded-lg">

        {image && (
          <div>
            <div className="w-fit relative">
              <EasyCrop
                image={imageToShow}
                setImage={handleCroppedImage}
                aspectRatio={1 / 1}
                widthOfImg={"w-64"}
                setCroppedImage={setCroppedImage}
                croppedImage={croppedImage}
              />

            </div>
          </div>
        )}


{croppedImage && (
    <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-fit relative rounded-full shadow-lg">
              <img src={croppedImage} alt="profile" className="w-44 rounded-full"/>
            </div>

            <FiXCircle
                className="w-6 h-6 z-20 absolute top-2 right-2 cursor-pointer bg-red-200 rounded-full text-red-500 "
                onClick={() => {setImage(null); setCroppedImage(null); setImageToShow(null);}}
              />
          </div>
          <Button onClick={handleSaveImage}>Save / Upload</Button>
          </div>
        )}
      </div>


      </div>  )
}

export default ProfileImage