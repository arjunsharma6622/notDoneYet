"use client"

import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Textarea } from '../ui/textarea';

const RatingForm = () => {

    const [hoveredStars, setHoveredStars] = useState(4);
    const [selectedStars, setSelectedStars] = useState(4);
    const [review, setReview] = React.useState("");
    const [isReviewLoading, setIsReviewLoading] = useState(false);
  
    const handleStarHover = (index : number) => {
      setHoveredStars(index + 1);
    };
  
    const handleStarLeave = () => {
      setHoveredStars(0);
    };
  
    const handleStarClick = (index : number) => {
      setSelectedStars(index + 1);
    };
  

  return (
    <div className="w-full border border-gray-200 shadow-md rounded-xl py-6 pb-8 px-5">
    <div className="text-xl font-bold mb-3">
      <span>Rate us</span>
    </div>

    <div className="mb-4">
      <p className="text-gray-600 text-base my-2">
        How would you rate our service?
      </p>
      <div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <AiFillStar
              key={index}
              className={`transition-all duration-75 w-8 h-8 cursor-pointer ${
                (hoveredStars > 0 ? hoveredStars : selectedStars) >
                index
                  ? [
                      "text-red-500",
                      "text-orange-500",
                      "text-yellow-500",
                      "text-green-600",
                      "text-blue-500",
                    ][
                      (hoveredStars > 0
                        ? hoveredStars
                        : selectedStars) - 1
                    ]
                  : "text-gray-300"
              }`}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={handleStarLeave}
              onClick={() => handleStarClick(index)}
            />
          ))}
          {(hoveredStars > 0 ? hoveredStars : selectedStars) && (
            <span className="ml-2 text-2xl">
              {
                ["😢", "😕", "😐", "🙂", "😄"][
                  (hoveredStars > 0
                    ? hoveredStars
                    : selectedStars) - 1
                ]
              }
            </span>
          )}
        </div>
      </div>
    </div>

    <div>
      <p className="text-gray-600 text-base my-2 mt-4">
        Share your experience
      </p>

      <div className="flex items-center flex-col gap-2">
        <Textarea
          name="text"
          id=""
          cols={30}
          placeholder="This is a very good ..."
          rows={10}
          value={review}
          className=" focus:outline-none w-full h-24 bg-gray-100 rounded-md px-4 py-2 resize-none"
          onChange={(e) => setReview(e.target.value)}
        ></Textarea>
        <button
          className="bg-blue-600 text-white w-full h-10 rounded-md"
        //   onClick={handleRating}
        >
          {isReviewLoading ? (
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            "Rate"
          )}
        </button>
      </div>
    </div>
  </div>  )
}

export default RatingForm