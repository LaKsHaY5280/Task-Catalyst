import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <div className="flex h-full w-full flex-col items-start justify-start">
      <Navbar user={user || undefined} />
      <div className="flex h-full w-full">{children}</div>
    </div>
  );
};

export default RootLayout;
