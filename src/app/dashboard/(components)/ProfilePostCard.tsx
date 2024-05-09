import Link from 'next/link'
import React from 'react'
import { FcLike } from 'react-icons/fc'

const ProfilePostCard = ({post} : any) => {
  return (
    <Link href={`/post/${post._id}`} className="border rounded-md px-5 py-5 flex flex-col gap-2"
    >
      <div className="flex items-start justify-start gap-4 text-sm">

{ post.images.length > 0 &&
        <div className="flex-[1.3]">
                  <img
                    src={post?.images[0]}
                    alt='slide'
                    className="object-cover w-full rounded-lg"
                  />
          </div>
}

          <p className='flex-[11]'>{post.description}</p>


      </div>

      <div className="flex justify-between items-center text-xs">
      <span className="flex items-center justify-center gap-1">{post.likes.length} <FcLike className="w-4 h-4"/></span>
      <span>{post.comments.length} Comments</span>
      </div>
    </Link>
  )
}

export default ProfilePostCard