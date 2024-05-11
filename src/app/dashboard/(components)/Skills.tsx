import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import SkillsEdit from "../(modals)/SkillsEdit";

const Skills = ({ userData } : any) => {
    const [openSkillsEdit, setOpenSkillsEdit] = useState(false);
  return (
    <>
            <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{userData.role == 'doctor' ? 'Skills' : 'Sports'}</h2>

            <div className="flex justify-start items-center gap-4">
              <FiEdit3
                className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
                onClick={() => setOpenSkillsEdit(true)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {userData?.sports?.map((sport: string) => (
              <div
                key={sport}
                className="bg-gray-200 rounded-full px-3 py-[2px] md:px-4 md:py-1"
              >
                <span className="md:text-base text-sm">{sport}</span>
              </div>
            ))}
          </div>
        </div>

        {openSkillsEdit && 
        <div className="absolute">
            <SkillsEdit open={openSkillsEdit} setOpen={setOpenSkillsEdit} user={userData} />
        </div>
        }

    </>
  )
}

export default Skills