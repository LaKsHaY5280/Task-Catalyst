import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return (
    <div className="flex h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
