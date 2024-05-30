import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_HEAD } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { z } from "zod";
import BasicVenueDetails from "./(components)/BasicVenueDetails";
import VenueAddress from "./(components)/VenueAddress";
import VenueAmenities from "./(components)/VenueAmenities";
import VenueImages from "./(components)/VenueImages";
import VenueSports from "./(components)/VenueSports";
import VenueTimings from "./(components)/VenueTimings";
import { AddVenueSchema, addVenueDefaultValues } from "./(components)/utils";

type AddVenueSchemaType = z.infer<typeof AddVenueSchema>;

const AddVenue = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
    clearErrors,
  } = useForm<AddVenueSchemaType>({
    resolver: zodResolver(AddVenueSchema),
    defaultValues: addVenueDefaultValues,
  });

  const { append: appendAmenities, remove: removeAmenities } = useFieldArray({
    control,
    name: "amenities",
  });

  const { fields: socialFields, append : appendSocial, remove: removeSocial } = useFieldArray({
    control,

    name: "socialLinks",
  });

  const {
    fields: sportsFields,
    append: appendSports,
    remove: removeSports,
  } = useFieldArray({
    control,
    name: "sports",
  });

  const handleAddVenue = async (data: any) => {
    try {
      console.log("In handle add venue");
      console.log(data);

      const res = await axios.post(`${API_HEAD}/venue`, {
        ...data,
        owner: user._id,
      });
      toast.success("Venue added successfully");
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      reset();
      toast.error("Venue add failed");
      setOpen(false);
    }
  };
  const errorsInDetails =
    errors.name ||
    errors.uniqueName ||
    errors.email ||
    errors.number ||
    errors.description ||
    errors.socialLinks;
  const errorsInAddress =
    errors.location?.address ||
    errors.location?.city ||
    errors.location?.state ||
    errors.location?.country ||
    errors.location?.zipCode ||
    errors.googleMapsLink;
  const errorsInTimings = errors.timing?.startTime || errors.timing?.endTime;
  const errorsInAmenities = errors.amenities;
  const errorsInSports = errors.sports;
  const errorsInImages = errors.images;

  const tabs = [
    { value: "details", label: "Details", hasError: errorsInDetails },
    { value: "address", label: "Address", hasError: errorsInAddress },
    { value: "timings", label: "Timings", hasError: errorsInTimings },
    { value: "amenities", label: "Amenities", hasError: errorsInAmenities },
    { value: "sports", label: "Sports", hasError: errorsInSports },
    { value: "images", label: "Images", hasError: errorsInImages },
  ];

  console.log(watch());

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[70%] h-[90%] bg-white rounded-md  flex flex-col">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Add New Venue</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            <form
              onSubmit={handleSubmit(handleAddVenue)}
              className="flex flex-col justify-between relative gap-0 h-full pt-10 overflow-scroll w-full"
            >
              <div className="flex flex-col gap-6 px-6 overflow-y-scroll w-full">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="absolute bg-transparent transform -right-1/2 -translate-x-1/2 top-0  w-full flex items-center gap-4 mb-4 py-1 border-b rounded-none">
                    {" "}
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={`w-full ${tab.hasError ? "text-red-500 flex items-center gap-1" : "text-gray-500"}`}
                      >

{ tab.hasError &&
                        <FiAlertCircle className="h-4 w-4"/>
}
                        {tab.label}

                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="details" className="">
                    <BasicVenueDetails
                      register={register}
                      watch={watch}
                      socialFields={socialFields}
                      removeSocial={removeSocial}
                      errors={errors}
                      appendSocial={appendSocial}
                    />
                  </TabsContent>
                  <TabsContent value="address">
                    <VenueAddress register={register} errors={errors} />
                  </TabsContent>

                  <TabsContent value="timings">
                    <VenueTimings
                      clearErrors={clearErrors}
                      register={register}
                      setValue={setValue}
                      watch={watch}
                      errors={errors}
                    />
                  </TabsContent>

                  <TabsContent
                    value="amenities"
                    className="flex flex-col gap-4"
                  >
                    <VenueAmenities
                      watch={watch}
                      appendAmenities={appendAmenities}
                      removeAmenities={removeAmenities}
                      errors={errors}
                    />
                  </TabsContent>

                  <TabsContent value="sports">
                    <VenueSports
                      sportsFields={sportsFields}
                      removeSports={removeSports}
                      appendSports={appendSports}
                      user={user}
                      watch={watch}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      clearErrors={clearErrors}
                    />
                  </TabsContent>
                  <TabsContent value="images">
                    <VenueImages
                      user={user}
                      watch={watch}
                      setValue={setValue}
                      errors={errors}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-3 mt-2">
                <Button
                  className=""
                  onClick={() => setOpen(false)}
                  variant={"destructive"}
                >
                  Cancel
                </Button>
                <Button
                  className="px-6 bg-primary py-2 rounded-sm font-semibold text-white"
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

export default AddVenue;
