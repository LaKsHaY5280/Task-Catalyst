import { getCurrentUser } from "@/lib/actions/user";
import { IGetUser } from "@/lib/types/user";
import { BookUser, GraduationCap, Star } from "lucide-react";
import Image from "next/image";
import EditButton from "./_components/EditButton";
import { student } from "@/assets";
import CustomAccordian from "./_components/CustomAccordian";
import { CustomTabs } from "./_components/CustomTabs";

const ProfilePage = async () => {
  const user = (await getCurrentUser()) as IGetUser;

  if (!user) throw new Error("User not found");

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-10 p-10">
      {/* <h1 className="flex w-full items-center justify-center gap-3 text-4xl">
        {user.fname}&apos;s Character
        <BookUser size={50} absoluteStrokeWidth />
      </h1> */}

      <div className="flex h-full w-full items-start justify-around gap-5">
        <div className="flex h-full w-1/3 flex-col items-center justify-center gap-5">
          <Image
            src={user.imageUrl}
            alt="User Image"
            width={500}
            height={500}
            className="w-7/12 rounded-lg"
          />
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <CustomAccordian />
          </div>
        </div>
        <div className="flex w-2/3 flex-col items-start justify-center gap-5 pl-5">
          <div>
            <div className="flex items-center justify-center gap-3 text-6xl font-bold">
              {user.fname} {user.lname}
              <EditButton />
            </div>
            <div className="text-xl text-primary">{user.username}</div>
          </div>
          <div className="flex flex-col items-start justify-center gap-3">
            <div className="flex items-center justify-center gap-3">
              <GraduationCap absoluteStrokeWidth />
              {user.course && user.year && user.semester && user.section ? (
                `${user.course} ${user.year} ${user.semester} ${user.section}`
              ) : (
                <div className="flex items-center justify-center gap-1">
                  Not a student
                  <Image
                    src={student}
                    height={20}
                    width={20}
                    alt="not a student"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3">
              <Star absoluteStrokeWidth />
              {user.bio ? user.bio : "Nothing to tell🥹"}
            </div>
          </div>
          <div className=" w-full">
            <CustomTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
