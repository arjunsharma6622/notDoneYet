import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiX, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";

const SkillsEdit = ({
  user,
  open,
  setOpen,
}: {
  user: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [userData, setUserData] = useState(user);
  const [newSport, setNewSport] = useState("");

  const router = useRouter();

  const handleUserUpdate = async () => {
    try {
      console.log("In handle user update");
      console.log(userData);
      const res = await axiosInstance.patch(
        `/user/`,
        userData,
      );
      toast.success("Skills Updated");
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">
                {userData?.role === "doctor"
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
                  {userData?.role === "doctor" ? "Skills" : "Sports"}
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center gap-4">
                    <input
                      type="text"
                      placeholder={
                        userData?.role === "doctor"
                          ? "Add a new skill"
                          : "Add a new sport"
                      }
                      className=" border rounded-md px-3 py-2 w-[80%]"
                      onChange={(e) => setNewSport(e.target.value)}
                      value={newSport}
                    />
                    <button
                      className="w-[20%] bg-primary text-white font-semibold px-3 py-2 rounded"
                      onClick={() => {
                        setUserData({
                          ...userData,
                          skills: [...userData.skills, newSport],
                        });
                        setNewSport("");
                      }}
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {userData.skills?.map((skill: any, index: number) => (
                      <div
                        className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1"
                        key={index}
                      >
                        <span>{skill}</span>
                        <FiXCircle
                          className="inline ml-2 text-xl cursor-pointer text-red-500"
                          onClick={() =>
                            setUserData((prevUserData: any) => ({
                              ...prevUserData,
                              skills: prevUserData.skills.filter(
                                (item: any) => item !== skill,
                              ),
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
              <Button
                variant="destructive"
                className="px-6  py-2 rounded-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="px-6 bg-primary py-2 rounded-sm font-semibold"
                onClick={handleUserUpdate}
              >
                Save
              </Button>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default SkillsEdit;
