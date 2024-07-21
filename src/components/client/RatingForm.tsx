"use client"

import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Textarea } from '../ui/textarea';
import { Loading } from '../ui/loading';

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
    <div className="w-full border border-gray-200 shadow-md rounded-xl py-4 px-4 flex flex-col gap-2">
    <div className="">
      <span className='text-xl font-bold'>Rate us</span>
      <p className="text-gray-600 text-sm">
        How would you rate our service?
      </p>
    </div>


        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <AiFillStar
              key={index}
              className={`transition-all duration-75 w-6 h-6 cursor-pointer ${
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
            <span className="ml-2 text-xl">
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

    <div className=''>


      <div className="flex items-center flex-col gap-2">
        <Textarea
          name="text"
          id=""
          cols={30}
          placeholder="Write a review"
          rows={10}
          value={review}
          className=" focus:outline-none w-full h-24  rounded-md resize-none"
          onChange={(e) => setReview(e.target.value)}
        ></Textarea>
        <button
          className="bg-blue-600 text-white w-full h-10 rounded-md"
        >
          {isReviewLoading ? (
<Loading />
          ) : (
            "Rate"
          )}
        </button>
      </div>
    </div>
  </div>  )
}

export default RatingForm