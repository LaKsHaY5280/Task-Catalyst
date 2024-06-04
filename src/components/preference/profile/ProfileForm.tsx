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
import Image from "next/image";

const ProfileForm = ({ user }: { user: Models.Document }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      imageUrl: user.imageUrl,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      bio: user.bio,
      course: user.course,
      year: user.year,
      semester: user.semester,
      section: user.Section,
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full items-center justify-between gap-10 border-2 border-violet-400 p-10"
      >
        <div className="h-full">
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.name}
              className="h-60 w-60 bg-violet-300"
            />
          ) : (
            <div className="h-60 w-60 bg-violet-300"></div>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <CustomInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your name"
            />
            <CustomInput
              control={form.control}
              name="username"
              label="Username"
              placeholder="Your username"
            />
          </div>
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="your email"
            inputType="email"
          />
          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="your password"
            inputType="password"
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
