import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import axios from "axios";
import { useState } from "react";
import { BiVideoPlus } from "react-icons/bi";
import { FiX, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";
import { API_HEAD } from "@/lib/utils";

const PreviewVideo = ({ src }: { src: string }) => {
  const [videoRatio, setVideoRatio] = useState<string | undefined>();
  return (
    <video
      src={src}
      className="w-full rounded-md"
      style={{
        objectFit: "contain",
        backgroundColor: "black",
        aspectRatio: videoRatio || "auto",
        maxHeight: "350px"
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

const ShortsForm = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
}) => {
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const { onSubmit, isLoading } = useFormSubmit("/posts/", "post");

  const handleTextareaInput = (event: any) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleVideoUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingVideo(true);
      const toastId = toast.loading("Uploading Short video...");

      const videoData = new FormData();
      videoData.append("file", file);
      videoData.append("upload_preset", "ml_default");
      videoData.append("folder", `ndy/posts/${user?.userName}/shorts`);

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wk2/video/upload",
        videoData
      );

      const uploadedUrl = uploadResponse.data.secure_url;
      setVideoUrl(uploadedUrl);
      toast.success("Video uploaded successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Error uploading short video");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleRemoveCldVideo = async () => {
    if (!videoUrl) return;
    try {
      await axios.get(`${API_HEAD}/images/deleteImage?imageUrl=${videoUrl}`);
      setVideoUrl(null);
      toast.success("Video removed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting video");
    }
  };

  const handleShortCreate = async () => {
    if (!videoUrl) {
      toast.error("Please upload a video to create a Short!");
      return;
    }
    
    // A Short is sent exactly like a Post with 1 image (video url)
    const payloadToSend = {
      description,
      images: [videoUrl],
    };

    onSubmit(payloadToSend, () => {
      setVideoUrl(null);
      setDescription("");
      setOpen(false);
    });
  };

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[40%] max-h-[90%] bg-white rounded-xl shadow-2xl flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center justify-between border-b px-6 py-5 bg-gray-50/30">
              <h1 className="text-xl font-bold">Upload a Short</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-500 hover:text-black transition-colors"
                onClick={() => setOpen(false)}
              />
            </div>
            
            <div className="flex flex-col gap-4 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-textarea mt-1 p-3 border border-gray-200 rounded-lg h-auto w-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none text-[15px]"
                  placeholder="Caption your short..."
                  style={{ height: textareaHeight }}
                  rows={3}
                  onInput={handleTextareaInput}
                ></textarea>

                {videoUrl ? (
                  <div className="relative w-full rounded-xl overflow-hidden border bg-black flex justify-center">
                    <PreviewVideo src={videoUrl} />
                    <button
                        className="absolute top-3 right-3 bg-black/50 p-1.5 backdrop-blur-md rounded-full text-white/80 hover:text-red-500 hover:bg-black/70 transition-all z-10"
                        onClick={handleRemoveCldVideo}
                        title="Remove video"
                    >
                        <FiXCircle className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/80 hover:bg-gray-50 transition-colors">
                    <label
                      htmlFor="shortVideoInput"
                      className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-6 gap-3 group"
                    >
                      <input
                        type="file"
                        id="shortVideoInput"
                        accept="video/*"
                        style={{ display: "none" }}
                        onChange={handleVideoUpload}
                        disabled={isUploadingVideo}
                      />
                      {isUploadingVideo ? (
                        <div className="flex flex-col items-center gap-3">
                           <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                           <span className="text-sm font-semibold text-gray-600 font-mono">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <div className="p-4 bg-red-50 text-red-500 rounded-full group-hover:bg-red-100 group-hover:scale-105 transition-all">
                             <BiVideoPlus className="w-10 h-10" />
                          </div>
                          <div className="flex flex-col items-center gap-1">
                             <span className="text-[16px] font-semibold text-gray-700">Select short video</span>
                             <span className="text-[13px] text-gray-400">MP4, WebM, MOV below 50MB</span>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t px-6 py-4 mt-2 bg-gray-50/50">
                <button
                   className="px-5 py-2 font-medium text-gray-500 hover:text-black transition-colors"
                   onClick={() => setOpen(false)}
                   disabled={isLoading || isUploadingVideo}
                >
                    Cancel
                </button>
                <FormButton 
                    onClick={handleShortCreate} 
                    type="submit" 
                    text="Upload Short" 
                    isLoading={isLoading} 
                />
            </div>

          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default ShortsForm;
