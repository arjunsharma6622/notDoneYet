import { IconButton } from "@/components/ui/IconButton";

import AddSportCard from "./AddSportCard";
import { FiAlertCircle } from "react-icons/fi";

const VenueSports = ({
  appendSports,
  removeSports,
  sportsFields,
  watch,
  register,
  setValue,
  user,
  errors,
  clearErrors
}: any) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl font-semibold">Venue Sports</h1>

        {/* <IconButton
          onClick={() =>
            appendSports({
              name: "",
              description: "",
              price: 0,
              images: [],
            })
          }
          variant={"add"}
          type="button"
        /> */}
      </div>


      {errors?.sports?.message && (
          <p className="text-red-500 text-xs flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors?.sports?.message}
          </p>
        )}

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          {sportsFields.map((field: any, index: number) => (
            <AddSportCard
              key={field.id}
              watch={watch}
              register={register}
              setValue={setValue}
              index={index}
              removeSports={removeSports}
              user={user}
              errors={errors}
              clearErrors={clearErrors}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueSports;
