import VenueCardSkeleton from './VenueCardSkeleton'

const VenuesLoadingSkeleton = () => {
    return (
        <>
            <div className="md:hidden grid md:grid-cols-4 gap-4">
                {[...Array(4)].map((i) => (
                    <VenueCardSkeleton key={i} />
                ))}
            </div>
            <div className="hidden  md:grid md:grid-cols-4 gap-6">
                {[...Array(12)].map((i) => (
                    <VenueCardSkeleton key={i} />
                ))}
            </div>
        </>)
}

export default VenuesLoadingSkeleton