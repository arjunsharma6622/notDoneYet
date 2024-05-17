import ProfilePostCard from "@/components/client/ProfilePostCard"

const Activity = ({ postData, currUser }: { postData: any, currUser: any }) => {
  return (

    <div className="flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Activity</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {postData?.slice(0, 3)?.map((post: any, index: number) => (
        <ProfilePostCard currUser={currUser} post={post} key={index} />
      ))}
    </div>
  </div>  )
}

export default Activity