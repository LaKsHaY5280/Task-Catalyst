import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { authFormSchema } from "@/lib/validation/user";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import { cn } from "@/lib/utils";

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  inputType = "text",
  type,
}: {
  control: Control<z.infer<typeof SignupValidation>>;
  name: FieldPath<z.infer<typeof SignupValidation>>;
  label: string;
  placeholder: string;
  inputType?: string;
  type: string;
}) => {
  const SignupValidation = authFormSchema(type);
  return (
    <LabelInputContainer>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                type={inputType}
                autoComplete="true"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </LabelInputContainer>
  );
};

export default CustomInput;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};