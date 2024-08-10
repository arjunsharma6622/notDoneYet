import LoadingModal from '@/app/dashboard/(modals)/LoadingModal'
import useAuth from '@/context/useAuth'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'

const PostForm = dynamic(
  () => import("@/app/dashboard/(modals)/PostForm"),
  {
    loading: () => <LoadingModal />,
    ssr: false
})

const AddPostInputBox = () => {
  const { auth } = useAuth()
  const { user: authenticatedUser } = auth
  
  const [openPostForm, setOpenPostForm] = useState(false);
  const addPostMessage = {
    athlete: "Share your journey. Inspire others!",
    doctor: "Post insights that help the community.",
    venue: "Promote your events and success stories.",
    brand: "Highlight your brand’s impact in sports."
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 md:p-4 flex flex-row gap-4 items-center">
      <Image src={authenticatedUser?.image} width={50} height={50} alt="logo" className="rounded-full w-12 h-12" />
      <div onClick={() => setOpenPostForm(!openPostForm)} className="cursor-pointer h-12 w-full border rounded-full p-2 px-4 bg-gray-50 flex items-center justify-start">
        <p className="text-gray-500 text-xs md:text-sm">{addPostMessage[authenticatedUser?.role as keyof typeof addPostMessage]}</p>
      </div>

      {openPostForm &&
        <div className="absolute">
          <PostForm open={openPostForm} setOpen={setOpenPostForm} user={authenticatedUser} />
        </div>
      }
    </div>
  )
}

export default AddPostInputBox