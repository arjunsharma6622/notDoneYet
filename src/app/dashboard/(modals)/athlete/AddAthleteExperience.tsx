import { updateAthleteExperience } from "@/actions/user";
import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage, FiLink, FiX } from "react-icons/fi";
import { toast } from "sonner";

const AddAthleteExperience = ({
  user,
  open,
  setOpen,
}: {
  user: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [userData, setUserData] = useState(user);
  const [experienceType, setExperienceType] = useState("training");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handleUserUpdate = async (data: any) => {
    try {
      const updatedExperienceData = {
        ...userData,
        experience: [...userData.experience, { ...data, type: experienceType }],
      };
      await updateAthleteExperience(updatedExperienceData);
      toast.success("Profile Updated");
      setOpen(false);
      reset();
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
              <h1 className="text-2xl font-bold">Experience - {experienceType}</h1>
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
                <div>
                  <p className="text-xl font-semibold">
                    What type of Experience is it?
                  </p>

                  <RadioGroup onValueChange={(value) => setExperienceType(value)} defaultValue="training" className="flex items-center gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="training" id="r1" />
                      <Label htmlFor="r1">Training</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tournament" id="r2" />
                      <Label htmlFor="r2">Tournament</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">
                    Add {experienceType}
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
                      <label htmlFor="experienceDescription">Description</label>
                      <textarea
                        placeholder="Description"
                        id="experienceDescription"
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        {...register("description")}
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between w-full gap-6">
                      {experienceType === "training" &&
                        <>
                          <div className="w-full">
                            <label htmlFor="experienceStartDate">Start Date</label>
                            <input
                              type="date"
                              id="experienceStartDate"
                              className="border rounded-md px-3 py-2 w-full focus:outline-none"
                              {...register("startDate")}
                            />
                          </div>
                          <div className="w-full">
                            <label htmlFor="experienceEndDate">End Date</label>
                            <input
                              type="date"
                              id="experienceEndDate"
                              className="border rounded-md px-3 py-2 w-full focus:outline-none"
                              {...register("endDate")}
                            />
                          </div>
                        </>
                      }
                      {experienceType === "tournament" &&
                        <>
                          <div className="w-full">
                            <label htmlFor="experienceDate">Date</label>
                            <input
                              type="date"
                              id="experienceDate"
                              className="border rounded-md px-3 py-2 w-full focus:outline-none"
                              {...register("date")}
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

                      {experienceType === "tournament" &&
                        <div className="w-full">
                          <label htmlFor="experienceOutcome">Outcome</label>
                          <select
                            id="experienceOutcome"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none"
                            {...register("outcome")}
                          >
                            <option value="">--Select Outcome--</option>
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
                    {experienceType === "tournament" &&
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

export default AddAthleteExperience;
