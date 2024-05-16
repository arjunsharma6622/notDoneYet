import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

const ImagesModal = ({ images, open, setOpen } : any) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
                      <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4 py-10 px-10 relative">

            <div className="absolute top-4 right-4 z-[50]">
                <FiX
                  className="cursor-pointer h-6 w-6 text-gray-600"
                  onClick={() => setOpen(false)}
                />
            </div>

          <Carousel className="w-full h-fit">
      <CarouselContent className="">
        {images?.map((image : string, index : number) => (
          <CarouselItem key={index}>
              <img src={image} className="w-[100%] h-[400px] object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesModal;
