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
import { Textarea } from "@/components/ui/textarea";

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  inputType = "text",
  className,
  itemClassName,
  textArea,
}: {
  control: Control<z.infer<typeof profileSchema>>;
  name: FieldPath<z.infer<typeof profileSchema>>;
  label: string;
  placeholder: string;
  inputType?: string;
  className?: string;
  itemClassName?: string;
  textArea?: boolean;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`w-full ${itemClassName} `}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {textArea ? (
              <Textarea
                className={`h-full w-full bg-violet-200 ${className} `}
                placeholder={placeholder}
                rows={5}
                {...field}
              />
            ) : (
              <Input
                className={`w-full bg-violet-200 ${className} `}
                placeholder={placeholder}
                {...field}
                type={inputType}
                autoComplete="true"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
