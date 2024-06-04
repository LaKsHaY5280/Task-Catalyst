import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileSchema } from "@/lib/validation/user";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  inputType = "text",
}: {
  control: Control<z.infer<typeof profileSchema>>;
  name: FieldPath<z.infer<typeof profileSchema>>;
  label: string;
  placeholder: string;
  inputType?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="w-full border-none bg-violet-200"
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
