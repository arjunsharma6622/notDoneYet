import { IconButton } from "@/components/ui/IconButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import LoadingModal from "../(modals)/LoadingModal";

const SkillsEdit = dynamic(
  () => import("../(modals)/SkillsEdit"),
  {
    loading: () => <LoadingModal />,
    ssr: false
  })

const Skills = ({ userData, setUserData }: { userData: any, setUserData: any }) => {
  const [openSkillsEdit, setOpenSkillsEdit] = useState(false);
  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {userData.role == "doctor" ? "Skills" : "Sports"}
          </h2>
          <IconButton
            variant={"edit"}
            onClick={() => setOpenSkillsEdit(true)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {userData?.skills?.map((sport: string) => (
            <div
              key={sport}
              className="bg-gray-200 rounded-full px-3 py-[2px] md:px-4 md:py-1"
            >
              <span className="md:text-base text-sm">{sport}</span>
            </div>
          ))}
        </div>
      </div>

      {openSkillsEdit && (
        <div className="absolute">
          <SkillsEdit
            open={openSkillsEdit}
            setOpen={setOpenSkillsEdit}
            user={userData}
            setUserData={setUserData}
          />
        </div>
      )}
    </>
  );
};

export default Skills;
