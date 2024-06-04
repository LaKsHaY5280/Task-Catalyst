"use client";

import { Button } from "../ui/button";

const ClientButton = ({
  name,
  varient,
  className,
  handleOnClick,
}: {
  name: string;
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
      {name}
    </Button>
  );
};

export default ClientButton;
