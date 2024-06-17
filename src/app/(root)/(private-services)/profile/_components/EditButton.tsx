"use client";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";

const EditButton = () => {
  const router = useRouter();

  return (
    <NotebookPen
      size={40}
      absoluteStrokeWidth
      className="hover:text-primary"
      onClick={() => {
        router.push("/profile/edit");
      }}
    />
  );
};

export default EditButton;
