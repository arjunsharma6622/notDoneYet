import { auth } from "@/auth";
import ConversationPage from "./ConversationPage";

const Page = async ({ params }: { params: { newUserId: string } }) => {
    const newUserId = params.newUserId
    const session = await auth();

    return (
        <>
            {session && newUserId &&
                <div className="flex items-center justify-center w-full mt-0">
                    <div
                        className="flex justify-between gap-4 md:w-[95%] overflow-hidden"
                        style={{ height: "90vh" }}
                    >
                        <div className='w-full mx-2 md:w-[70%] md:mx-auto h-full overflow-hidden'>
                            <div className="h-full">
                                <ConversationPage session={session} newUserId={newUserId} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Page;
