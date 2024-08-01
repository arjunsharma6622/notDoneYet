import { Skeleton } from "@/components/ui/skeleton"

const VenueCardSkeleton = () => {
  return (
    <div className="relative flex items-center flex-col gap-2 border rounded-xl">
      <Skeleton className="h-24 w-full bg-gray-200 rounded-b-none" />
      <Skeleton className="h-5 w-[50%] mx-auto bg-gray-200 rounded-full" />
      <Skeleton className="h-4 w-[40%] mx-auto bg-gray-200 rounded-full" />
      <div className="flex items-center gap-4 p-2 pt-1 w-[90%]">
        <Skeleton className="h-8 w-full bg-gray-200 rounded-full" />
        <Skeleton className="h-8 w-full bg-gray-200 rounded-full" />
      </div>
    </div>
    )
}

export default VenueCardSkeleton