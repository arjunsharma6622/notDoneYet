import { createPost } from "@/actions/posts";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FiX, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";
import MultiImages from "./MultiImages";

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
  const [croppedImages, setCroppedImages] = useState([]);
  const [croppedFiles, setCroppedFiles] = useState([]);
  const [images, setImages]: any = useState([]);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  
  const [postData, setPostData] = useState({
    description: "",
    images: [],
  });

  const handleTextareaInput = (event: any) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRemoveImage = (index: number) => {
    setCroppedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setCroppedFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const handleImages = async (images: Array<File>) => {
    try {
      const imageUrls = [];

      for (let i = 0; i < croppedFiles.length; i++) {
        const image = croppedFiles[i];
        console.log("image while uploading", image);

        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("upload_preset", "ml_default");
        imageData.append("folder", `ndy/posts`);

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
          imageData,
        );

        console.log(uploadResponse.data);
        const imageUrl = uploadResponse.data.secure_url;
        imageUrls.push(imageUrl);
      }

      return imageUrls;
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
    }
  };

  const handlePostCreate = async () => {
    try {
      const imageUrls : any = await handleImages(images);

      postData.images = imageUrls;
      console.log("Data with images", postData);
      await createPost({ ...postData, user: user._id });
      setImages([]);
      setCroppedImages([]);
      setCroppedFiles([]);
      toast.success("Post created successfully");
      setOpen(false);
      window.location.reload();
    } catch (err) {
      toast.error("Error creating post");
      console.error("Error uploading images:", err);
    }
  };


  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Create New Post</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <div
              className=" flex flex-col gap-2  overflow-scroll"
            >
              <div className="px-6">
                <div className="border rounded-md p-3 flex flex-col gap-3 overflow-y-scroll">
                  <div className="overflow-y-scroll">
                    <textarea
                      id="description"
                      name="description"
                      value={postData.description}
                      onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                      className="form-textarea mt-1 h-auto w-full focus:outline-none resize-none"
                      placeholder="Whats on your mind?"
                      style={{ height: textareaHeight }}
                      rows={3}
                      onInput={handleTextareaInput}
                    ></textarea>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {croppedFiles.map((image: any, index: number) => (
                        <div key={index} className="relative w-1/4 h-1/4">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Post"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <FiXCircle
                            className="absolute w-5 h-5 top-0 right-0 m-2 text-red-500  rounded-full cursor-pointer"
                            onClick={() => handleRemoveImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                    <div
                      onClick={() => setImagesOpen(true)}
                      className="w-fit flex items-center gap-2 cursor-pointer overflow-y-scroll"
                    >
                      <BiImageAdd className="w-6 h-6" />
                      <span className="text-xs text-gray-500">Add Images to your post</span>
                    </div>

                    {imagesOpen && (
                      <div className="absolute">
                        <MultiImages
                          open={imagesOpen}
                          setOpen={setImagesOpen}
                          setImages={setImages}
                          croppedImages={croppedImages}
                          setCroppedImages={setCroppedImages}
                          croppedFiles={croppedFiles}
                          setCroppedFiles={setCroppedFiles}
                          handleRemoveImage={handleRemoveImage}
                          aspectRatio={2/1}
                        />
                      </div>
                    )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                <button
                  onClick={handlePostCreate}
                  className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
