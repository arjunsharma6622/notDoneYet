import ProfilePostCard from "@/components/client/ProfilePostCard"

const Activity = ({ postData }: { postData: any }) => {
  return (

    <div className="flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Activity</h2>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {postData.map((post: any, index: number) => (
        <ProfilePostCard post={post} key={index} />
      ))}
    </div>
  </div>  )
}

export default Activity