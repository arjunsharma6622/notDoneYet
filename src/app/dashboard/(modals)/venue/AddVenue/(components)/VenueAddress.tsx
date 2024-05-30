import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VenueAddress = ({ register, errors }: any) => {
  return (
    <div>
      <h1 className="text-xl font-semibold">Venue Address</h1>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-6 items-center">
          <div className="w-full">
            <Label htmlFor="venueAddress">Address</Label>
            <Input
              type="text"
              placeholder="Address"
              id="venueAddress"
              {...register("location.address", {
                required: true,
              })}
              error={errors?.location?.address?.message}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="venueLandmark">Landmark</Label>
            <Input
              type="text"
              placeholder="Landmark"
              id="venueLandmark"
              {...register("location.landmark")}
            />
          </div>
        </div>
        <div className="flex justify-between gap-6 items-center">
          <div className="w-full">
            <Label htmlFor="venueCity">City</Label>
            <Input
              type="text"
              placeholder="City"
              id="venueCity"
              {...register("location.city", { required: true })}
              error={errors?.location?.city?.message}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="venueState">State</Label>
            <Input
              type="text"
              placeholder="State"
              id="venueState"
              {...register("location.state", { required: true })}
              error={errors?.location?.state?.message}
            />
          </div>
        </div>
        <div className="flex justify-between gap-6 items-center">
          <div className="w-full">
            <Label htmlFor="venueCountry">Country</Label>
            <Input
              type="text"
              placeholder="Country"
              id="venueCountry"
              {...register("location.country", {
                required: true,
              })}
              error={errors?.location?.country?.message}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="venueZipCode">Zip Code</Label>
            <Input
              type="string"
              placeholder="Zip Code"
              maxLength={6}
              id="venueZipCode"
              {...register("location.zipCode", {
                required: true,
              })}
              error={errors?.location?.zipCode?.message}
            />
          </div>
        </div>
        <div className="flex justify-start gap-6 items-end">
          <div className="w-full">
            <Label htmlFor="venueGoogleMapsLink">Google Maps Link</Label>
            <Input
              type="text"
              placeholder="Google Maps Link"
              id="venueGoogleMapsLink"
              {...register("googleMapsLink", { required: true })}
              error={errors?.googleMapsLink?.message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueAddress;
