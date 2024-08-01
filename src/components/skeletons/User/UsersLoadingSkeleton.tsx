import React from 'react'
import UserCardSkeleton from './UserSkeletonCard'

const UsersLoadingSkeleton = () => {
    return (
        <>
            <div className="md:hidden grid md:grid-cols-4 gap-4">
                {[...Array(4)].map((i) => (
                    <UserCardSkeleton key={i} />
                ))}
            </div>
            <div className="hidden  md:grid md:grid-cols-4 gap-4">
                {[...Array(12)].map((i) => (
                    <UserCardSkeleton key={i} />
                ))}
            </div>
        </>)
}

export default UsersLoadingSkeleton