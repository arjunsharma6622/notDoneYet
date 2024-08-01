import { CalendarCheck2, Clock, Mail, MessageSquare, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const VenueContact = ({ venueData }: any) => {
    return (
        <div className="w-full flex flex-col gap-2 p-4 border rounded-md">
            <h1 className="text-xl font-semibold">Contact</h1>
            <div className="flex items-center gap-4">
                <Link href={`tel:${venueData?.number}`} className="flex items-center gap-3 w-fit h-fit px-4 py-2 rounded-full bg-blue-100 text-blue-500">
                    <PhoneCall strokeWidth={1.5} className="w-5 h-5" />
                    <span className="text-sm">Call</span>
                </Link>
                <Link href={`sms:${venueData?.number}`} className="flex items-center gap-3 w-fit h-fit px-4 py-2 rounded-full bg-blue-100 text-blue-500">
                    <MessageSquare strokeWidth={1.5} className="w-5 h-5" />
                    <span className="text-sm">Quick chat</span>
                </Link>
                <Link href={`mailto:${venueData?.email}`} className="flex items-center gap-3 w-fit h-fit px-4 py-2 rounded-full bg-blue-100 text-blue-500">
                    <Mail strokeWidth={1.5} className="w-5 h-5" />
                    <span className="text-sm">Email</span>
                </Link>
            </div>

            <div>
                <p className="text-sm text-gray-500">We are available from </p>
                <div className="flex items-center gap-2">
                    <CalendarCheck2 className="inline w-4 h-4" />
                    {venueData?.sports[0].timing?.startDay} - {venueData?.sports[0].timing?.endDay}
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="inline w-4 h-4" />
                    {venueData?.sports[0].timing?.startTime} - {venueData?.sports[0].timing?.endTime}
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-500 font-normal">Reach out to use on social media!</p>
                <div className="flex items-center gap-4">
                    {venueData?.socialLinks?.map((social: any, index: number) => (
                        <Link key={index} href={social.link}>
                            <Image
                                className="w-6"
                                width={24}
                                height={24}
                                src={`/images/social/${social.name}.png`}
                                alt=""
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
)}

export default VenueContact