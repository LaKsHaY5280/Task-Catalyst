"use client";
import { Button } from "@/components/ui/button";
import { createVerification } from "@/lib/actions/user";

const Verify = () => {
  const onSubmit = async () => {
    await createVerification("http://localhost:3000/email-verify");
  };
  return (
    <Button>
      <div onClick={() => onSubmit()}>Verify</div>
    </Button>
  );
};

export default Verify;
