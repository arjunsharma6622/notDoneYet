import { auth } from "@/auth";
import ConversationPage from "./ConversationPage";
import { MessageCircle } from "lucide-react";
import Sidebar from "../(components)/Sidebar";


const Page = async ({ params }: { params: { conversationId: string } }) => {
    const conversationId = params.conversationId

    const session = await auth();
    return (
        <>

        <div className="flex items-center justify-center w-full">
      <div
        className="flex justify-between gap-4 md:w-[95%] mt-5 overflow-hidden"
        style={{ height: "85vh" }}
      >
        {/* <div className='flex-[3] h-full hidden md:block'>
          <Sidebar />
        </div> */}
        <div className='w-full mx-2 md:w-[70%] md:mx-auto h-full overflow-hidden'>
        <div className="h-full"> 
            { session && conversationId &&
            <ConversationPage session={session} currentConversationId={conversationId}/>
            }
        </div>
        </div>
      </div>
    </div>

    </>

    );

};

export default Page;
