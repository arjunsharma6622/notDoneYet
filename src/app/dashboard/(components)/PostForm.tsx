import { createPost } from "@/actions/posts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiX, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

const PostForm = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [images, setImages]: any = useState([]);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    setImages((prevImages: any) => [...prevImages, ...files]);
  };

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
    const imageUrl = URL.createObjectURL(images[index]);
    URL.revokeObjectURL(imageUrl);
    setImages((prevImages: any) =>
      prevImages.filter((_: any, i: number) => i !== index),
    );
  };

  const handleImages = async (images: Array<File>) => {
    try {
      const imageUrls = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
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

  const onSubmit = async (data: any) => {
    try {
      const imageUrls = await handleImages(images);
      console.log("All images uploaded successfully");
      console.log(imageUrls);

      data.images = imageUrls;
      console.log("Data with images", data);
      await createPost({ ...data, user: user._id });
      console.log("Post created successfully");

      setImages([]);
      reset();
      toast.success("Post created successfully");
      setOpen(false);
      window.location.reload();
    } catch (err) {
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-2  overflow-scroll"
            >
              <div className="px-6">
                <div className="border rounded-md p-3 flex flex-col gap-3 overflow-y-scroll">
                  <div className="overflow-y-scroll">
                    <textarea
                      id="description"
                      {...register("description", { required: true })}
                      className="form-textarea mt-1 h-auto w-full focus:outline-none resize-none"
                      placeholder="Whats on your mind?"
                      style={{ height: textareaHeight }}
                      rows={3}
                      onInput={handleTextareaInput}
                    ></textarea>

                    {errors.description && (
                      <p className="text-red-500">This field is required</p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2">
                      {images.map((image: any, index: number) => (
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

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="postImage"
                      className="cursor-pointer overflow-y-scroll"
                    >
                      <input
                        type="file"
                        id="postImage"
                        accept=".png, .jpg, .jpeg"
                        style={{ display: "none" }}
                        multiple
                        onChange={handleImageChange}
                      />
                      <FiImage className="w-5 h-5" />
                    </label>
                    <p className="text-xs text-gray-400">
                      Only .png, .jpg, .jpeg files are allowed
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                <button
                  type="submit"
                  className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
