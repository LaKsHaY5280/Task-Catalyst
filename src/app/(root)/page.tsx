import { Button } from "@/components/ui/button";
import {
  createVerification,
  getAccount,
  getCurrentUser,
} from "@/lib/actions/user";
import Link from "next/link";
import Verify from "./_components/verify";

const HomePage = async () => {
  const user = await getCurrentUser();
  const acc = await getAccount();
  // console.log(acc?.emailVerification);

  return (
    <div className="flex justify-around">
      <div>{user?.fname}</div>
      <div>HomePage</div>
      <div>
        <Button>
          <Link href="/login">login</Link>
        </Button>
        <Button>
          <Link href="/register">register</Link>
        </Button>
        {acc?.emailVerification ? (
          <div>email verified</div>
        ) : (
          <>
            <div>email not verified</div>
            <Verify />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
