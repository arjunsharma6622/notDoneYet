import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const VenueRatingHeader = ({ avgRating=4.5, fullStars=4, hasHalfStar=1 }: any) => {
  return (
    <div className="flex items-center justify-between">
      
      <div className="flex items-center gap-3 md:gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-black text-sm md:text-lg font-semibold">
                        {avgRating ? avgRating : "-"}
                      </span>

                      <div className="flex items-center gap-1">
                        {[...Array(fullStars ? fullStars : 0)].map(
                          (_, index) => (
                            <BsStarFill
                              key={index}
                              className="text-yellow-500 w-3 h-3 md:w-4 md:h-4"
                            />
                          ),
                        )}

                        {hasHalfStar && (
                          <BsStarHalf className="text-yellow-500 w-3 h-3 md:w-4 md:h-4" />
                        )}

                        {[
                          ...Array(
                            5 -
                              (fullStars ? fullStars : 0) -
                              (hasHalfStar ? 1 : 0),
                          ),
                        ].map((_, index) => (
                          <BsStar
                            key={index}
                            className="text-gray-300 w-3 h-3 md:w-4 md:h-4"
                          />
                        ))}
                      </div>
                    </div>

                    <a href="#ratings">
                      <span className="text-gray-black text-xs md:text-sm text-blue-500">
                        4 ratings
                      </span>
                    </a>
                  </div>
    </div>
  )
}

export default VenueRatingHeader