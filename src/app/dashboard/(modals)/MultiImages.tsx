import EasyCrop from "@/components/client/EasyCrop";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FiAlertCircle, FiImage, FiInfo, FiX, FiXCircle } from "react-icons/fi";

const MultiImages = ({
  open,
  setOpen,
  croppedImages,
  setCroppedImages,
  handleRemoveImage,
  croppedFiles,
  setCroppedFiles,
  aspectRatio
}: any) => {
  const [croppedImage, setCroppedImage]: any = useState(null);
  const [croppedFile, setCroppedFile]: any = useState(null);
  const [image, setImage]: any = useState(null);

  // adding cropped images to croppedImages when ever there is croppedImage
  useEffect(() => {
    if (croppedImage) {
      setCroppedImages([...croppedImages, croppedImage]);
    }
  }, [croppedImage, setCroppedImages, croppedImages]);

  useEffect(() => {
    if(croppedFile){
        setCroppedFiles([...croppedFiles, croppedFile]);
    }
  }, [croppedFile, setCroppedFiles, croppedFiles]);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    const file = files[0];
    setImage(file);
  };

    

  return (
    <div>
      {open && (
        <div className=" fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-filter backdrop-blur-sm z-[45]">
          <div className="w-[95%] md:w-[65%] max-h-[90%] bg-white rounded-md flex flex-col">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Add Images</h1>

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
                        accept=".png, .jpg, .jpeg"
                        style={{ display: "none" }}
                        multiple={false}
                        onChange={handleImageChange}
                      />
                      <div className="flex items-center flex-col justify-center gap-2 text-sm">
                      <BiImageAdd className="w-6 h-6" />
                      Add Product Image
                      </div>
                      <p className="text-xs text-gray-400">
                        Only .png, .jpg, .jpeg files are allowed
                      </p>
                    </label>
                  )}

                  {image && (
                    <EasyCrop
                      image={URL.createObjectURL(image)}
                      setImage={setImage}
                      setCroppedImage={setCroppedImage}
                      croppedImage={croppedImage}
                      aspectRatio={aspectRatio}
                      widthOfImg={"w-96"}
                      heightOfImg={"h-96"}
                      inProductImages={true}
                      croppedFile={croppedFile}
                      setCroppedFile={setCroppedFile}
                    />
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 flex-[4] px-2 border-l py-2">
                    { croppedImages.length > 0 ?
                  <div className="flex flex-col gap-2 overflow-scroll h-[400px] w-full">
                    {[...croppedImages].reverse().map((image: any, index: number) => (
                      <div key={index} className="relative w-full">
                        <img
                          key={index}
                          src={image}
                          alt=""
                          className="w-full rounded-lg"
                        />
                        <FiXCircle
                          className="absolute w-6 h-6 top-2 right-2 bg-white rounded-full cursor-pointer text-red-500"
                          onClick={() => handleRemoveImage(index)}
                        />
                      </div>
                    ))}
                  </div>

                  :
                  <div className="flex items-center justify-center flex-col gap-2">
                    <FiImage className="w-10 h-10 text-gray-200" />
                  <div className="text-gray-400 text-sm gap-2 w-full flex items-center justify-center">
                    <FiAlertCircle />
                    No images selected
                </div>
                </div>
}
                </div>
              </div>
            </div>


            <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                <Button
                  variant="destructive"
                  className="px-6 py-2 rounded-sm font-semibold"
                  onClick={() => {setCroppedImage(null); setImage(null); setCroppedImages([]); setOpen(false)}}
                >
                  Cancel
                </Button>
                <Button
                  className="px-6 bg-primary py-2 rounded-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Done
                </Button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImages;
