import PostCardSkeleton from './PostCardSkeleton'

const PostsSkeleton = ({ cardsToShow }: { cardsToShow: number }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {[...Array(cardsToShow)]?.map((_, index) => (
                <PostCardSkeleton key={index} />
            ))}
        </div>)
}

export default PostsSkeleton