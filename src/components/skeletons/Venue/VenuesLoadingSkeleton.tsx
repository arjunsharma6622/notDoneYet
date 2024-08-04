import VenueCardSkeleton from './VenueCardSkeleton'

const VenuesLoadingSkeleton = () => {
    return (
        <>
            <div className="md:hidden grid md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                    <VenueCardSkeleton key={index} />
                ))}
            </div>
            <div className="hidden  md:grid md:grid-cols-4 gap-6">
                {[...Array(12)].map((_, index) => (
                    <VenueCardSkeleton key={index} />
                ))}
            </div>
        </>)
}

export default VenuesLoadingSkeleton