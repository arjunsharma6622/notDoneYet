import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
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


const EditVenue = ({
  open,
  setOpen,
  user,
  venueDetails
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
  venueDetails: any;
}) => {


  const linkRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const EditVenueSchema = z.object({
  name: z.string()
      .min(1, "Name is required"),

  uniqueName: z.string()
      .min(1, "This is required")
      .refine(async (uniqueName) => {
        if(!uniqueName) return true;
        if(uniqueName && uniqueName === venueDetails?.uniqueName) return true;
        const res = await axios.get(`${API_HEAD}/checkVenueName?uniqueName=${uniqueName}`);
        return res.data?.available;
      }, {
        message: "Name not available, please choose another",
      }),

  number : z.string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number")
      .regex(/^\d{10}$/, "Invalid phone number"),

  email: z.string()
      .email("Invalid email"),
      
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string()
        .min(6, "Invalid zip code")
        .max(6, "Invalid zip code")
        .regex(/^\d{6}$/, "Invalid zip code"),
  }),

  googleMapsLink: z.string()
      .min(1, "Google Maps link is required"),

  timing: z.object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  }),

  description: z.string(),
  
  socialLinks: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    link: z.string()
      .min(1, "Link is required")
      .regex(linkRegex, "Invalid link"),
  })),

  amenities: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    icon : z.string().min(1, "Icon is required"),
  })).min(4, "Select at least 4 amenities"),

  images: z.array(z.string()).min(1, "Add at least 1 image"),
  
  sports: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    price: z.number().min(1, "Price is required"),
    images: z.array(z.string()).min(1, "Image is required"),
    timing: z.object({
      startTime: z.string().min(1, "Start time is required"),
      endTime: z.string().min(1, "End time is required"),
      startDay: z.string().min(1, "Start day is required"),
      endDay: z.string().min(1, "End day is required"),
    })
  })).min(1, "Add at least 1 sport"),
})

type EditVenueSchemaType = z.infer<typeof EditVenueSchema>;


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
    clearErrors,
  } = useForm<EditVenueSchemaType>({
    resolver: zodResolver(EditVenueSchema),
    defaultValues: venueDetails,
  });

  const { append: appendAmenities, remove: removeAmenities } = useFieldArray({
    control,
    name: "amenities",
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
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

  const handleEditVenue = async (data: any) => {
    try {
      const res = await axiosInstance.patch(`/venue/`, {
        ...data,
      });
      toast.success("Venue updated successfully");
      setOpen(false);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      reset();
      toast.error("Venue update failed");
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
              onSubmit={handleSubmit(handleEditVenue)}
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

export default EditVenue;
