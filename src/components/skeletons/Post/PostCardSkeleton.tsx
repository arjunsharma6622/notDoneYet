import { Skeleton } from "@/components/ui/skeleton"

const PostCardSkeleton = () => {
    return (
        <div className="flex items-center justify-center flex-col gap-2 border rounded-xl p-2 w-full bg-white">
            <div className="w-full flex items-center justify-start gap-4 pb-4 border-b">
                <div>
                <Skeleton className="h-16 w-16 flex rounded-full bg-gray-300" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <Skeleton className="h-6 w-44 flex bg-gray-200 rounded-full" />
                    <Skeleton className="h-4 w-[80%] flex bg-gray-200 rounded-full" />
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 pt-4">
                <div className="flex flex-col gap-1 w-full">
                    <Skeleton className="h-4 w-full bg-gray-200 rounded-full" />
                    <Skeleton className="h-4 w-full bg-gray-200 rounded-full" />
                    <Skeleton className="h-4 w-[60%] bg-gray-200 rounded-full" />
                    <Skeleton className="h-4 w-[80%] bg-gray-200 rounded-full" />
                </div>

                <Skeleton className="h-44 w-full bg-gray-200 rounded-xl" />
            </div>
        </div>
    )
}

export default PostCardSkeleton