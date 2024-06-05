"use client";

import { Button } from "../ui/button";

const ClientButton = ({
  name,
  children,
  varient,
  className,
  handleOnClick,
}: {
  name?: string;
  children?: React.ReactNode;
  varient?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
  handleOnClick?: () => void;
}) => {
  return (
    <Button className={className} variant={varient} onClick={handleOnClick}>
      {children || name}
    </Button>
  );
};

export default ClientButton;
