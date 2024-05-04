import { Button } from "@/components/ui/button";
import axios from "axios";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "sonner";

const EditEducation = ({ user, open, setOpen } : { user: any, open: boolean, setOpen: (open: boolean) => void }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [userData, setUserData] = useState(user);
  const [selectedEducation, setSelectedEducation] : any = useState(null);

  useEffect(() => {
    if (selectedEducation) {
      reset(selectedEducation);
    }
    reset({...selectedEducation, startDate : dateFormat(selectedEducation?.startDate, "isoDate"), endDate : dateFormat(selectedEducation?.endDate, "isoDate")});
  }, [selectedEducation, reset]);

  const onSubmit : any = handleSubmit(async (data) => {
    try {
      const updatedUserData = {
        ...userData,
        education: userData.education.map((education : any) => {
          if (education._id === selectedEducation._id) {
            return data;
          }
          return education;
        }),
      };

      await axios.patch(`/api/user/${userData._id}`, updatedUserData);

      setSelectedEducation(null);

      toast.success("Profile Updated");
      window.location.reload();

    } catch (err) {
        toast.error("Profile Update Failed")
      console.log(err);
    }
  });

  const deleteEducation = async (education : any) => {
    try {
      const updatedUserData = {
        ...userData,
        education: userData.education.filter((edu : any) => edu._id !== education._id),
      };
      await axios.patch(`/api/user/${userData._id}`, updatedUserData);
      toast.success("Profile Updated");
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
              <h1 className="text-2xl font-bold">Education</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            {selectedEducation ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 overflow-scroll">
                <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold underline">Edit Education</h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between gap-6 items-center">
                        <div className="w-full">
                          <label htmlFor="educationSchool">School/College</label>
                          <input
                            type="text"
                            placeholder="School/College"
                            id="educationSchool"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("school", { required: true })}
                          />
                          {errors.school && <p>School is required.</p>}
                        </div>
                        <div className="w-full">
                          <label htmlFor="educationDegree">Degree</label>
                          <input
                            type="text"
                            placeholder="Degree"
                            id="educationDegree"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("degree", { required: true })}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full gap-6">
                        <div className="w-full">
                          <label htmlFor="educationField">Field of Study</label>
                          <input
                            type="text"
                            placeholder="Field of Study"
                            id="educationField"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("fieldOfStudy", { required: true })}
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="educationGPA">GPA/Score</label>
                          <input
                            type="text"
                            placeholder="GPA/Score"
                            id="educationGPA"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("gpa")}
                          />
                        </div>

                      </div>
                      <div className="flex items-center justify-between w-full gap-6">
                      <div className="w-full">
                          <label htmlFor="educationStartDate">Start Date</label>
                          <input
                            type="date"
                            id="educationStartDate"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            defaultValue={dateFormat(selectedEducation.startDate, "yyyy-mm-dd")}
                            {...register("startDate", { required: true })}
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="educationEndDate">End Date</label>
                          <input
                            type="date"
                            id="educationEndDate"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            defaultValue={dateFormat(selectedEducation.endDate, "yyyy-mm-dd")}
                            {...register("endDate", { required: true })}
                          />
                        </div>

                      </div>
                      <div>
                        <label htmlFor="educationDescription">Description</label>
                        <textarea
                          placeholder="Description"
                          id="educationDescription"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("description")}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
                  <Button
                    variant="destructive"
                    className="px-6 py-2 rounded-sm font-semibold"
                    onClick={() => setSelectedEducation(null)}
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
                {user.education?.map((education : any, index : any) => (
                  <div key={index} className="px-6 py-2 bg-gray-200 flex items-center gap-6 border rounded-md w-fit">
                    {education.school} . {education.degree} . {dateFormat(education.startDate, "mmmm, yyyy")} - {dateFormat(education.endDate, "mmmm, yyyy")}
                    <div className="flex items-center justify-normal gap-4">
                      <FiEdit2 className="text-lg cursor-pointer" onClick={() => setSelectedEducation(education)}/>
                      <FiTrash2 className="text-lg text-red-500 cursor-pointer" onClick={() => deleteEducation(education)}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default EditEducation;
