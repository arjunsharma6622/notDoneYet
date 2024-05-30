import { updateUser } from "@/actions/user";
import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiImage, FiLink, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "sonner";

const EditDoctorExperience = ({
  user,
  open,
  setOpen,
}: {
  user: any;
  open: boolean;
  setOpen: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState(user);
  const [selectedExperience, setSelectedExperience]: any = useState(null);

  useEffect(() => {
    if (selectedExperience) {
      reset(selectedExperience);
    }
    reset({
      ...selectedExperience,
      startDate: dateFormat(selectedExperience?.startDate, "isoDate"),
      endDate: dateFormat(selectedExperience?.endDate, "isoDate"),
    });
  }, [selectedExperience, reset]);

  const onSubmit: any = handleSubmit(async (data) => {
    try {
      const updatedUserData = {
        ...userData,
        experience: userData.experience.map((experience: any) => {
          if (experience._id === selectedExperience._id) {
            return data;
          }
          return experience;
        }),
      };

      await axios.patch(`${API_HEAD}/user/${userData._id}`, updatedUserData);

      setSelectedExperience(null);

      toast.success("Profile Updated");
      window.location.reload();
    } catch (err) {
      toast.error("Profile Update Failed");
      console.log(err);
    }
  });

  const deleteExperience = async (experience: any) => {
    try {
      const updatedUserData = {
        ...userData,
        experience: userData.experience.filter(
          (exp: any) => exp._id !== experience._id,
        ),
      };
      await updateUser(updatedUserData);
      toast.success("Profile Updated");
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
              <h1 className="text-2xl font-bold">Experience</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            {selectedExperience ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 overflow-scroll"
              >
                <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold underline">
                      Edit Experience
                    </h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between gap-6 items-center">
                        <div className="w-full">
                          <label htmlFor="experienceTitle">Title</label>
                          <input
                            type="text"
                            placeholder="Title"
                            id="experienceTitle"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("title", { required: true })}
                          />
                          {errors.title && <p>Title is required.</p>}
                        </div>
                        <div className="w-full">
                          <label htmlFor="experienceOrganization">
                            Organization
                          </label>
                          <input
                            type="text"
                            placeholder="Organization"
                            id="experienceOrganization"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("organization")}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full gap-6">
                        <div className="w-full">
                          <label htmlFor="startDate">Start Date</label>
                          <input
                            type="date"
                            id="startDate"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("startDate")}
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="endDate">End Date</label>
                          <input
                            type="date"
                            id="endDate"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("endDate")}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="experienceDescription">
                          Description
                        </label>
                        <textarea
                          placeholder="Description"
                          id="experienceDescription"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("description")}
                        ></textarea>
                      </div>
                      <div className="flex items-center justify-between w-full gap-6">
                        <div className="w-full">
                          <label htmlFor="experienceLocation">Location</label>
                          <input
                            type="text"
                            placeholder="Location"
                            id="experienceLocation"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("location")}
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="experienceSpecialization">
                            Specialization
                          </label>
                          <input
                            type="text"
                            placeholder="Specialization"
                            id="experienceSpecialization"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("specialization")}
                          />
                        </div>
                      </div>

                      <div className="w-full flex items-center gap-4">
                        <span>Attachments</span>
                        <div className="flex gap-4 text-blue-500 items-center justify-start">
                          <FiLink className="text-lg" />
                          <FiImage className="text-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                  <Button
                    variant="destructive"
                    className="px-6 py-2 rounded-sm font-semibold"
                    onClick={() => setSelectedExperience(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-6 bg-primary py-2 rounded-sm font-semibold"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4 pb-4 px-6">
                {user.experience?.map((experience: any, index: number) => (
                  <div
                    key={index}
                    className="px-6 py-2 bg-gray-200 flex items-center gap-6 border rounded-md w-fit"
                  >
                    {experience.title} . {experience.organization} .{" "}
                    {dateFormat(experience.startDate, "mmmm, yyyy")} -{" "}
                    {dateFormat(experience.endDate, "mmmm, yyyy")}
                    <div className="flex items-center justify-normal gap-4">
                      <FiEdit2
                        className="text-lg cursor-pointer"
                        onClick={() => setSelectedExperience(experience)}
                      />
                      <FiTrash2
                        className="text-lg text-red-500 cursor-pointer"
                        onClick={() => deleteExperience(experience)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default EditDoctorExperience;
