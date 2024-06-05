import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/user";
import Link from "next/link";

const HomePage = async () => {
  const user = await getCurrentUser();
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
      </div>
    </div>
  );
};

export default HomePage;
