import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'

const SportCard = ({sport} : any) => {
  return (
    <div
    className="shadow flex flex-col gap-2 rounded-lg py-1 pb-2"
  >
    <Carousel>
      <CarouselContent>   
        {sport?.images?.map((image: any) => (
          <CarouselItem key={image}>
            <img
              src={image}
              alt="image"
              className="w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {sport?.images?.length > 1 && (
        <>
          <CarouselPrevious className=''/>
          <CarouselNext />
        </>
      )}
    </Carousel>

<div className='px-4 flex flex-col gap-2 text-sm'>

    <span className="text-lg font-semibold">{sport?.name}</span>

    <div className="flex flex-col gap-1">
      <div className='flex items-center gap-1'>
      <FiCalendar />
      <span>
        {sport?.timing?.startDay} - {sport?.timing?.endDay}
      </span>
      </div>

      <div className='flex items-center gap-1'>
      <FiClock />
      <span>
        {sport?.timing?.startTime} - {sport?.timing?.endTime}
      </span>
      </div>
    </div>

    <Button>
      Book Slot @ Rs.{sport?.price} / hr
    </Button>

    </div>


  </div>  )
}

export default SportCard