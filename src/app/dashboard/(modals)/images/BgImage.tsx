import EasyCrop from "@/components/client/EasyCrop";
import { Button } from "@/components/ui/button";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { useState } from "react";
import { FiImage, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

const BgImage = ({
  user,
  backgroundImage,
  setBackgroundImage,
  setOpen,
}: any) => {
  const [bgImage, setBgImage]: any = useState(null);

  const handleBgImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    setBgImage(files[0]);
  };

  const handleSaveImage = async () => {
    try {
      // delete the previous image first
      if (user?.backgroundImg) {
        await axios.get(
          `${API_HEAD}/images/deleteImage?imageUrl=${user?.backgroundImg}`,
        );
      }
      // then save the new image url to the database
      await axiosInstance.patch(`/user/`, {
        backgroundImg: backgroundImage,
      });
      setBackgroundImage(null);
      toast.success("Image uploaded successfully");
      setOpen(false);
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
    }
  };

  const handleTerminateSaveImage = async () => {
    try {
      // delete the newly uploaded image as user is terminating the process
      if (backgroundImage) {
        await axios.get(
          `${API_HEAD}/images/deleteImage?imageUrl=${backgroundImage}`,
        );
      }

      toast.success("Image deleted successfully");
      setBackgroundImage(null);
      setBgImage(null);
    } catch (err) {
      console.log(err);
      toast.error("Error deleting image");
    }
  };

  return (
    <div>
      {user?.backgroundImg && !backgroundImage && !bgImage && (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="w-full relative">
              <img
                src={user?.backgroundImg}
                alt="profile"
                className=" aspect-[4/1] object-cover w-full rounded-lg"
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
                onChange={(e: any) => handleBgImageChange(e)}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-4  rounded-lg">
        {bgImage && (
          <div className="w-full">
            <div className="w-full relative">
              <EasyCrop
                image={URL.createObjectURL(bgImage)}
                setImage={setBgImage}
                aspectRatio={4 / 1}
                widthOfImg={`w-[600px]`}
                inProfileImages={true}
                baseUrlPath={`ndy/users/${user?._id}/profileImages`}
                setProfileImage={setBackgroundImage}
              />
            </div>
          </div>
        )}

        {backgroundImage && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full">
              <div className="w-full relative shadow-lg">
                <img
                  src={backgroundImage}
                  alt="profile"
                  className="w-full rounded-lg"
                />
              </div>

              <FiXCircle
                className="w-6 h-6 z-20 absolute top-2 right-2 cursor-pointer bg-red-200 rounded-full text-red-500 "
                onClick={handleTerminateSaveImage}
              />
            </div>

            <Button onClick={handleSaveImage}>Save / Upload</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BgImage;
