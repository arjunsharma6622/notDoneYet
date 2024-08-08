import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import EducationInfoCard from "./EducationInfoCard";

const EditEducation = ({
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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [userEducation, setUserEducation] = useState(user.education);
  const [selectedEducation, setSelectedEducation]: any = useState(null);

  useEffect(() => {
    if (selectedEducation) {
      reset(selectedEducation);
    }
    reset({
      ...selectedEducation,
      startDate: dateFormat(selectedEducation?.startDate, "isoDate"),
      endDate: dateFormat(selectedEducation?.endDate, "isoDate"),
    });
  }, [selectedEducation, reset]);

  const { onSubmit, isLoading: isEducationEditLoading } = useFormSubmit('/user/', 'patch')

  const handleEducationUpdate = (data: any) => {
    const payloadToSend = {
      education: userEducation.map((education: any) => {
        if (education._id === selectedEducation._id) {
          return data;
        }
        return education;
      }),
    }

    onSubmit(payloadToSend, (updatedData) => {
      setUserData((prev: any) => ({ ...prev, ...updatedData }));
      setUserEducation(updatedData.education);
      setSelectedEducation(null);
    })
  }

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

            {selectedEducation ? (
              <form
                onSubmit={handleSubmit(handleEducationUpdate)}
                className="flex flex-col gap-6 overflow-scroll"
              >
                <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold underline">
                      Edit Education
                    </h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between gap-6 items-center">
                        <div className="w-full">
                          <label htmlFor="educationSchool">
                            School/College
                          </label>
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
                            defaultValue={dateFormat(
                              selectedEducation.startDate,
                              "yyyy-mm-dd",
                            )}
                            {...register("startDate", { required: true })}
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="educationEndDate">End Date</label>
                          <input
                            type="date"
                            id="educationEndDate"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            defaultValue={dateFormat(
                              selectedEducation.endDate,
                              "yyyy-mm-dd",
                            )}
                            {...register("endDate", { required: true })}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="educationDescription">
                          Description
                        </label>
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
                  <FormButton onClick={() => setSelectedEducation(null)} variant={"cancel"} />
                  <FormButton type="submit" variant={"save"} isLoading={isEducationEditLoading} />
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4 pb-4 px-6">
                {userEducation?.map((education: any, index: any) => (
                  <EducationInfoCard
                    key={index}
                    education={education}
                    userEducation={userEducation}
                    setUserEducation={setUserEducation}
                    setUserData={setUserData}
                    setSelectedEducation={setSelectedEducation}
                  />
                ))}
              </div>
            )}
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default EditEducation;
