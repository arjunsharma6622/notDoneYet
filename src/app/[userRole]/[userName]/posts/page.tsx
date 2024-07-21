import { auth } from '@/auth'
import PostCard from '@/components/client/PostCard'
import UserInfoCard from '@/components/client/UserInfoCard'
import { API_HEAD } from '@/lib/utils'
import axios from 'axios'
import React from 'react'

const page = async ({params}: {params: { userRole: string; userName: string }}) => {
  const userName = params.userName
  const session : any = await auth();
  console.log(session?.user)
  const postsData = await axios.get(`${API_HEAD}/posts/getPosts/user?userName=${userName}`).then((res) => res.data)
  return (
    <div className=" flex justify-center gap-5 w-full ">
      {postsData && (
        <div className="md:w-[95%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
          <div className="flex-[3] sticky top-20">
            <UserInfoCard userName={userName}/>
          </div>

          <div className="flex-[6]">
            {postsData.map((postData: any) => (
              <PostCard key={postData._id} postData={postData} currUser={session?.user} />
            ))}
          </div>

          <div className="flex-[3]"></div>
        </div>
      )}
    </div>
  )
}

export default page