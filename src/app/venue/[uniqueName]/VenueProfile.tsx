import RatingForm from "@/components/client/RatingForm";
import VenueAddress from "./(components)/VenueAddress";
import VenueAmenities from "./(components)/VenueAmenities";
import VenueContact from "./(components)/VenueContact";
import VenueHeader from "./(components)/VenueHeader";
import VenueImages from "./(components)/VenueImages";
import VenueRatings from "./(components)/VenueRatings";
import VenueSports from "./(components)/VenueSports";

const VenueProfile = ({ venueData }: any) => {
  return (
    <div className="flex items-start gap-4 md:flex-row flex-col">
      <div className="flex-[8] flex w-full p-4 border rounded-md">
        <div className="flex flex-col gap-6">
          <VenueHeader venueData={venueData} />
          <VenueSports venueData={venueData} />
          <VenueAmenities venueData={venueData} />
          {/* <VenueRatings venueData={venueData} /> */}
        </div>
      </div>

      <div className="flex-[4] flex w-full flex-col gap-6">
        <VenueContact venueData={venueData} />
        <VenueAddress venueData={venueData} />
        <RatingForm />
        <VenueImages venueData={venueData} />
      </div>
    </div>
  );
};

export default VenueProfile;
