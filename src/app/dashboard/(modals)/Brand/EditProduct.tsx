"use client"

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { API_HEAD, categories, genders } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiImage, FiX, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";
import SizeQty from "./SizeQty";
import MultiImages from "../MultiImages";
import ModalLayout from "@/components/ModalLayout";

const EditProduct = ({
  open,
  setOpen,
  user,
  product
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
  product: any;
}) => {
  const [userData, setUserData] = useState(user);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const [croppedFiles, setCroppedFiles] = useState<File[]>([]);

  const [imagesOpen, setImagesOpen] = useState(false);

  const [sizes, setSizes] = useState<string[]>(product.sizes);
  const [stock, setStock] = useState<{ size: string; quantity: number }[]>(product.stock);


  const [productData, setProductData] : any = useState<any>(product);

  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prevData : any) => ({ ...prevData, [name]: value }));
  };


  const handleRemoveImage = (index: number) => {
    setCroppedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setCroppedFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const handleImages = async (images: File[]) => {
    try {
      const imageUrls = await Promise.all(
        croppedFiles.map(async (image) => {
          const imageData = new FormData();
          imageData.append("file", image);
          imageData.append("upload_preset", "ml_default");
          imageData.append(
            "folder",
            `ndy/${userData?.name}/${productData?.name}/product`
          );

          const uploadResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
            imageData
          );

          return uploadResponse.data.secure_url;
        })
      );
      return imageUrls;
    } catch (err) {
      console.error("Error uploading images to Cloudinary:", err);
      throw new Error("Error uploading images to Cloudinary");
    }
  };



  const handleAddProduct = async () => {
    try {
      let imageUrls = []
      if(croppedFiles.length > 0) {
        imageUrls = await handleImages(croppedFiles);
      }
      await handleImages(croppedFiles);
      await axios.put(`${API_HEAD}/product/${product._id}`, {
        ...productData,
        images: [...productData.images, ...imageUrls],
        user: userData?._id,
        stock: stock,
        sizes: sizes,
      });
      toast.success("Product added successfully");
      setOpen(false);
    } catch (err : any) {
      console.error("Error Adding Product", err);
      toast.error(`Error adding product ${err.message}`);
    }
  };

  return (
    <div>
      {open && (
        <ModalLayout>
        <div className="w-[95%] md:w-[70%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
          <div className="flex items-center justify-between border-b px-6 py-5">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <FiX
              className="cursor-pointer h-6 w-6 text-gray-600"
              onClick={() => setOpen(false)}
            />
          </div>
          {/* form */}
            <div
              className="flex flex-col gap-6 overflow-scroll px-6 py-4"
            >
              <div className="flex flex-col gap-6 overflow-y-scroll">
                <h2 className="text-xl font-semibold underline">Add New Product</h2>

                <div className="flex flex-col gap-4">
                  <div className="w-full">
                    <label htmlFor="productName">Product Name</label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      id="productName"
                      name="name"
                      value={productData?.name}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                  <div className="flex justify-between gap-6 items-center">
                    <div className="w-full">
                      <label htmlFor="originalPrice">Original Price</label>
                      <input
                        type="number"
                        placeholder="Original Price"
                        id="originalPrice"
                        name="originalPrice"
                        value={productData?.pricing?.originalPrice}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        onChange={(e) => {setProductData((prevData : any) => ({ ...prevData, pricing: { ...prevData.pricing, originalPrice: parseInt(e.target.value) || 0 } }));}}
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="presentPrice">Price</label>
                      <input
                        type="number"
                        placeholder="Present Price"
                        id="presentPrice"
                        name="presentPrice"
                        value={productData?.pricing?.presentPrice}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        onChange={(e) => {setProductData((prevData : any) => ({ ...prevData, pricing: { ...prevData.pricing, presentPrice: parseInt(e.target.value) || 0 } }));}}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="productDescription">Description</label>
                    <textarea
                      placeholder="Description"
                      id="productDescription"
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      name="description"
                      value={productData?.description}
                      onChange={(e) => handleOnChange(e)}
                    ></textarea>
                  </div>

                  <div className="flex justify-between gap-6 items-center">
                    <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="category">Select Category</label>
                      <Select value={productData?.category} onValueChange={(value) => setProductData({ ...productData, category: value })}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="gender">Select Gender</label>
                      <Select value={productData?.gender} onValueChange={(value) => setProductData({ ...productData, gender: value })}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            {genders.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>Sizes and Quantity</p>
                    {productData?.category && (
                      <SizeQty category={productData.category} sizes={sizes} setSizes={setSizes} stock={stock} setStock={setStock} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>Images</p>

                    <div
                      onClick={() => {setImagesOpen(true); console.log("Clicked the main images button")}}
                      className="flex items-center gap-2 border border-gray-300 border-dashed rounded-lg w-fit px-4 py-2 cursor-pointer bg-gray-50"
                    >
                      Add
                      <FiImage className="w-5 h-5" />
                    </div>

                    {imagesOpen && (
                      <div className="">
                        <MultiImages
                          croppedImages={croppedImages}
                          setCroppedImages={setCroppedImages}
                          open={imagesOpen}
                          setOpen={setImagesOpen}
                          handleRemoveImage={handleRemoveImage}
                          croppedFiles={croppedFiles}
                          setCroppedFiles={setCroppedFiles}
                          aspectRatio={3 / 4}
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-2">
                      {croppedImages.map((image, index) => (
                        <div key={index} className="relative w-1/4 h-1/4">
                          <img
                            src={image}
                            alt="Post"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <div className="flex items-center gap-4 absolute top-2 right-2 bg-gray-100/90 shadow-md rounded-md px-2 py-[5px]">
                            <div
                              onClick={() => handleRemoveImage(index)}
                              className="text-red-500 flex items-center gap-1 text-xs cursor-pointer"
                            >
                              <FiXCircle className="w-4 h-4 rounded-full " />
                              <span>Remove</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2"> 
                      {productData?.images.map((image : any, index : number) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt="Post"
                            className="w-full h-full object-cover rounded-md"
                            loading="lazy"
                          />
                          {/* <div className="flex items-center gap-4 absolute top-2 right-2  bg-gray-100/90 shadow-md rounded-md px-2 py-[5px]">
                            <div
                              onClick={() => handleRemoveImage(index)}
                              className="text-red-500 flex items-center gap-1 text-xs cursor-pointer"
                            >
                              <FiXCircle className="w-4 h-4 rounded-full " />
                              <span>Remove</span>
                            </div>
                          </div> */}
                        </div>
                      ))}
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
                  onClick={handleAddProduct}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
          </ModalLayout>
      )}
    </div>
  );
};

export default EditProduct;
