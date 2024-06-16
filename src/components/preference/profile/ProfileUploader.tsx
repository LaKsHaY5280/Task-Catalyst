import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

type ProfileUploaderProps = {
  fieldChange: (files: File) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const [blob, setBlob] = useState<Blob | null>(null); // Add state to store Blob

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const newFile = acceptedFiles[0];
      setFile(newFile);
      fieldChange(newFile);

      // Convert file to Blob
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer; // Handle potential undefined
        setBlob(new Blob([arrayBuffer], { type: newFile.type }));
      };
      reader.readAsArrayBuffer(newFile);

      setFileUrl(convertFileToUrl(newFile));
    },
    [fieldChange], // Only include necessary dependencies
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="flex-center cursor-pointer gap-4">
        <Image
          src={fileUrl || ""}
          alt="image"
          width={24}
          height={24}
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-primary-500 small-regular md:bbase-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
