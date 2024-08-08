import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiX, FiXCircle } from "react-icons/fi";

const SkillsEdit = ({
  user,
  setUserData,
  open,
  setOpen,
}: {
  user: any;
  setUserData: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [userSkills, setUserSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState("");

  const router = useRouter();

  const { onSubmit, isLoading } = useFormSubmit('/user/', 'patch')

  const handleFormSubmit = () => {
    const payloadToSend = {
      skills: userSkills
    }
    onSubmit(payloadToSend, (updatedData) => {
      setUserData((prev: any) => ({ ...prev, ...updatedData }));
      setOpen(false);
    })
  }

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">
                {user?.role === "doctor"
                  ? "Edit your Skills"
                  : "Edit sports you play"}
              </h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="flex flex-col gap-6 px-6 py-4 overflow-scroll">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold underline">
                  {user?.role === "doctor" ? "Skills" : "Sports"}
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center gap-4">
                    <input
                      type="text"
                      placeholder={
                        user?.role === "doctor"
                          ? "Add a new skill"
                          : "Add a new sport"
                      }
                      className=" border rounded-md px-3 py-2 w-[80%]"
                      onChange={(e) => setNewSkill(e.target.value)}
                      value={newSkill}
                    />
                    <button
                      className="w-[20%] bg-primary text-white font-semibold px-3 py-2 rounded"
                      onClick={() => {
                        setUserSkills([...userSkills, newSkill]);
                        setNewSkill("");
                      }}
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {userSkills?.map((skill: any, index: number) => (
                      <div
                        className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
                        key={index}
                      >
                        <span>{skill}</span>
                        <FiXCircle
                          className="inline ml-2 text-xl cursor-pointer text-red-500"
                          onClick={() =>
                            setUserSkills((prevUserSkills: any) => prevUserSkills.filter(
                              (item: any) => item !== skill
                            ))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
              <FormButton onClick={() => setOpen(false)} variant={"cancel"} />
              <FormButton onClick={handleFormSubmit} type="submit" variant={"save"} isLoading={isLoading} />
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default SkillsEdit;
