import { amenities } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const VenueAmenities = ({
  watch,
  appendAmenities,
  removeAmenities,
  errors,
}: any) => {
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold">Venue Amenities</h1>
        {errors?.amenities?.message && (
          <div className="flex items-center gap-2">
            <FiAlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-xs text-red-500">{errors?.amenities?.message}</p>
          </div>
        )}
      </div>
      {Array.from(new Set(amenities.map((amenity) => amenity.category))).map(
        (category, categoryIndex) => (
          <div key={categoryIndex} className="border-b pb-4">
            <h1 className="text-sm text-gray-500 mb-2">{category}</h1>
            <div className="grid grid-cols-5 gap-4 items-center justify-center text-xs">
              {amenities
                .filter((a) => a.category === category)
                .map((amenity, index) => {
                  const isAmenitySelected = watch("amenities")?.some(
                    (a: any) =>
                      a.name === amenity.name && a.icon === amenity.icon
                  );

                  return (
                    <div
                      key={index}
                      className={`relative flex items-center gap-2 flex-col ${
                        isAmenitySelected
                          ? "bg-green-200 text-black"
                          : "bg-gray-100 text-black"
                      } rounded-md p-2 py-4 cursor-pointer`}
                      onClick={() => {
                        const currentAmenities = watch("amenities");
                        const amenityIndex = currentAmenities.findIndex(
                          (a: any) =>
                            a.name === amenity.name && a.icon === amenity.icon
                        );

                        if (amenityIndex === -1 || amenityIndex === undefined) {
                          appendAmenities(amenity);
                        } else {
                          removeAmenities(amenityIndex);
                        }
                      }}
                    >
                      <Image
                        src={`/images/amenities/${amenity.icon}`}
                        alt={amenity.name}
                        width={44}
                        height={44}
                        loading="lazy"
                      />
                      <label>{amenity.name}</label>
                      {isAmenitySelected && (
                        <FiCheckCircle className="absolute top-2 right-2 w-4 h-4 text-green-600" />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default VenueAmenities;
