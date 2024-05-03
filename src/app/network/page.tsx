import fetchFollowing from '@/actions/fetchFollowing'
import { unfollowUser } from '@/actions/user'
import { auth } from '@/auth'
import { toast } from 'sonner'


const Page = async () => {
  const session : any = await auth()

  const following = await fetchFollowing(session?.user?._id).then((data) => {
    return data}).catch((err) => {
      console.log(err)
    })


  const handleUnfollowUser = async (userId : string) => {
    try {
      await unfollowUser(userId, session.user._id);
      console.log("done");
      toast.success("User Unfollowed");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='flex items-center justify-center w-full'>
      <div className='flex justify-between gap-4 items-start md:w-[90%] mt-5'>
        <div className='flex-[9] w-full flex flex-col gap-4 border rounded-md '>
          <div className='w-full px-5 border-b py-4'>
      <h1 className='text-2xl font-bold'>Atheletes You Follow</h1>
      <p>You Follow {following?.length} athletes</p>
      </div>

      <div className='flex flex-col px-5'>
        {following?.map((follow : any, index : number) => (
        <div key={follow._id} className={`flex gap-2 items-center justify-between py-5 ${index !== following.length - 1 && 'border-b border-gray-300'}`}>
          <div className='flex gap-2'>
          <div className='w-14'>
          <img src={follow?.image} referrerPolicy='no-referrer' alt="" className='w-14 h-14 object-cover rounded-full'/>
          </div>

          <div>
          <h1 className=''>{follow?.name}</h1>
          <p className='text-gray-600 text-sm'>{follow?.bio}</p>
          </div>
          </div>

          <div className='flex items-center gap-4 text-sm'>
          <button className='px-4 py-2 bg-primary text-white rounded-md'>Message</button>
          <form action={async () => { "use server"; handleUnfollowUser(follow._id)}}>
          <button className='px-4 py-2 bg-red-500 text-white rounded-md' type='submit'>Unfollow</button>
          </form>
          </div>

        </div>
        ))}
      </div>
      </div>


      <div className='flex-[3] w-full'>
        
      </div>
      </div>
    </div>
  )
}

export default Page