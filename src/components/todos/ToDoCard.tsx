import { Badge } from "../ui/badge";

const ToDoCard = ({
  post,
}: {
  post: {
    id: string;
    title: string;
    desc: string;
    dueDate: string;
    tags: string[];
  };
}) => {
  const { id, title, desc, dueDate, tags } = post;

  const formattedDate = new Date(dueDate).toLocaleDateString();
  return (
    <div className="m-auto flex w-[31%] flex-col items-center justify-center gap-5 border-2 border-violet-400 bg-violet-400 p-5">
      <div className="flex w-full items-center justify-between">
        <div className="">{title}</div>
        <div className="flex items-center justify-center gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex w-full items-center justify-start">{desc}</div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline">I</Badge>

          <div>{formattedDate}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button className="rounded-lg bg-violet-500 px-3 py-1 text-white">
            Edit
          </button>
          <button className="rounded-lg bg-violet-500 px-3 py-1 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoCard;
