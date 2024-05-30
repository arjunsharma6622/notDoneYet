import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";
import MultiImages from "../../../MultiImages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { days, times } from "./utils";



const AddSportCard = ({
  watch,
  register,
  setValue,
  index,
  removeSports,
  user,
  errors,
  clearErrors,
}: any) => {
  const [imagesOpen, setImagesOpen] = useState(false);

  const startDay = watch(`sports.${index}.timing.startDay`);
  const endDay = watch(`sports.${index}.timing.endDay`);
  const startTime = watch(`sports.${index}.timing.startTime`);
  const endTime = watch(`sports.${index}.timing.endTime`);

  useEffect(() => {
    if (startDay) {
      clearErrors(`sports.${index}.timing.startDay`);
    }
  }, [startDay]);

  useEffect(() => {
    if (endDay) {
      clearErrors(`sports.${index}.timing.endDay`);
    }
  }, [endDay]);

  useEffect(() => {
    if (startTime) {
      clearErrors(`sports.${index}.timing.startTime`);
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      clearErrors(`sports.${index}.timing.endTime`);
    }
  }, [endTime]);

  return (
    <div key={index} className="flex flex-col shadow-md border rounded-md w-full">
      <div className="flex py-2 px-4 border-b items-center justify-between">
      <p className="font-semibold">Sport {index + 1}</p>

        <span className="text-lg font-semibold flex items-center gap-2">

          {watch(`sports.${index}.name`) && (
            watch(`sports.${index}.name`)
          )}
          <p className="text-xs text-gray-500 font-normal">
            Open from{" "}
            <span className="text-sm font-medium text-black">
              {" "}
              {watch(`sports.${index}.timing.startDay`)} -{" "}
              {watch(`sports.${index}.timing.endDay`)}{" "}
            </span>{" "}
            from{" "}
            <span className="text-sm font-medium text-black">
              {" "}
              {watch(`sports.${index}.timing.startTime`)} -{" "}
              {watch(`sports.${index}.timing.endTime`)}{" "}
            </span>
          </p>
        </span>

        {/* <FiXCircle
          className="cursor-pointer w-5 h-5 text-red-500"
          onClick={() => removeSports(index)}
        /> */}
      </div>
      <div className="flex items-start gap-4 flex-col">
        <div className="w-full px-4 border-r py-2 flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="w-full">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name"
                {...register(`sports.${index}.name`, {
                  required: true,
                })}
                error={errors?.sports?.[index]?.name?.message}
              />
            </div>

            <div className="w-full">
              <Label className="">
                Price/hr{" "}
                <span className="text-blue-500 text-sm ml-1 font-normal">
                  {`Rs.${watch(`sports.${index}.price`)}`} per hour
                </span>{" "}
              </Label>
              <Input
                type="number"
                placeholder="Price per hour"
                {...register(`sports.${index}.price`, {
                  required: true,
                  valueAsNumber: true,
                })}
                error={errors?.sports?.[index]?.price?.message}
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-full">
              <Label htmlFor="startDay">Day from</Label>
              <Select
                {...register(`sports.${index}.timing.startDay`)}
                onValueChange={(value) =>
                  setValue(`sports.${index}.timing.startDay`, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Day from" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.sports?.[index]?.timing?.startDay?.message && (
                <p className="text-red-500 text-xs">
                  {errors?.sports?.[index]?.timing?.startDay?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="endDay">Day to</Label>

              <Select
                {...register(`sports.${index}.timing.endDay`)}
                onValueChange={(value) =>
                  setValue(`sports.${index}.timing.endDay`, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Day to" />
                </SelectTrigger>
                <SelectContent>
                  {watch(`sports.${index}.timing.startDay`) &&
                    days.map((day) => (
                      <SelectItem
                        disabled={
                          days.indexOf(day) <=
                          days.indexOf(watch(`sports.${index}.timing.startDay`))
                        }
                        key={day}
                        value={day}
                      >
                        {day}
                      </SelectItem>
                    ))}
                  {!watch(`sports.${index}.timing.startDay`) && (
                    <SelectItem disabled value="None">
                      Please select Day from
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              {errors?.sports?.[index]?.timing?.endDay?.message && (
                <p className="text-red-500 text-xs">
                  {errors?.sports?.[index]?.timing?.endDay?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="venueStartTime">Start Time</Label>

              <Select
                {...register(`sports.${index}.timing.startTime`)}
                onValueChange={(value) =>
                  setValue(`sports.${index}.timing.startTime`, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Start Time" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors?.sports?.[index]?.timing?.startTime?.message && (
                <p className="text-red-500 text-xs">
                  {errors?.sports?.[index]?.timing?.startTime?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="venueStartTime">End Time</Label>

              <Select
                {...register(`sports.${index}.timing.endTime`)}
                onValueChange={(value) =>
                  setValue(`sports.${index}.timing.endTime`, value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="End Time" />
                </SelectTrigger>
                <SelectContent>
                  {watch(`sports.${index}.timing.startTime`) &&
                    times.map((time) => (
                      <SelectItem
                        disabled={
                          time <= watch(`sports.${index}.timing.startTime`)
                        }
                        key={time}
                        value={time}
                      >
                        {time}
                      </SelectItem>
                    ))}

                  {!watch(`sports.${index}.timing.startTime`) && (
                    <SelectItem disabled={true} value="00:00">
                      Please select start time
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              {errors?.sports?.[index]?.timing?.endTime?.message && (
                <p className="text-red-500 text-xs">
                  {errors?.sports?.[index]?.timing?.endTime?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Description"
              className="border rounded-md px-3 py-2 w-full focus:outline-none"
              {...register(`sports.${index}.description`, {
                required: true,
              })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label>Images</Label>
            <div
              onClick={() => {
                setImagesOpen(true);
                console.log("Clicked the main images button");
              }}
              className="flex items-center gap-2 border border-gray-300 border-dashed rounded-lg w-fit px-4 py-2 cursor-pointer bg-gray-50 text-sm"
            >
              Add
              <BiImageAdd className="w-5 h-5" />
            </div>
          </div>

          {imagesOpen && (
            <div className="absoulte">
              <MultiImages
                open={imagesOpen}
                setOpen={setImagesOpen}
                aspectRatio={2 / 1}
                imageUrls={watch(`sports.${index}.images`)}
                setImageUrls={setValue}
                baseUrlPath={`ndy/venues/${user?.userName}/sports/${watch(
                  `sports.${index}.name`
                )}`}
                inSports={true}
                sportImagePath={`sports.${index}.images`}
              />
            </div>
          )}
        </div>

        <div className="h-full w-full px-4 py-2">
          {watch(`sports.${index}.images`).length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {watch(`sports.${index}.images`) &&
                watch(`sports.${index}.images`).map(
                  (image: string, imageIndex: number) => (
                    <div key={imageIndex}>
                      <img
                        src={image}
                        alt="image"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )
                )}
            </div>
          ) : (
            <div className="flex justify-center items-center w-full flex-col gap-2 h-full">
              <span className="text-gray-500 flex items-center justify-center text-sm">
                No Images
              </span>

              {errors?.sports?.[index]?.images?.message && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <FiAlertCircle className="w-4 h-4" />
                  {errors?.sports?.[index]?.images?.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSportCard;
