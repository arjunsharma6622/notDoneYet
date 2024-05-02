const UserProfileSkeleton = () => {
  return (
    <div className="md:w-[95%] flex gap-10 md:flex-row flex-col items-start mt-5 animate-pulse" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="w-full flex flex-col gap-5 md:flex-[9]">
        <div className="flex flex-col rounded-md border">
          <div className="relative">
            <div className="w-full h-64 bg-gray-300 rounded-tr-md rounded-tl-md"></div>
            <div className="absolute left-6 -bottom-10 border-white border-8 w-44 h-44 bg-gray-300 rounded-full"></div>
          </div>
          <div className="px-6 mt-10 flex items-start justify-between w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="h-4 bg-gray-300 rounded-md w-[30%]"></div>
              <div className="h-3 bg-gray-300 rounded-md w-[50%]"></div>
            </div>
          </div>
          <div className="px-6 mt-4 flex items-start justify-between">
            <button className="bg-gray-300 text-white py-1 px-4 rounded-full w-24 h-8"></button>
          </div>
          <div className="px-6 mt-10 flex w-full items-start justify-between">
            <div className="flex flex-col gap-4 w-full">
              <div className="h-8 bg-gray-300 rounded-full w-48"></div>
              <div className='flex flex-col gap-3 w-full'>
              {
                Array.from({ length: 5 }).map((_, index) => (
              
               <div key={index} className="h-2 bg-gray-300 rounded-full w-full"></div>

                ))
                }
                </div>
            </div>
          </div>

          <div className="px-6 mt-10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-300 rounded-full w-48"></div>
            </div>
            <div className="flex flex-wrap gap-4">
              {[44, 24, 32, 32].map((wid, index) => (
                <div key={index} className={`bg-gray-200 rounded-full px-4 py-1 h-8 w-${wid}`}></div>
              ))}
            </div>
          </div>
          <div className="px-6 mt-10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-300 rounded-full w-48"></div>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className={`bg-gray-200 rounded-md px-4 py-1 h-64 w-full`}></div>
            </div>
          </div>

        </div>
      </div>
      <div className="w-full flex flex-col md:flex-[3] h-full border  rounded-md">
        <div className="flex flex-col gap-4 items-center justify-center py-6 px-6">
        {
            Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className='h-32 w-full bg-gray-200 animate-pulse rounded-md'></div>
            ))
        }
        </div>

      </div>
    </div>
  )
}

export default UserProfileSkeleton