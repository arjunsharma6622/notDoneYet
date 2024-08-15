"use client"

import EasyCrop from "@/components/client/EasyCrop";
import { FormButton } from "@/components/ui/FormButton";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { FiImage, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

const ProfileImage = ({user, profileImage, setProfileImage, setOpen} : any) => {
  const [image, setImage ] : any = useState(null);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    setImage(files[0]);
}


const handleSaveImage = async () => {
  try {
    setIsProfileUpdating(true);
    // delete the previous image first
    if (user?.image) {
      await axiosInstance.delete(`/images/deleteImage?imageUrl=${user?.image}`);
    }
    // then save the new image url to the database
    await axiosInstance.patch(`/user/`, { image: profileImage });
    setProfileImage(null)
    toast.success("Image uploaded successfully");
    setOpen(false);
  } catch (err) {
    setIsProfileUpdating(false);
    console.error("Error uploading images to Cloudinary:", err);
  }
  finally{
    setIsProfileUpdating(false);
  }
};


const handleTerminateSaveImage = async () => {
  try{
    // delete the newly uploaded image as user is terminating the process
    if (profileImage) {
      await axiosInstance.delete(`/images/deleteImage?imageUrl=${profileImage}`);
    }

    toast.success("Image deleted successfully");
    setProfileImage(null);
    setImage(null);
  }
  catch(err){
    console.log(err);
    toast.error("Error deleting image");
  }
};


return (
  <div>
    {user?.image && !profileImage && !image && (
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="w-44 relative">
            <img
              src={user?.image}
              alt="profile"
              className="object-cover w-44 rounded-full"
            />
          </div>
        </div>
        <div className="border-dashed border rounded-lg w-fit px-4 py-2">
          <label htmlFor="bgImageFile" className="cursor-pointer ">
            <div className="flex items-center justify-center gap-2">
              <FiImage className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600 text-sm">Upload New Image</span>
            </div>
            <input
              type="file"
              id="bgImageFile"
              onChange={(e: any) => handleImageChange(e)}
              className="hidden"
            />
          </label>
        </div>
      </div>
    )}

    <div className="flex gap-4 mb-4  rounded-lg">
      {image && (
          <div className="w-fit relative">
            <EasyCrop
              image={URL.createObjectURL(image)}
              setImage={setImage}
              aspectRatio={1 / 1}
              widthOfImg={"w-64"}
              inProfileImages={true}
              baseUrlPath={`ndy/users/${user?._id}/profileImages`}
              setProfileImage={setProfileImage}
            />
          </div>
      )}

      {profileImage && (
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-44">
            <div className="w-44 relative rounded-full  shadow-lg">
              <img
                src={profileImage}
                alt="profile"
                className="w-44 rounded-full"
              />
            </div>

            <FiXCircle
              className="w-6 h-6 z-20 absolute top-2 right-2 cursor-pointer bg-red-200 rounded-full text-red-500 "
              onClick={handleTerminateSaveImage}
            />
          </div>

          <FormButton variant="save" className="w-full" isLoading={isProfileUpdating} onClick={handleSaveImage}>Save</FormButton>
        </div>
      )}
    </div>
  </div>
);
}

export default ProfileImage
