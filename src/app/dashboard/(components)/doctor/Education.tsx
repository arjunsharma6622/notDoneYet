import DoctorEducationCard from "@/components/DoctorEducationCard";
import { IconButton } from "@/components/ui/IconButton";
import { useState } from "react";
import AddEducation from "../../(modals)/doctor/AddEducation";
import EditEducation from "../../(modals)/doctor/EditEducation";

const Education = ({ userData }: { userData: any }) => {
  const [openEducationAdd, setOpenEducationAdd] = useState(false);
  const [openEducationEdit, setOpenEducationEdit] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Education</h2>

          <div className="flex justify-start items-center gap-4">
            <IconButton
              variant={"add"}
              onClick={() => setOpenEducationAdd(true)}
            />
            <IconButton
              variant={"edit"}
              onClick={() => setOpenEducationEdit(true)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {userData?.education?.map((education: any, index: any) => (
            <DoctorEducationCard key={index} educationDetails={education} />
          ))}
        </div>
      </div>

      {openEducationAdd && (
        <div className="absolute">
          <AddEducation
            user={userData}
            open={openEducationAdd}
            setOpen={setOpenEducationAdd}
          />
        </div>
      )}

      {openEducationEdit && (
        <div className="absolute">
          <EditEducation
            user={userData}
            open={openEducationEdit}
            setOpen={setOpenEducationEdit}
          />
        </div>
      )}
    </>
  );
};

export default Education;
