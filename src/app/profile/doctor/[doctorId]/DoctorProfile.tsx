import { followUser, unfollowUser } from "@/actions/user";

import { auth } from '@/auth';
import DoctorEducationCard from '@/components/DoctorEducationCard';
import DoctorExperienceCard from '@/components/DoctorExperienceCard';

const DoctorProfile = async ({userData} : any) => {
  const session:any = await auth()
  
  const handleFollowClick = async () => {
    "use server"
    try {
      await followUser(userData._id, session?.user._id);
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleUnfollowClick = async () => {
    "use server"
    try {
      await unfollowUser(userData._id, session?.user?._id);
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };
  
  return (
    <div>
    <div className="flex flex-col rounded-md border">
      <div className="relative">
        <img
          src={
            "https://www.fr.com/images/demo/fish-richardson-header-default.png"
          }
          alt=""
          className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
        />
        <img
          src={
            userData.profileImg ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
          className="absolute left-6 -bottom-10 border-white border-8 w-44 h-44 object-cover rounded-full"
        />
      </div>
      <div className="px-6 mt-10 flex items-start justify-between">
        <div className="flex flex-col gap-0">
        <span className="text-xs">Doctor</span>

            <div className='flex items-center gap-4'>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <div>
            <img src="/images/doctorSymbol.png" alt="" className='w-8 h-8'/>
          </div>
          </div>

          <h1 className='mt-1'>{userData.bio}</h1>
        </div>
      </div>

      {userData.followers.includes(session?.user._id) ? (
        <div className="px-6 flex items-start justify-between">
          <form action={handleUnfollowClick}>
          <button
            className="bg-blue-600 text-white py-1 px-4 rounded-sm"
            type="submit"
          >
            Unfollow
          </button>
          </form>
        </div>
      ) : (
        <div className="px-6 flex items-start justify-between">
          <form action={handleFollowClick}>
          <button
            className="bg-blue-600 text-white py-1 px-4 rounded-sm"
            type="submit"
          >
            Follow
          </button>
          </form>
        </div>
      )}

      <div className="px-6 mt-10 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">About</h2>
          <p>{userData.about}</p>
        </div>
      </div>

      <div className="px-6 mt-10 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Sports</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {userData.sports?.map((sport : string) => (
            <div
              key={sport}
              className="bg-gray-200 rounded-full px-4 py-1"
            >
              <span className="">{sport}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Activity</h2>
        </div>

        <div className="flex flex-col gap-2">
          {userData.posts.map((post : any, index : number) => (
            <div
              key={index}
              className="border rounded-md px-5 py-5 flex flex-row items-start"
            >
              <div>
                <img src={post.images[0]} alt="" className='w-24 h-24 object-cover rounded-md'/>
              </div>
              <div className="flex flex-col gap-1 text-sm pt-2 pb-3">
                <p>{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Experience</h2>
        </div>

        <div className="flex flex-col gap-2">
          {userData.experience?.map((experience : any, index : number) => (
            <DoctorExperienceCard key={index} experience={experience}/>
          ))}
        </div>
      </div>

      <div className="px-6 mt-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Experience</h2>
        </div>

        <div className="flex flex-col gap-2">
          {userData.education?.map((education : any, index : number) => (
            <DoctorEducationCard key={index} educationDetails={education}/>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default DoctorProfile