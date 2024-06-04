"use client";
import ClientButton from "./ClientButton";
import RedirectButton from "./RedirectButton";
import { signOutAccount } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOutAccount();
    router.push("/login");
  };

  return (
    <div className="fixed flex h-screen w-2/12 flex-col items-start justify-between border-r-2 border-violet-950 py-10">
      <RedirectButton href="/" name="Task Catalyst" varient="outline" />

      <div className="flex w-full flex-col items-center justify-center gap-7">
        <RedirectButton href="/app" name="Dashboard" varient="outline" />
        <RedirectButton href="/todo" name="Todo App" varient="outline" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-7">
        <RedirectButton href="/profile" name="Profile" varient="outline" />
        <RedirectButton href="/" name="Settings" varient="outline" />

        <div className="w-full px-3">
          <ClientButton
            name="Logout"
            varient="outline"
            className="w-full bg-violet-600"
            handleOnClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
