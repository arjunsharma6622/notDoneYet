import EasyCrop from "@/components/client/EasyCrop";
import { Button } from "@/components/ui/button";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { FiImage, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

const BgImage = ({ user }: any) => {
  const [bgImage, setBgImage]: any = useState(null);
  const [bgImageToShow, setBgImageToShow]: any = useState(null);
  const [bgCroppedImage, setBgCroppedImage] = useState(null);

  const handleCroppedImage: any = (img: any) => {
    setBgImage(img);
    setBgImageToShow(img);
  };

  const handleBgImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    setBgImageToShow(URL.createObjectURL(files[0] as Blob));
    setBgImage(files[0]);
  };

  const handleSaveImage = async () => {
    try {
      const imageData = new FormData();
      imageData.append("file", bgImage);
      imageData.append("upload_preset", "ml_default");
      imageData.append("folder", `ndy/users/${user?._id}`);

      const uploadResponse: any = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
        imageData
      );
      const imageUrl = uploadResponse?.data?.secure_url;

      setBgCroppedImage(null);
      setBgImage(null);
      setBgImageToShow(null);

      await axios.patch(`${API_HEAD}/user/${user?._id}`, { backgroundImg: imageUrl });

      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
    }
  };
  return (
    <div>
      {user?.backgroundImg && !bgImage && (
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
        {bgImage && !bgCroppedImage && (
          <div className="w-full">
            <div className="w-full relative">
              <EasyCrop
                image={bgImageToShow}
                setImage={handleCroppedImage}
                aspectRatio={4 / 1}
                widthOfImg={`w-[600px]`}
                setCroppedImage={setBgCroppedImage}
                croppedImage={bgCroppedImage}
              />
            </div>
          </div>
        )}

        {bgCroppedImage && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full">
              <div className="w-full relative shadow-lg">
                <img
                  src={bgCroppedImage}
                  alt="profile"
                  className="w-full rounded-lg"
                />
              </div>

              <FiXCircle
                className="w-6 h-6 z-20 absolute top-2 right-2 cursor-pointer bg-red-200 rounded-full text-red-500 "
                onClick={() => {
                  setBgImage(null);
                  setBgCroppedImage(null);
                  setBgImageToShow(null);
                }}
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
