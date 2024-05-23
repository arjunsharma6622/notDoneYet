import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FiFile, FiImage, FiX } from "react-icons/fi";
import { pdfjs } from "react-pdf";
import { PdfComp } from "./PdfComp";
import axios from "axios";
import { toast } from "sonner";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const AddCertificate = ({ open, setOpen, user }: any) => {
  const [certificateData, setCertificateData] = useState({
    name: "",
    description: "",
    organization: "",
    issueDate: "",
    expiryDate: "",
    certificateDoc: "",
  });

  const [isCertificateUploading, setIsCertificateUploading] = useState(false);
  const [certificateDoc, setCertificateDoc] = useState<any>(null);

  const handleCertificateDocChange = async (event: any) => {
    try {
      setCertificateDoc(event.target.files[0]);
      setIsCertificateUploading(true);
      const imageData = new FormData();
      imageData.append("file", event.target.files[0]);
      imageData.append("upload_preset", "ml_default");
      imageData.append("folder", `ndy/users/${user?._id}`);

      const uploadResponse: any = await axios.post(
        "https://api.cloudinary.com/v1_1/dexnb3wk2/image/upload",
        imageData
      );
      const imageUrl = uploadResponse?.data?.secure_url;
      setCertificateData({ ...certificateData, certificateDoc: imageUrl });
      setIsCertificateUploading(false);
      toast.success("Image uploaded successfully");
    } catch (err) {
      setIsCertificateUploading(false);
      toast.error("Error uploading image");
      console.error("Error uploading images to Cloudinary:", err);
    }
  };

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Add Certificate</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-6 overflow-scroll">
              <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">
                    Add Certificate
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-6 items-center">
                      <div className="w-full">
                        <label htmlFor="certificateName">Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          id="certificateName"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="certificateOrganization">
                          Organization
                        </label>
                        <input
                          type="text"
                          placeholder="Organization"
                          id="certificateOrganization"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full gap-6">
                      <div className="w-full">
                        <label htmlFor="certificateIssueDate">Issue Date</label>
                        <input
                          type="date"
                          id="certificateIssueDate"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="certificateExpiryDate">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          id="certificateExpiryDate"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <span>Add Media</span>
                      <div className="w-full flex flex-col gap-2">
                        {!certificateDoc && (
                          <label
                            htmlFor="cerfificateMedia"
                            className="cursor-pointer border border-dashed rounded-md h-12 px-2 py-1 flex items-center justify-center w-full"
                          >
                            <div className="py-10 flex items-center justify-center gap-2 flex-col">
                              <div className="flex items-center gap-2">
                            <FiImage />
                            <FiFile />
                            </div>
                            <p>Upload</p>
                            </div>
                            <input
                              type="file"
                              id="cerfificateMedia"
                              className="hidden"
                              onChange={(event) =>
                                handleCertificateDocChange(event)
                              }
                            />
                          </label>
                        )}

                        {certificateDoc &&
                          (certificateData?.certificateDoc &&
                          !isCertificateUploading ? (
                            <PdfComp file={certificateData?.certificateDoc} />
                          ) : (
                            <p>Loading...</p>
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
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default AddCertificate;
