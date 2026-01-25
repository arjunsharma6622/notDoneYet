import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FiX, FiYoutube } from "react-icons/fi";
import { toast } from "sonner";
import { mutate } from "swr";
import MultiImages from "./MultiImages";
import { extractYouTubeVideoId, isValidYouTubeUrl } from "@/utils/youtubeUtils";

const PostForm = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
}) => {
  const [imagesOpen, setImagesOpen] = useState(false);
  const [images, setImages]: any = useState([]);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [imageUrls, setImageUrls] = useState([]);
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>([]);
  const [youtubeInput, setYoutubeInput] = useState("");

  const [postData, setPostData] = useState({
    description: "",
    images: [],
  });

  const handleTextareaInput = (event: any) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const {onSubmit, isLoading} = useFormSubmit("/posts/", "post");

  const handleAddYouTubeUrl = () => {
    if (!youtubeInput.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    const videoId = extractYouTubeVideoId(youtubeInput);
    if (!videoId) {
      toast.error("Invalid YouTube URL. Please enter a valid YouTube Shorts or video URL");
      return;
    }

    if (youtubeUrls.includes(videoId)) {
      toast.error("This video is already added");
      return;
    }

    setYoutubeUrls([...youtubeUrls, videoId]);
    setYoutubeInput("");
    toast.success("YouTube video added");
  };

  const handlePostCreate = async () => {
      postData.images = imageUrls;
      const payloadToSend = {
          ...postData,
          youtubeVideos: youtubeUrls,
      }
      onSubmit(payloadToSend, (updatedData) => {
        setImages([]);
        setImageUrls([]);
        setYoutubeUrls([]);
        setYoutubeInput("");
        setPostData({ description: "", images: [] });
        setOpen(false);
        // Trigger feed refresh
        mutate("/posts/user/recommendedPosts");
      })
  };

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Create New Post</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className=" flex flex-col gap-2  overflow-scroll">
              <div className="px-6">
                <div className="border rounded-md p-3 flex flex-col gap-3 overflow-y-scroll">
                  <div className="overflow-y-scroll">
                    <textarea
                      id="description"
                      name="description"
                      value={postData.description}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          description: e.target.value,
                        })
                      }
                      className="form-textarea mt-1 h-auto w-full focus:outline-none resize-none"
                      placeholder="Whats on your mind?"
                      style={{ height: textareaHeight }}
                      rows={3}
                      onInput={handleTextareaInput}
                    ></textarea>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {imageUrls.map((image: any, index: number) => (
                        <div key={index} className="relative w-1/4 h-1/4">
                          <img
                            src={image}
                            alt="Post"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div
                      onClick={() => setImagesOpen(true)}
                      className="w-fit flex items-center gap-2 cursor-pointer overflow-y-scroll"
                    >
                      <BiImageAdd className="w-6 h-6" />
                      <span className="text-xs text-gray-500">
                        Add Images to your post
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div
                        className="w-fit flex items-center gap-2 cursor-pointer"
                      >
                        <FiYoutube className="w-6 h-6 text-red-600" />
                        <span className="text-xs text-gray-500">
                          Add YouTube Shorts/Reels
                        </span>
                      </div>

                      {/* YouTube URL Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Paste YouTube Shorts or video URL"
                          value={youtubeInput}
                          onChange={(e) => setYoutubeInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddYouTubeUrl();
                            }
                          }}
                          className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                          onClick={handleAddYouTubeUrl}
                          disabled={!youtubeInput.trim()}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm transition-colors"
                        >
                          Add
                        </button>
                      </div>

                      {/* Display added YouTube videos */}
                      {youtubeUrls.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2">
                          {youtubeUrls.map((videoId, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                            >
                              <div className="flex items-center gap-2 flex-1">
                                <FiYoutube className="w-4 h-4 text-red-600" />
                                <span className="text-xs text-gray-600 truncate">
                                  YouTube Video {index + 1} (ID: {videoId.substring(0, 8)}...)
                                </span>
                              </div>
                              <button
                                onClick={() => setYoutubeUrls(youtubeUrls.filter((_, i) => i !== index))}
                                className="text-red-600 hover:text-red-700 p-1"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {imagesOpen && (
                    <div className="absolute">
                      <MultiImages
                        open={imagesOpen}
                        setOpen={setImagesOpen}
                        setImages={setImages}
                        aspectRatio={2 / 1}
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                        baseUrlPath={`ndy/posts/${user?.userName}`}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                <FormButton onClick={handlePostCreate} type="submit" text="Create Post" isLoading={isLoading} />
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default PostForm;
