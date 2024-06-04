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
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className=" w-full border-none bg-violet-200"
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
  );
};

export default CustomInput;
