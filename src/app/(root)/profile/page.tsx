import ProfileForm from "@/components/preference/profile/ProfileForm";
import { getCurrentUser } from "@/lib/actions/user";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-10 p-10">
      <h1 className="w-full text-4xl">Edit Profile</h1>

      <ProfileForm user={user} />
      {/* <div className="h-full">
        <div className="h-60 w-60 bg-violet-300"></div>
      </div> */}
      <div className="w-full">
        <div>name</div>
        <div>username</div>
        <div>email</div>
        <div>Course</div>
        <div>bio</div>
        <div>timetable</div>
        <div>syllabus</div>
        <div>datesheet</div>
        <div>recent todos</div>
        <div>notes</div>
      </div>
    </div>
  );
};

export default ProfilePage;
