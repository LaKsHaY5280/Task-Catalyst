"use client";
import {
  User,
  CreditCard,
  Settings,
  Keyboard,
  LogOut,
  //   Cloud,
  //   Github,
  //   LifeBuoy,
  //   Mail,
  //   MessageSquare,
  //   Plus,
  //   PlusCircle,
  //   UserPlus,
  //   Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  //   DropdownMenuPortal,
  //   DropdownMenuSub,
  //   DropdownMenuSubContent,
  //   DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Models } from "node-appwrite";
import ClientButton from "./ClientButton";
import { signOutAccount } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import CustomDropdownMenuItem from "./CustomDropdownMenuItem";

const PreferenceMenu = ({ user }: { user: Models.Document }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOutAccount();
    router.push("/login");
  };

  const { fname, lname } = user;

  const initials =
    fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-full rounded-full border-2 border-primary p-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback className="text-xl text-primary dark:text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {fname} {lname}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <CustomDropdownMenuItem
            icon={<User className="mr-2 h-4 w-4" />}
            name="Profile"
            shortcut="⇧⌘P"
            link="/profile"
          />
          <CustomDropdownMenuItem
            icon={<CreditCard className="mr-2 h-4 w-4" />}
            name="Billing"
            shortcut="⌘B"
            link="/billing"
          />
          <CustomDropdownMenuItem
            icon={<Settings className="mr-2 h-4 w-4" />}
            name="Settings"
            shortcut="⌘S"
            link="/settings"
          />
          <CustomDropdownMenuItem
            icon={<Keyboard className="mr-2 h-4 w-4" />}
            name="Keyboard shortcuts"
            shortcut="⌘S"
            link="/Keyboard-shortcuts"
          />
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Team</span>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup> */}
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem>
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem> */}
        {/* <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem> */}

        <DropdownMenuSeparator />
        <ClientButton
          varient="ghost"
          className="h-fit w-full p-0"
          name="Logout"
          handleOnClick={handleLogout}
        >
          <DropdownMenuItem className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </ClientButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PreferenceMenu;
