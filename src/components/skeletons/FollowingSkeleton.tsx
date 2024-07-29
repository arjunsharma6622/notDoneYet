import { Skeleton } from "@/components/ui/skeleton"

const FollowingSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-56 bg-gray-200" />
        <Skeleton className="h-4 w-24 bg-gray-200" />
      </div>
    </div>
    )
}

export default FollowingSkeleton