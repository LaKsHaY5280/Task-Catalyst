import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-start">
      {children}
    </div>
  );
};

export default RootLayout;
