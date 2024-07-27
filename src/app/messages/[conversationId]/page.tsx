import { auth } from "@/auth";
import ConversationPage from "./ConversationPage";

const Page = async ({ params }: { params: { conversationId: string } }) => {
    const conversationId = params.conversationId
    const session = await auth();

    return (
        <>
            {session && conversationId &&
                <div className="flex items-center justify-center w-full">
                    <div
                        className="flex justify-between gap-4 md:w-[95%] mt-5 overflow-hidden"
                        style={{ height: "85vh" }}
                    >
                        <div className='w-full mx-2 md:w-[70%] md:mx-auto h-full overflow-hidden'>
                            <div className="h-full">

                                <ConversationPage session={session} currentConversationId={conversationId} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Page;
