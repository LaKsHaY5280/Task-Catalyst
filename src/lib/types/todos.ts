export type IToDo = {
  title: string;
  desc?: string;
  priority: string;
  labels: string;
  tags?: string[];
  dueDate?: Date;
  status: string;
  creator: string;
};
