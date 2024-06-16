"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validation/user";
import { useRouter } from "next/navigation";
import CustomInput from "./CustomInput";
import { Models } from "node-appwrite";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUser } from "@/lib/actions/user";

const ProfileForm = ({ user }: { user: Models.Document }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      // file: [],
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      bio: user?.bio || "",
      course: user?.course || "",
      year: user?.year || undefined,
      semester: user?.semester || undefined,
      section: user?.Section || "",
      // timetable: user.timetable,
      // syllabus: user.syllabus,
      // datesheet: user.datesheet,
      // recentTodos: user.recentTodos,
      // notes: user.notes,
    },
  });

  async function onSubmit(data: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.file);

      const updatedUser = await updateUser(formData, {
        userId: user.$id,
        fname: data.fname,
        lname: data.lname,
        username: data.username,
        email: data.email,
        imageUrl: user.imageUrl,
        imageId: user.imageId,
        bio: data.bio || "",
        course: data.course || "",
        year: data.year || NaN,
        semester: data.semester || NaN,
        section: data.section || "",
        // timetable: data.timetable,
        // syllabus: data.syllabus,
        // datesheet: data.datesheet,
        // recentTodos: data.recentTodos,
        // notes: data.notes,
      });

      if (!updatedUser) throw new Error("User not updated");

      router.push("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const { fname, lname } = user;

  const initials =
    fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}
        className="flex h-full w-full items-start justify-between gap-10 rounded-xl border-4 border-violet-700 p-10 shadow-[0px_0px_0px_5px_rgba(109,_40,_217,_0.4),_0px_0px_0px_10px_rgba(109,_40,_217,_0.3),_0px_0px_0px_15px_rgba(109,_40,_217,_0.2),_0px_0px_0px_20px_rgba(109,_40,_217,_0.1),_0px_0px_0px_25px_rgba(109,_40,_217,_0.05)]"
      >
        <div className="flex h-full w-fit flex-col items-center justify-start">
          {/* <Avatar className="h-52 w-52">
            <AvatarImage src={user.imageUrl ? user.imageUrl : ""} />
            <AvatarFallback className="text-9xl text-primary dark:text-white">
              {initials}
            </AvatarFallback>
          </Avatar> */}
          <CustomInput
            control={form.control}
            name="file"
            label=""
            placeholder="hii"
            itemClassName=" w-full h-full"
            profileUploader
            imageUrl={user.imageUrl}
          />
          <div className="w-full">
            <div>timetable</div>
            <div>syllabus</div>
            <div>datesheet</div>
            <div>recent todos</div>
            <div>notes</div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-5 px-10">
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <CustomInput
              control={form.control}
              name="fname"
              label="First Name"
              placeholder="Bruce"
              itemClassName=" w-[49%]"
            />
            <CustomInput
              control={form.control}
              name="lname"
              label="Last Name"
              placeholder="Wayne"
              itemClassName=" w-[49%]"
            />
          </div>
          <CustomInput
            control={form.control}
            name="username"
            label="Username"
            placeholder="@batman"
          />
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="bruce.batman@wayne.alfred"
            inputType="email"
          />

          <CustomInput
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="I am Batman🦇"
            textArea
          />
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <CustomInput
              control={form.control}
              name="course"
              label="Course"
              placeholder="MBBS"
              itemClassName=" w-[49%]"
            />
            <CustomInput
              control={form.control}
              name="year"
              label="Year"
              placeholder="2050"
              itemClassName=" w-[49%]"
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <CustomInput
              control={form.control}
              name="semester"
              label="Semester"
              placeholder="6th"
              itemClassName=" w-[49%]"
            />
            <CustomInput
              control={form.control}
              name="section"
              label="Section"
              placeholder="Morning - 2"
              itemClassName=" w-[49%]"
            />
          </div>

          <Button className="w-full" type="submit">
            Wanna Make Changes🖌️
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
