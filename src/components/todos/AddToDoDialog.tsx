import AddToDoForm from "./AddToDoForm";
import { getCurrentUser } from "@/lib/actions/user";

const AddToDoDialog = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  return <AddToDoForm user={user} />;
};

export default AddToDoDialog;
