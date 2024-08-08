import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiLink, FiX } from "react-icons/fi";
import AthleteExperienceInfoCard from "./AthleteExperienceInfoCard";

const EditAthleteExperience = ({
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
  const [userExperience, setUserExperience] = useState(user.experience);
  const [selectedExperience, setSelectedExperience]: any = useState(null);

  useEffect(() => {
    if (selectedExperience) {
      reset(selectedExperience);
    }
    reset({
      ...selectedExperience,
      date: dateFormat(selectedExperience?.date, "isoDate"),
      startDate: dateFormat(selectedExperience?.startDate, "isoDate"),
      endDate: dateFormat(selectedExperience?.endDate, "isoDate"),
    });
  }, [selectedExperience, reset]);

  const { onSubmit, isLoading: isExperienceUpdating } = useFormSubmit('/user/', "patch")

  const handleExperienceUpdate = handleSubmit((data) => {
    const payloadToSend = {
      experience: userExperience.map((experience: any) => {
        if (experience._id === selectedExperience._id) {
          return data;
        }
        return experience;
      }),
    };

    onSubmit(payloadToSend, (updatedData) => {
      setUserData((prev: any) => ({ ...prev, ...updatedData }));
      setUserExperience(updatedData.experience);
      setSelectedExperience(null);
      reset();
    });
  });

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Experience - {selectedExperience?.type}</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            {selectedExperience ? (
              <form
                onSubmit={handleExperienceUpdate}
                className="flex flex-col gap-6 overflow-scroll"
              >
                <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold underline">
                      Edit {selectedExperience?.type}
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
                          <label htmlFor="experienceSport">Sport</label>
                          <input
                            type="text"
                            placeholder="Sport"
                            id="experienceSport"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("sport")}
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

                        {selectedExperience?.type === "training" &&
                          <>
                            <div className="w-full">
                              <label htmlFor="experienceStartDate">Start Date</label>
                              <input
                                type="date"
                                id="experienceStartDate"
                                className="border rounded-md px-3 py-2 w-full focus:outline-none"
                                defaultValue={dateFormat(
                                  selectedExperience.startDate,
                                  "yyyy-mm-dd",
                                )}
                                {...register("startDate", { required: true })}
                              />
                            </div>
                            <div className="w-full">
                              <label htmlFor="experienceEndDate">End Date</label>
                              <input
                                type="date"
                                id="experienceEndDate"
                                className="border rounded-md px-3 py-2 w-full focus:outline-none"
                                defaultValue={dateFormat(
                                  selectedExperience.endDate,
                                  "yyyy-mm-dd",
                                )}
                                {...register("endDate", { required: true })}
                              />
                            </div>
                          </>
                        }

                        {selectedExperience?.type === "tournament" &&
                          <>
                            <div className="w-full">
                              <label htmlFor="experienceDate">Date</label>
                              <input
                                type="date"
                                id="experienceDate"
                                className="border rounded-md px-3 py-2 w-full focus:outline-none"
                                defaultValue={dateFormat(
                                  selectedExperience.date,
                                  "yyyy-mm-dd",
                                )}
                                {...register("date", { required: true })}
                              />
                            </div>
                            <div className="w-full">
                              <label htmlFor="experienceDuration">
                                Duration in hours
                              </label>
                              <input
                                type="text"
                                placeholder="Duration"
                                id="experienceDuration"
                                className="border rounded-md px-3 py-2 w-full focus:outline-none"
                                {...register("duration")}
                              />
                            </div>
                          </>
                        }
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
                        {selectedExperience?.type === "tournament" &&
                          <div className="w-full">
                            <label htmlFor="experienceOutcome">Outcome</label>
                            <select
                              id="experienceOutcome"
                              className="border rounded-md px-3 py-2 w-full focus:outline-none"
                              {...register("outcome")}
                            >
                              <option value="">Select Outcome</option>
                              <option value="win">Win</option>
                              <option value="loss">Loss</option>
                              <option value="draw">Draw</option>
                            </select>
                          </div>
                        }

                      </div>
                      <div className="flex items-center justify-between w-full gap-6">
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
                        <div className="w-full">
                          <label htmlFor="experienceCoach">Coach</label>
                          <input
                            type="text"
                            placeholder="Coach"
                            id="experienceCoach"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("coach")}
                          />
                        </div>
                      </div>

                      {selectedExperience?.type === "tournament" &&
                        <div>
                          <label htmlFor="experienceHealthInjury">
                            Health Injury
                          </label>
                          <input
                            type="text"
                            placeholder="Health Injury"
                            id="experienceHealthInjury"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("healthInjury")}
                          />
                        </div>
                      }


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
                    onClick={() => setSelectedExperience(null)}
                  />
                  <FormButton
                    type="submit"
                    variant={"save"}
                    isLoading={isExperienceUpdating}
                  />
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4 pb-4 px-6">
                {user.experience?.map((experience: any, index: number) => (
                  <AthleteExperienceInfoCard experience={experience} setSelectedExperience={setSelectedExperience} userExperience={user.experience} setUserExperience={setUserExperience} setUserData={setUserData} key={index} />
                ))}
              </div>
            )}
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default EditAthleteExperience;
