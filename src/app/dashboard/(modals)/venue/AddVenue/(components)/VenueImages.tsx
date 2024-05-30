import { Label } from '@/components/ui/label';
import React from 'react'
import { BiImageAdd } from 'react-icons/bi';
import MultiImages from '../../../MultiImages';
import { FiAlertCircle } from 'react-icons/fi';

const VenueImages = ({watch, setValue, user, errors} : any) => {
    const [imagesOpen, setImagesOpen] = React.useState(false);
  return (
    <div>
    <h1 className="text-xl font-semibold">Venue Images</h1>

    {errors?.images?.message && (
          <p className="text-red-500 text-xs flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {errors?.images?.message}
          </p>
        )}

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
                imageUrls={watch(`images`)}
                setImageUrls={setValue}
                baseUrlPath={`ndy/venues/${user?.userName}/`}
                inVenueImages={true}
                venueImagePath={`images`}
              />
            </div>
          )}

          {watch(`images`).length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {watch(`images`) &&
                watch(`images`).map(
                  (image: string, index: number) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt="image"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )
                )}
            </div>
          )}

    </div>
  )
}

export default VenueImages