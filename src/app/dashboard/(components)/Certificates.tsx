import React, { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import AddCertificate from "../(modals)/AddCertificates";
import EditCertificates from "../(modals)/EditCertificate";
import { IconButton } from "@/components/ui/IconButton";

const Certificates = ({userData} : {userData: any}) => {
  const [openCertificatesEdit, setOpenCertificatesEdit] = useState(false);
  const [openCertificatesAdd, setOpenCertificatesAdd] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Certificates</h2>
          <div className="flex justify-start items-center gap-4">
            <IconButton variant={"add"} onClick={() => setOpenCertificatesAdd(true)} />
            <IconButton variant={"edit"} onClick={() => setOpenCertificatesEdit(true)} />
          </div>
        </div>
      </div>

      {openCertificatesAdd && (
        <div className="absoulte">
          <AddCertificate open={openCertificatesAdd} setOpen={setOpenCertificatesAdd} user={userData} />
        </div>
      )}

      {openCertificatesEdit && (
        <div className="absoulte">
          <EditCertificates open={openCertificatesEdit} setOpen={setOpenCertificatesEdit} user={userData} />
        </div>
      )}
    </>
  );
};

export default Certificates;
