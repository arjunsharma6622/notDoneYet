import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { times } from "./utils";


const VenueTimings = ({ watch, setValue, errors, register, clearErrors }: any) => {
    const startTime = watch("timing.startTime");
    const endTime = watch("timing.endTime");

    useEffect(() => {
        if (startTime) {
            clearErrors("timing.startTime");
        }
        if(endTime) {
            clearErrors("timing.endTime");
        }
    }, [startTime, endTime]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Venue Timings</h1>

        <div className="flex items-center gap-4">
          <div>
            <Label htmlFor="venueStartTime">Start Time</Label>
            <Select
              {...register("timing.startTime")}
              onValueChange={(value) => setValue("timing.startTime", value)}
              value={startTime}
            >
              <SelectTrigger className="w-[180px]">
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
            {errors.timing?.startTime?.message && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-[3px]">
                <FiAlertCircle className="w-4 h-4" />
                {errors.timing?.startTime?.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="venueCloseTime">End Time</Label>
            <Select
              {...register("timing.endTime")}
              onValueChange={(value) => setValue("timing.endTime", value)}
              value={endTime}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="End Time" />
              </SelectTrigger>
              <SelectContent>
                {watch("timing.startTime") &&
                  times.map((time) => (
                    <SelectItem
                      disabled={time <= watch("timing.startTime")}
                      key={time}
                      value={time}
                    >
                      {time}
                    </SelectItem>
                  ))}
                {!watch("timing.startTime") && (
                  <SelectItem disabled={true} value="00:00">
                    Please start time is required
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.timing?.endTime?.message && (
              <p className="text-red-500 text-xs flex items-center gap-1 mt-[3px]">
                <FiAlertCircle className="w-4 h-4" />
                {errors.timing?.endTime?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueTimings;
