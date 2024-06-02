import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SignupValidation } from "@/lib/validation/user";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  inputType = "text",
}: {
  control: Control<z.infer<typeof SignupValidation>>;
  name: FieldPath<z.infer<typeof SignupValidation>>;
  label: string;
  placeholder: string;
  inputType?: string;
}) => {
  return (
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
  );
};

export default CustomInput;
