import Sidebar from "@/components/common/Sidebar";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="flex h-full w-full items-start justify-start">
      <Sidebar />
      <div className="ml-[16.666667%] flex h-full w-full">{children}</div>
    </div>
  );
};

export default RootLayout;
