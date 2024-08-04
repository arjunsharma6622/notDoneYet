import { MessageCircle } from "lucide-react";
import Sidebar from "./(components)/Sidebar";

const Page = () => {
  
  return (
  <>
    <div className="flex items-center justify-center w-full">
      <div
        className="flex justify-between gap-4 w-full mx-2 md:mx-0 md:w-[95%] mt-5 overflow-hidden"
        style={{ height: "85vh" }}
      >
        <div className='flex-[3] h-full'>
          <Sidebar />
        </div>
        <div className='flex-[9] h-full overflow-hidden hidden md:block'>
          <div className="text-gray-500 hidden md:flex w-full h-full border rounded-xl items-center gap-4 flex-col justify-center text-sm">
            <MessageCircle strokeWidth={1.5} className="w-10 h-10 " />
            <p className="text-center">
            Click on a conversation to start messaging
            </p>

          </div>

        </div>
      </div>
    </div>
  </>
  );
};

export default Page;
