import { auth } from "@/auth";
import SidebarComp from "./SidebarComp";

const Sidebar = async () => {
  const session: any = await auth();
  
  return (
    <div className="h-full">
    <SidebarComp session={session} />
    </div>
  );
};

export default Sidebar;
