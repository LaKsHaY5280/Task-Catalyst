import Link from "next/link";
import { Button } from "../ui/button";

const RedirectButton = ({
  href,
  name,
  children,
  varient,
  aClassName,
  className,
  underline,
}: {
  href: string;
  name?: string;
  children?: React.ReactNode;
  varient?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  aClassName?: string;
  className?: string;
  underline?: boolean;
}) => {
  return (
    <Link href={href} className={aClassName}>
      <Button
        variant={varient}
        className={`w-full ${className} ${underline ? "underline" : ""} `}
      >
        {children || name}
      </Button>
    </Link>
  );
};

export default RedirectButton;
