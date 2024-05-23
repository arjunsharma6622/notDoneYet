import ModalLayout from "@/components/ModalLayout";
import React from "react";
import { FiX } from "react-icons/fi";

const EditCertificates = ({ open, setOpen, user }: any) => {
  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Edit Certificates</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default EditCertificates;
