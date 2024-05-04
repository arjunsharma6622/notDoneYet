
const UserInfoCard = ({userData} : any) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-start border rounded-md h-fit px-4 py-4"> 
        <img src={userData?.image} className="rounded-full w-20 h-20" referrerPolicy="no-referrer"/>

        <div className="flex flex-col gap-1 items-center">
            <p className="text-lg">{userData?.name}</p>
            <p className="text-xs text-center">{userData?.bio}</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
        <span>{userData?.followers?.length} Followers</span>
        <span>{userData?.following?.length} Following</span>
        </div>
    </div>
  )
}

export default UserInfoCard