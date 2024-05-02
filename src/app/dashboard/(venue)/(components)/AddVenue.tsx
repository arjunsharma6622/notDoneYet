import axios from "axios";
import "moment/locale/en-gb";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiX, FiXCircle } from "react-icons/fi";

const AddVenue = ({
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
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [images, setImages]: any = useState([]);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    setImages((prevImages: any) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    const imageUrl = URL.createObjectURL(images[index]);
    URL.revokeObjectURL(imageUrl);
    setImages((prevImages: any) =>
      prevImages.filter((_: any, i: number) => i !== index)
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
        imageData.append("folder", `ndy/${user?.name}/${watch("name")}`);

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
          imageData
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

  const handleAddVenue = async (data: any) => {
    try {
      const imageUrls = await handleImages(images);
      console.log("In handle add venue");
      console.log(data);

      const res = await axios.post("/api/venue", {
        ...data,
        owner: user._id,
        images: imageUrls,
      });

      console.log("Venue added successfully");
      console.log(res.data);

      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Add New Venue</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <form
              onSubmit={handleSubmit(handleAddVenue)}
              className="flex flex-col gap-6 overflow-scroll"
            >
              <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">
                    Venue Details
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-6 items-center">
                      <div className="w-full">
                        <label htmlFor="venueName">Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          id="venueName"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("name", { required: true })}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="venueCity">City</label>
                        <input
                          type="text"
                          placeholder="City"
                          id="venueCity"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("location.city", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between gap-6 items-center">
                      <div className="w-full">
                        <label htmlFor="venueState">State</label>
                        <input
                          type="text"
                          placeholder="State"
                          id="venueState"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("location.state", { required: true })}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="venueCountry">Country</label>
                        <input
                          type="text"
                          placeholder="Country"
                          id="venueCountry"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("location.country", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between gap-6 items-center">
                      <div className="w-full">
                        <label htmlFor="venueAddress">Address</label>
                        <input
                          type="text"
                          placeholder="Address"
                          id="venueAddress"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("location.address", { required: true })}
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="venueZipCode">Zip Code</label>
                        <input
                          type="number"
                          placeholder="Zip Code"
                          id="venueZipCode"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("location.zipCode", { required: true })}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="venueGoogleMapsLink">
                        Google Maps Link
                      </label>
                      <input
                        type="text"
                        placeholder="Google Maps Link"
                        id="venueGoogleMapsLink"
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        {...register("googleMapsLink", { required: true })}
                      />
                      {errors.googleMapsLink && (
                        <p>Google Maps Link is required.</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="venueDescription">Description</label>
                      <textarea
                        placeholder="Description"
                        id="venueDescription"
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        {...register("description", { required: true })}
                      ></textarea>
                      {errors.description && <p>Description is required.</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="venueImages">Images</label>

                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="postImage"
                          className="cursor-pointer overflow-y-scroll flex items-center gap-2"
                        >
                          Add
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

                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-semibold underline">
                        Venue Timings
                      </h2>
                      <div className="flex items-center gap-4">
                        <div>
                          <label htmlFor="venueStartTime">Start Time</label>
                          <input
                            type="time"
                            id="venueStartTime"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("timing.startTime", {
                              required: true,
                            })}
                          />
                        </div>
                        <div>
                          <label htmlFor="venueCloseTime">End Time</label>
                          <input
                            type="time"
                            id="venueCloseTime"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("timing.endTime", { required: true })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                <button
                  className="px-6 py-2 rounded-sm font-semibold bg-gray-200 text-gray-600"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 bg-primary py-2 rounded-sm font-semibold text-white"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVenue;