import { getCurrentUser } from "@/lib/actions/user";

import { DataTable } from "@/components/todos/TodoContainer";
import { columns } from "@/components/todos/ui/Columns";
import { IGetUser } from "@/lib/types/user";

// async function getTasks(userId: string) {
//   const data = await getUserPosts(userId);

//   // const tasks = JSON?.parse(data!.toString());

//   return z.array(taskSchema).parse(data);
// }

const ToDopage = async () => {
  const user = (await getCurrentUser()) as IGetUser;

  if (!user) throw new Error("User not found");

  // const posts = await getUserPosts(user.userId);

  // const tasks = await getTasks(user.userId);

  return <DataTable user={user} data={""} columns={columns} />;
};

export default ToDopage;
