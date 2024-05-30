"use client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import BgImage from "./BgImage";
import ProfileImage from "./ProfileImage";
import ModalLayout from "@/components/ModalLayout";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

const ImageEdit = ({ open, setOpen, user }: any) => {
  const [selectedSection, setSelectedSection] = useState("profileImage");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleTerminateSaveImage = async () => {
    try {
      if (backgroundImage) {
        await axios.get(
          `${API_HEAD}/images/deleteImage?imageUrl=${backgroundImage}`,
        );
        toast.success("Image(s) deleted successfully");
      }
      if (profileImage) {
        await axios.get(
          `${API_HEAD}/images/deleteImage?imageUrl=${profileImage}`,
        );
        toast.success("Image(s) deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting image");
    }
  };

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Edit Images</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={async () => {
                  await handleTerminateSaveImage();
                  setOpen(false);
                }}
              />
            </div>

            <div className="px-6 flex flex-col gap-4">
              <div className="flex items-center space-x-4 text-sm border-b pb-2">
                <div
                  className={`cursor-pointer py-2 px-4 rounded-md ${selectedSection === "profileImage" ? "bg-primary text-white" : "text-black"}`}
                  onClick={() => setSelectedSection("profileImage")}
                >
                  Profile Image
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div
                  className={`cursor-pointer py-2 px-4 rounded-md ${selectedSection === "backgroundImage" ? "bg-primary text-white" : "text-black"}`}
                  onClick={() => setSelectedSection("backgroundImage")}
                >
                  Background Image
                </div>
              </div>

              {selectedSection === "profileImage" && (
                <ProfileImage
                  setOpen={setOpen}
                  user={user}
                  profileImage={profileImage}
                  setProfileImage={setProfileImage}
                />
              )}

              {selectedSection === "backgroundImage" && (
                <BgImage
                  setOpen={setOpen}
                  user={user}
                  backgroundImage={backgroundImage}
                  setBackgroundImage={setBackgroundImage}
                />
              )}
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default ImageEdit;
