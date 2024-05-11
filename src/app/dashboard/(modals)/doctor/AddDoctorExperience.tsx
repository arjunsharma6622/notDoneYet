import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiLink, FiX } from "react-icons/fi";
import { toast } from "sonner";

const AddDoctorExperience = ({ user, open, setOpen } : { user: any, open: boolean, setOpen: (open: boolean) => void }) => {
  const [userData, setUserData] = useState(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handleUserUpdate = async (data : any) => {
    try {
      await axios.patch(`/api/user/${userData._id}`, {
        experience: [...userData.experience, data],
      });

      toast.success("Profile Updated");
      reset();
      window.location.reload();
    } catch (err) {
        toast.error("Profile Update Failed")
      console.log(err);
    }
  };

  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Experience</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <form onSubmit={handleSubmit(handleUserUpdate)} className="flex flex-col gap-6 overflow-scroll">
              <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">Add Experience</h2>
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
                        <label htmlFor="experienceOrganization">Organization</label>
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
                        <label htmlFor="experienceOutcome">Specialization</label>
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
                        <FiLink className="text-lg"/>
                        <FiImage className="text-lg"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                <Button
                  variant="destructive"
                  className="px-6 py-2 rounded-sm font-semibold"
                  onClick={() => setOpen(false)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDoctorExperience;
