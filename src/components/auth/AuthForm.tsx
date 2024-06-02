"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/validation/user";
import CustomInput from "./CustomInput";
import { createUserAccount, signInAccount } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { INewUser } from "@/lib/types";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();

  const [user, setUser] = useState<INewUser>();
  const [isLoading, setIsLoading] = useState(false);

  const SignupValidation = authFormSchema(type);

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignupValidation>) {
    setIsLoading(true);

    try {
      if (type === "register") {
        const userData = {
          name: data.name!,
          username: data.username!,
          email: data.email,
          password: data.password,
        };

        const newUser = await createUserAccount(userData);

        setUser(newUser as INewUser);

        if (newUser) router.push("/");
      }

      if (type === "login") {
        const response = await signInAccount({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      AuthForm
      <div>{type === "login" || "register"}</div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === "register" && (
              <>
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
              </>
            )}
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
