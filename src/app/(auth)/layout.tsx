import Image from 'next/image'
import React from 'react'

const layout = ({ children }: any) => {
    return (
        <div className="flex flex-col-reverse gap-4 md:gap-0 md:flex-row m-auto md:min-h-[calc(100vh-200px)] justify-between items-center mt-4 md:mt-10 w-full md:w-[80%] mx-auto">
            <div className="flex-[2] flex">
                <Image width={500} height={500} src="/images/network.svg" alt="" className="w-full" />
            </div>
            <div className="flex-[3] w-full md:w-1/2 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}

export default layout