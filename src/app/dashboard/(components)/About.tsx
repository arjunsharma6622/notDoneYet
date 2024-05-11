import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import AboutProfileEdit from "../(modals)/AboutProfileEdit";

const About = ({ userData }: { userData: any }) => {
  const [openAboutEdit, setOpenAboutEdit] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center gap-1">
          <h2 className="text-xl font-bold">About</h2>
          <FiEdit3
            className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
            onClick={() => setOpenAboutEdit(true)}
          />
        </div>

        <p className="text-sm truncated-text-3">{userData?.about}</p>
      </div>

      {openAboutEdit && (
        <div className="absolute">
          <AboutProfileEdit
            open={openAboutEdit}
            setOpen={setOpenAboutEdit}
            user={userData}
          />
        </div>
      )}
    </>
  );
};

export default About;
