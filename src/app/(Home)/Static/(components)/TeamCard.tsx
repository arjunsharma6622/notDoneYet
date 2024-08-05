import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Linkedin, Phone } from "lucide-react"

export default function TeamCard({teamMember} : any) {
  return (
    <Card className="w-full max-w-sm p-4 md:p-6 grid gap-6">
      <div className="flex items-center gap-4">
        <Image src={`/static/images/team/${teamMember.image}`} alt="Placeholder" width={80} height={80} className="w-14 md:w-20 h-14 md:h-20 rounded-full"/>
        <div className="grid gap-1">
          <div className="text-base md:text-lg font-semibold">{teamMember?.name}</div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Link href={`${teamMember?.linkedin}`} target="_blank" className="flex items-center gap-1" prefetch={false}>
              <Linkedin strokeWidth={1.5} className="w-4 h-4 md:w-6 md:h-6" />
              <span className="text-xs md:text-sm">LinkedIn</span>
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href={`https://wa.me/${teamMember?.whatsapp}`} target="_blank" className="flex items-center gap-1" prefetch={false}>
              <Phone strokeWidth={1.5} className="w-4 h-4 md:w-6 md:h-6" />
              <span className="text-xs md:text-sm">WhatsApp</span>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
