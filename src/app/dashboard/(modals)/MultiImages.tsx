import ModalLayout from "@/components/ModalLayout";
import EasyCrop from "@/components/client/EasyCrop";
import { Button } from "@/components/ui/button";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";

const PreviewVideo = ({ src }: { src: string }) => {
  const [videoRatio, setVideoRatio] = useState<string | undefined>();

  return (
    <video
      src={src}
      className="w-full rounded-lg"
      style={{
        objectFit: "contain",
        backgroundColor: "black",
        aspectRatio: videoRatio || "auto",
        maxHeight: "300px"
      }}
      controls
      onLoadedMetadata={(e) => {
        const { videoWidth, videoHeight } = e.currentTarget;
        if (videoWidth && videoHeight) {
          setVideoRatio(`${videoWidth}/${videoHeight}`);
        }
      }}
    />
  );
};
import { BiImageAdd, BiVideoPlus } from "react-icons/bi";
import { FiAlertCircle, FiImage, FiX, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

const MultiImages = ({
  open,
  setOpen,
  handleRemoveImage,
  aspectRatio,
  imageUrls,
  setImageUrls,
  baseUrlPath,
  inSports,
  sportImagePath,
  inVenueImages,
  venueImagePath,
}: any) => {
  const [image, setImage]: any = useState(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const handleVideoUpload = async (file: any) => {
    try {
      setIsUploadingVideo(true);
      const toastId = toast.loading("Uploading video...");

      const videoData = new FormData();
      videoData.append("file", file);
      videoData.append("upload_preset", "ml_default");
      videoData.append("folder", baseUrlPath);

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wk2/video/upload",
        videoData
      );

      const videoUrl = uploadResponse.data.secure_url;

      if (inSports) {
        setImageUrls(sportImagePath, [...imageUrls, videoUrl]);
      } else if (inVenueImages) {
        setImageUrls(venueImagePath, [...imageUrls, videoUrl]);
      } else {
        setImageUrls((prev: any) => [...prev, videoUrl]);
      }
      toast.success("Video uploaded successfully", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error("Error uploading video");
    } finally {
      setIsUploadingVideo(false);
      setImage(null);
    }
  };

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    const file: any = files[0];
    console.log(file);
    if (file && file.type.startsWith("video/")) {
      handleVideoUpload(file);
    } else {
      setImage(file);
    }
  };

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/video/upload/');
  };

  const handleRemoveCldImage = async (imageUrl: string) => {
    try {
      // delete the newly uploaded image as user is terminating the process
      if (imageUrl) {
        await axios.get(`${API_HEAD}/images/deleteImage?imageUrl=${imageUrl}`);
      }
      toast.success("Image deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error deleting image");
    }
  };

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[65%] max-h-[90%] bg-white rounded-md flex flex-col">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Add Media</h1>
              <FiX
                className="w-6 h-6 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="flex flex-col px-6">
              <div className="flex gap-2 ">
                <div className="flex-[8] py-4 flex items-center justify-center">
                  {!image && (
                    <label
                      htmlFor="productImage"
                      className="cursor-pointer flex items-center gap-2 border-gray-300 bg-gray-100 flex-col border border-dashed rounded-xl px-4 py-4 w-[80%]"
                    >
                      <input
                        type="file"
                        id="productImage"
                        accept=".png, .jpg, .jpeg, video/*"
                        style={{ display: "none" }}
                        multiple={false}
                        onChange={handleImageChange}
                        disabled={isUploadingVideo}
                      />
                      <div className="flex items-center flex-col justify-center gap-2 text-sm">
                        {isUploadingVideo ? (
                          <span>Uploading Video...</span>
                        ) : (
                          <>
                            <div className="flex gap-2">
                              <BiImageAdd className="w-6 h-6" />
                              <BiVideoPlus className="w-6 h-6" />
                            </div>
                            Add Photo or Video
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        Photos (.png, .jpg) or Videos (.mp4)
                      </p>
                    </label>
                  )}

                  {image && (
                    <EasyCrop
                      image={URL.createObjectURL(image)}
                      setImage={setImage}
                      aspectRatio={aspectRatio}
                      widthOfImg={"w-96"}
                      heightOfImg={"h-96"}
                      inProductImages={true}
                      imageUrls={imageUrls}
                      setImageUrls={setImageUrls}
                      baseUrlPath={baseUrlPath}
                      inSports={inSports}
                      sportImagePath={sportImagePath}
                      inVenueImages={inVenueImages}
                      venueImagePath={venueImagePath}
                    />
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 flex-[4] px-2 border-l py-2">
                  {imageUrls?.length > 0 ? (
                    <div className="flex flex-col gap-2 overflow-scroll h-[400px] w-full">
                      {[...imageUrls]
                        .reverse()
                        .map((image: any, index: number) => (
                          <div key={index} className="relative w-full">
                            {isVideoUrl(image) ? (
                              <PreviewVideo key={index} src={image} />
                            ) : (
                              <img
                                key={index}
                                src={image}
                                alt=""
                                className="w-full rounded-lg"
                              />
                            )}
                            <FiXCircle
                              className="absolute w-6 h-6 top-2 right-2 bg-white rounded-full cursor-pointer text-red-500"
                              onClick={async () => {
                                await handleRemoveCldImage(image);
                                handleRemoveImage(
                                  setImageUrls,
                                  imageUrls?.length - index - 1,
                                );
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center flex-col gap-2">
                      <FiImage className="w-10 h-10 text-gray-200" />
                      <div className="text-gray-400 text-sm gap-2 w-full flex items-center justify-center">
                        <FiAlertCircle />
                        No images selected
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
              <Button
                className="px-6 bg-primary py-2 rounded-sm font-semibold"
                onClick={() => setOpen(false)}
                type="button"
              >
                Done
              </Button>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default MultiImages;
