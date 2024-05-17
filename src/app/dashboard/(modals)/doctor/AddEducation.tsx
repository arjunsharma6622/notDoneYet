import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";

const AddEducation = ({ user, open, setOpen } : any) => {
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
      await axios.patch(`${API_HEAD}/user/${userData._id}`, {education : [...userData.education, data]});
      toast.success("Profile Updated");
      window.location.reload();
      reset();
    } catch (err) {
        toast.error("Profile Update Failed")
      console.log(err);
    }
  };


  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Education</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <form onSubmit={handleSubmit(handleUserUpdate)} className="flex flex-col gap-6 overflow-scroll">
              <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">Add Education</h2>
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
                        {errors.degree && <p>Degree is required.</p>}
                      </div>
                    </div>
                    <div className="flex justify-between gap-6 items-center">
                      <div className="w-full">
                        <label htmlFor="educationFieldOfStudy">Field of Study</label>
                        <input
                          type="text"
                          placeholder="Field of Study"
                          id="educationFieldOfStudy"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("fieldOfStudy", { required: true })}
                        />
                        {errors.fieldOfStudy && <p>Field of Study is required.</p>}
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
                    <div className="flex justify-between gap-6 items-center">

                      <div className="w-full">
                        <label htmlFor="educationStartDate">Start Date</label>
                        <input
                          type="date"
                          id="educationStartDate"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("startDate", { required: true })}
                        />
                        {errors.startDate && <p>Start Date is required.</p>}
                      </div>
                      <div className="w-full">
                        <label htmlFor="educationEndDate">End Date</label>
                        <input
                          type="date"
                          id="educationEndDate"
                          className="border rounded-md px-3 py-2 w-full focus:outline-none"
                          {...register("endDate", { required: true })}
                        />
                        {errors.endDate && <p>End Date is required.</p>}
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
          </ModalLayout>
      )}
    </div>
  );
};

export default AddEducation;
