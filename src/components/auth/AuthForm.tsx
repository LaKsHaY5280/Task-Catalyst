"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "@/lib/validation/user";
import CustomInput from "./CustomInput";
import {
  createUserAccount,
  signInAccount,
  signUpWithGoogle,
} from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { INewUser } from "@/lib/types/user";
import React from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "../ui/button";
import BottomGradient from "../ui/BottomGradient";
import CustomButton from "./CustomButton";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();

  const [user, setUser] = useState<INewUser>();
  const [isLoading, setIsLoading] = useState(false);

  const SignupValidation = authFormSchema(type);

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      fname: "",
      lname: "",
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
          fname: data.fname!,
          lname: data.lname!,
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

  async function onGoogleSubmit() {
    // Google Auth
    const gauth = await signUpWithGoogle();

    if (gauth) {
      router.push("/");
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
        {
          // sourcery skip: simplify-ternary
          type === "Login" ? "Login" : "Register"
        }
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {type === "Login"
          ? "Login to your account"
          : "Create an account to get started"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          {type === "Register" && (
            <>
              <div className="flex w-full flex-wrap items-center justify-between gap-3">
                <CustomInput
                  control={form.control}
                  name="fname"
                  label="First Name"
                  placeholder="Bruce"
                  itemClassName="w-full"
                  labelClassName="w-[45%]"
                  type={type}
                />
                <CustomInput
                  control={form.control}
                  name="lname"
                  label="Last Name"
                  placeholder="Wayne"
                  itemClassName="w-full"
                  labelClassName="w-[45%]"
                  type={type}
                />
              </div>
              <CustomInput
                control={form.control}
                name="username"
                label="Username"
                placeholder="@batman"
                type={type}
              />
            </>
          )}
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="bruce.batman@wayne.alfred"
            inputType="email"
            type={type}
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="********"
            inputType="password"
            type={type}
          />
          <CustomButton text={type} type="submit" />
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </Form>
      <div className="flex w-full items-center justify-between gap-5 pb-3">
        <Button
          className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          onClick={onGoogleSubmit}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            Google
          </span>
          <BottomGradient />
        </Button>

      </div>
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
              className="cursor-pointer underline underline-offset-2"
            >
              Register
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

