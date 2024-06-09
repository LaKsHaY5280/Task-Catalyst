import Image from "next/image";
import { ModeToggle } from "../ThemeToggleButton";
import BottomGradient from "../ui/BottomGradient";
import RedirectButton from "./RedirectButton";
import { logo } from "@/assets";

import PreferenceMenu from "./PreferenceMenu";
import { Models } from "node-appwrite";
import { SparklesCore } from "../ui/sparkles";

const Navbar = ({ user }: { user: Models.Document }) => {
  return (
    <div className="relative flex w-full items-center justify-between py-3 pr-3">
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1.5}
        particleDensity={1500}
        className="absolute -z-10 hidden h-full w-full dark:block"
        particleColor="#6d28d9"
      />
      <div className="flex w-full items-center justify-start gap-10 pl-3">
        <RedirectButton
          aClassName="w-fit "
          className="flex w-fit items-center justify-start gap-1 px-0 hover:bg-transparent"
          href="/"
          name="Task Catalyst"
          varient="ghost"
        >
          <Image src={logo} alt="logo" className="h-14 w-14" />
          <h1 className="text-2xl font-bold">Task Catalyst</h1>
        </RedirectButton>

        <div className="flex items-center justify-center gap-7">
          <RedirectButton
            href="/app"
            name="Dashboard"
            varient="ghost"
            className="hover:bg-transparent hover:text-primary"
          />
          <RedirectButton
            href="/todo"
            name="To Do"
            varient="ghost"
            className="hover:bg-transparent hover:text-primary"
          />
        </div>
      </div>
      <div className="flex w-fit items-center justify-end gap-2">
        <ModeToggle />

        <PreferenceMenu user={user} />
      </div>
      <BottomGradient hover />
    </div>
  );
};

export default Navbar;
