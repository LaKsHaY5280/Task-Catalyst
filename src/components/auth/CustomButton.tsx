import BottomGradient from "../ui/BottomGradient";
import { Button } from "../ui/button";

const CustomButton = ({
  text,
  type,
}: {
  text: string;
  type: "submit" | "button";
}) => {
  return (
    <Button
      className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      type={type}
    >
      {text}
      <BottomGradient />
    </Button>
  );
};

export default CustomButton;
