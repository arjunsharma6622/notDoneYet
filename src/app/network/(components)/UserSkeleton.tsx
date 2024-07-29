import { Skeleton } from "@/components/ui/skeleton"

const UserSkeleton = () => {
  return (
    <div className="relative flex items-center flex-col gap-2 border rounded-xl">
      <Skeleton className="h-16 w-full bg-gray-200 rounded-b-none" />
      <Skeleton className="absolute top-4 h-16 w-16 rounded-full bg-gray-300" />
      <Skeleton className="mt-6 h-4 w-[60%] mx-auto bg-gray-200" />
      <div className="flex items-center gap-4 p-2 w-full">
        <Skeleton className="h-8 w-full bg-gray-200 rounded-full" />
        <Skeleton className="h-8 w-full bg-gray-200 rounded-full" />
      </div>
    </div>
    )
}

export default UserSkeleton