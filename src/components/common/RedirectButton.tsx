import Link from "next/link";
import { Button } from "../ui/button";

const RedirectButton = ({
  href,
  name,
  varient,
  aClassName,
  className,
}: {
  href: string;
  name: string;
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
}) => {
  return (
    <Link href={href} className={`w-full px-3 ${aClassName}`}>
      <Button variant={varient} className={`w-full bg-violet-600 ${className}`}>
        {name}
      </Button>
    </Link>
  );
};

export default RedirectButton;
