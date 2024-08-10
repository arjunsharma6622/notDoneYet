import { IconButton } from "@/components/ui/IconButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import LoadingModal from "../(modals)/LoadingModal";

const AboutProfileEdit = dynamic(
  () => import("../(modals)/AboutProfileEdit"),
  {
    loading: () => <LoadingModal />,
    ssr: false
  })


const About = ({ userData, setUserData }: { userData: any, setUserData: any }) => {
  const [openAboutEdit, setOpenAboutEdit] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center gap-1">
          <h2 className="text-xl font-bold">About</h2>
          <IconButton variant={"edit"} onClick={() => setOpenAboutEdit(true)} />
        </div>
        <p className="text-sm truncated-text-3">{userData?.about}</p>
      </div>

      {openAboutEdit && (
        <div className="absolute">
          <AboutProfileEdit
            open={openAboutEdit}
            setOpen={setOpenAboutEdit}
            user={userData}
            setUserData={setUserData}
          />
        </div>
      )}
    </>
  );
};

export default About;
