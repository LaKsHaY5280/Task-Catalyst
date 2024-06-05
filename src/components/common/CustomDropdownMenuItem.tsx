import { User } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import Link from "next/link";

const CustomDropdownMenuItem = ({
  icon,
  name,
  shortcut,
  link,
}: {
  icon: React.ReactNode;
  name: string;
  shortcut: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <DropdownMenuItem>
        {icon}
        <span>{name}</span>
        {/* <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut> */}
      </DropdownMenuItem>
    </Link>
  );
};

export default CustomDropdownMenuItem;
