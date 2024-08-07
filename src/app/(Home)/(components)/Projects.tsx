import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";

const Projects = () => {
  return (
    <section id="projects" className="container px-4 py-10 md:px-10 md:py-16">
      <Heading heading="Our Recent Project" subline="Discover How Our Latest Initiative is Transforming the Sports Landscape" />

      <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
          <div className="flex items-center gap-3 md:gap-5">
            <img
              src="/static/images/MAC.svg"
              alt="Record"
              className="w-20 h-20 md:w-44 md:h-44"
            />
            <X className="inline w-4 h-4 md:w-6 md:h-6" />
            <img src="/static/images/nitw.png" alt="Record" className="h-16 md:h-32" />
          </div>
          <Link
            href="https://www.instagram.com/mac.nitw/"
            target="_blank"
            className="text-xs md:text-base underline decoration-1 w-fit"
          >
            View more on Instagram
            <Image
              src={"/static/images/social/instagram.png"}
              alt="Instagram"
              width={20}
              height={20}
              className="inline ml-1"
            />
          </Link>
          <p className="text-sm md:text-lg text-black text-justify">
            Established a thriving{" "}
            <span className="text-red-600 font-medium">
              MAC (martial arts club)
            </span>{" "}
            at <span className="font-medium text-red-600">NIT Warangal</span>,
            engaging over{" "}
            <span className="bg-red-100 px-1 rounded-md">500 Students</span> in
            live sessions and reaching more than{" "}
            <span className="bg-red-100 px-1 rounded-md">2,000 students</span>{" "}
            through digital platforms. Our rigorous training programs and
            dedicated coaching have produced remarkable results, including a
            state champion and{" "}
            <span className="bg-red-100 px-1 rounded-md">3 national-level</span>{" "}
            contenders in kickboxing, recognized by{" "}
            <span className="font-medium text-red-600">WAKO</span>.{" "}
          </p>
        </div>

        <Carousel className="w-full h-fit">
          <CarouselContent className="">
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index} className="">
                <img
                  src={`/static/images/MAC/${index + 1}.jpg`}
                  alt={`MAC ${index + 1}`}
                  className="rounded-xl object-cover w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
