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

const EditAthleteExperience = ({
  user,
  open,
  setOpen,
}: {
  user: any;
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
  const [userData, setUserData] = useState(user);
  const [selectedExperience, setSelectedExperience]: any = useState(null);

  useEffect(() => {
    if (selectedExperience) {
      reset(selectedExperience);
    }
    reset({
      ...selectedExperience,
      date: dateFormat(selectedExperience?.date, "isoDate"),
    });
  }, [selectedExperience, reset]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("In handle user update");
      console.log(data);

      const updatedUserData = {
        ...userData,
        experience: userData.experience.map((experience: any) => {
          if (experience._id === selectedExperience._id) {
            return data;
          }
          return experience;
        }),
      };

      console.log("upddate experience data is");
      console.log(updatedUserData);

      await axios.patch(`${API_HEAD}/user/${userData._id}`, updatedUserData);

      setSelectedExperience(null);

      toast.success("Profile Updated");
      setOpen(false);
      reset();
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
              <h1 className="text-2xl font-bold">Tournaments/Championships</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            {selectedExperience ? (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-6 overflow-scroll"
              >
                <div className="flex flex-col gap-6 px-6 py-4 overflow-y-scroll">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold underline">
                      Edit Tournament
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
                    {experience.title} . {experience.sport} .{" "}
                    {dateFormat(experience.date, "mmmm, yyyy")}
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

export default EditAthleteExperience;
