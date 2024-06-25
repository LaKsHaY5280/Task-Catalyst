import { getCurrentUser } from "@/lib/actions/user";

import { DataTable } from "@/components/todos/TodoContainer";
import { columns } from "@/components/todos/ui/Columns";
import { IGetUser } from "@/lib/types/user";
import { getUserPosts } from "@/lib/actions/todos";

const ToDopage = async () => {
  const user = (await getCurrentUser()) as IGetUser;

  if (!user) throw new Error("User not found");

  const posts = await getUserPosts(user.userId);
  console.log(posts);

  return <DataTable user={user} data={posts} columns={columns} />;
};

export default ToDopage;
