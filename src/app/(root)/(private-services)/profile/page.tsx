import ProfileForm from "@/components/preference/profile/ProfileForm";
import { getCurrentUser } from "@/lib/actions/user";
import { BookUser } from "lucide-react";
import Image from "next/image";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-10 p-10">
      <h1 className="flex w-full items-center justify-center gap-3 text-4xl">
        {user.fname}&apos;s Character
        <BookUser size={50} absoluteStrokeWidth />
      </h1>

      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
