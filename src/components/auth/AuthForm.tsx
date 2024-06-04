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
import { INewUser } from "@/lib/types/user";

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
      if (type === "Register") {
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

      if (type === "Login") {
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
    <div className="flex w-4/12 flex-col items-center justify-center gap-10 rounded-lg border-2 border-black bg-violet-500 p-10">
      <div className="text-3xl font-semibold">
        {
          // sourcery skip: simplify-ternary
          type === "Login" ? "Login" : "Register"
        }
      </div>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            {type === "Register" && (
              <div className="flex items-center justify-between gap-3">
                <CustomInput
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  type={type}
                />
                <CustomInput
                  control={form.control}
                  name="username"
                  label="Username"
                  placeholder="Your username"
                  type={type}
                />
              </div>
            )}
            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="your email"
              inputType="email"
              type={type}
            />
            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="your password"
              inputType="password"
              type={type}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
            <div>
              {type === "Register" ? (
                <p>
                  Already have an account?{" "}
                  <a
                    onClick={() => router.push("/login")}
                    className="cursor-pointer text-violet-950"
                  >
                    Login
                  </a>
                </p>
              ) : (
                <p>
                  Don&apos;t have an account?{" "}
                  <a
                    onClick={() => router.push("/register")}
                    className="cursor-pointer text-violet-950"
                  >
                    Register
                  </a>
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
