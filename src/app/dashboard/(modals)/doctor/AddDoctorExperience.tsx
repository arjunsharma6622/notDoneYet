import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiLink, FiX } from "react-icons/fi";

const AddDoctorExperience = ({
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

  const [userExperience, setUserExperience] = useState(user.experience);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const { onSubmit, isLoading } = useFormSubmit('/user/', "patch");

  const handleUserUpdate = async (data: any) => {
    const payloadToSend = {
      experience: [...userExperience, data],
    }

    onSubmit(payloadToSend, (updatedData) => {
      setUserData((prev: any) => ({ ...prev, ...updatedData }));
      setOpen(false);
      reset();
    })
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
            <form
              onSubmit={handleSubmit(handleUserUpdate)}
              className="flex flex-col gap-6 overflow-scroll"
            >
              <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">
                    Add Experience
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
                        <label htmlFor="startDate">End Date</label>
                        <input
                          type="date"
                          id="endDate"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("endDate")}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experienceDescription">Description</label>
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
                        <label htmlFor="experienceOutcome">
                          Specialization
                        </label>
                        <input
                          id="specialization"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("specialization")}
                          placeholder="Specialization"
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
              <FormButton
                  type="submit"
                  variant={"cancel"}
                  onClick={() => setOpen(false)}
                />
                <FormButton
                  type="submit"
                  variant={"save"}
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default AddDoctorExperience;
