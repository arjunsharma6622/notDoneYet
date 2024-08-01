import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'

const VenueImages = ({ venueData }: any) => {
    return (
        <Carousel>
            <CarouselContent>
                {venueData?.images?.map((image: any) => (
                    <CarouselItem key={image}>
                        <Image
                            src={image}
                            width={500}
                            height={500}
                            layout='intrinsic'
                            alt="image"
                            className="w-full object-cover aspect-[2/1]"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {venueData?.images?.length > 1 && (
                <>
                    <CarouselPrevious />
                    <CarouselNext />
                </>
            )}
        </Carousel>
    )
}

export default VenueImages