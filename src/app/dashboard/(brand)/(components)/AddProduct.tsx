import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiX, FiXCircle } from "react-icons/fi";

const AddProduct = ({ open, setOpen, user } : { open: boolean, setOpen: (open: boolean) => void, user: any }) => {
  const [userData, setUserData] = useState(user);
  const [images, setImages] : any = useState([]);
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

  const handleAddProduct = (data : any) => {
    
  };

  const handleImageChange = (e : any) => {
    const files = Array.from(e.target.files);
    setImages((prevImages : any) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index : number) => {
    const imageUrl = URL.createObjectURL(images[index]);
    URL.revokeObjectURL(imageUrl);
    setImages((prevImages : any) => prevImages.filter((_ : any, i : number) => i !== index));
  };

  const handleImages = async (images : any) => {
    try{
      const imageUrls = [];

      for(let i=0; i<images.length; i++){
        const image = images[i];
        console.log("image while uploading", image);

        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("upload_preset", "ml_default");
        imageData.append("folder", `ndy/${userData?.name}/${watch('name')}`);

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
          imageData
        )

        const imageUrl = uploadResponse.data.secure_url;
        imageUrls.push(imageUrl);
      }
      return imageUrls;

    }

    catch(err){
      console.error("Error uploading images to Cloudinary:", err);
    }
  }



  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Product</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            <form
              onSubmit={handleSubmit(handleAddProduct)}
              className="flex flex-col gap-6 overflow-scroll"
            >
              <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">
                    Add New Product
                  </h2>

                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        placeholder="Product Name"
                        id="productName"
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        {...register("name", { required: true })}
                      />
                      {errors.name && <p>Actual Price is required.</p>}
                    </div>
                    <div className="flex justify-between gap-6 items-center">
                      <div className="w-full">
                        <label htmlFor="actualPrice">Actual Price</label>
                        <input
                          type="text"
                          placeholder="Actual Price"
                          id="actualPrice"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("actualPrice", { required: true })}
                        />
                        {errors.name && <p>Product Name is required.</p>}
                      </div>
                      <div className="w-full">
                        <label htmlFor="productPrice">Price</label>
                        <input
                          type="number"
                          placeholder="Product Price"
                          id="productPrice"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("price")}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="productDescription">Description</label>
                      <textarea
                        placeholder="Description"
                        id="productDescriptiion"
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        {...register("description")}
                      ></textarea>
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
                        {images.map((image : any, index : number) => (
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
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                <Button
                  variant="destructive"
                  className="px-6 py-2 rounded-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="px-6 bg-primary py-2 rounded-sm font-semibold"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
