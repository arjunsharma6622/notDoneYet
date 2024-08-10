import { IconButton } from "@/components/ui/IconButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import LoadingModal from "../(modals)/LoadingModal";

const AddCertificate = dynamic(
  () => import("../(modals)/AddCertificates"),
  {
    loading: () => <LoadingModal />,
    ssr: false
  })

const EditCertificates = dynamic(
  () => import("../(modals)/EditCertificate"),
  {
    loading: () => <LoadingModal />,
    ssr: false
  })

const Certificates = ({ userData }: { userData: any }) => {
  const [openCertificatesEdit, setOpenCertificatesEdit] = useState(false);
  const [openCertificatesAdd, setOpenCertificatesAdd] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Certificates</h2>
          <div className="flex justify-start items-center gap-4">
            <IconButton
              variant={"add"}
              onClick={() => setOpenCertificatesAdd(true)}
            />
            <IconButton
              variant={"edit"}
              onClick={() => setOpenCertificatesEdit(true)}
            />
          </div>
        </div>
      </div>

      {openCertificatesAdd && (
        <div className="absoulte">
          <AddCertificate
            open={openCertificatesAdd}
            setOpen={setOpenCertificatesAdd}
            user={userData}
          />
        </div>
      )}

      {openCertificatesEdit && (
        <div className="absoulte">
          <EditCertificates
            open={openCertificatesEdit}
            setOpen={setOpenCertificatesEdit}
            user={userData}
          />
        </div>
      )}
    </>
  );
};

export default Certificates;
