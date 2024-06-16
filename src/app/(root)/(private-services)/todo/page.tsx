import AddToDoDialog from "@/components/todos/AddToDoDialog";
import ToDoCard from "@/components/todos/ToDoCard";
import { getUserPosts } from "@/lib/actions/todos";
import { getCurrentUser } from "@/lib/actions/user";

const ToDopage = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  const posts = await getUserPosts(user.userId);

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-10 p-10">
      <h1 className="text-4xl font-bold text-violet-300">Todo App</h1>

      <div className="flex w-full items-center justify-between">
        {/* <Label htmlFor="todo">Add Todo</Label> */}

        <AddToDoDialog />
      </div>
      <div className="flex h-full w-full flex-wrap gap-5 rounded-lg border-2 border-violet-400 p-5">
        {posts?.total == 0 ? (
          <div className="text-violet-300">No Todos Found</div>
        ) : (
          posts?.documents.map((post: any) => (
            <ToDoCard key={post.$id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default ToDopage;
