import Navbar from "@/components/common/Navbar";
import { getCurrentUser } from "@/lib/actions/user";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start">
      <Navbar user={user || undefined} />
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
