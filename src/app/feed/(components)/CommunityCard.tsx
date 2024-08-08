import { whatsAppCommunityLink } from '@/utils/data'
import Image from 'next/image'
import Link from 'next/link'

const CommunityCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl flex p-4 flex-col gap-4">
    <div className="flex items-center flex-col gap-2">
      <Image src={"/ndy_logo_dark.png"} width={50} height={50} alt="logo" className="rounded-full w-20 h-20" />
      <div className="text-gray-500">
        <p className="text-lg">NDY Community</p>
        <p className="text-sm -mt-1">WhatsApp Group Invite</p>
      </div>
      <Link href={whatsAppCommunityLink} className="bg-teal-600 rounded-full p-3 text-sm text-white px-6 mt-2">Join Chat</Link>
    </div>

    <div className="border-t border-gray-200 pt-4 flex flex-col items-center gap-4">
      <Image src={"/static/images/network.svg"} width={50} height={50} alt="logo" className="w-[90%] mx-auto" />
      <p className="text-sm text-gray-500">Bringing the entire sports industry together</p>
    </div>


  </div>  )
}

export default CommunityCard