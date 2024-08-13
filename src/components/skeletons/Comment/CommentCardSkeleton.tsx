import { Skeleton } from '@/components/ui/skeleton'

const CommentCardSkeleton = () => {
  return (
    <div className='flex gap-4 bg-white rounded-xl'>
        <div>
        <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
        </div>
        <div className='flex flex-col gap-2 px-2 pb-2 w-full'>
        <Skeleton className="h-3 w-[50%] bg-gray-200 rounded-full" />
        <Skeleton className="h-3 w-[70%] bg-gray-200 rounded-full" />
        </div>
    </div>
  )
}

export default CommentCardSkeleton