"use client";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, MessageCirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { addTodo } from "@/lib/actions/todos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/lib/validation/todos";
import { Models } from "node-appwrite";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";

const AddToDoForm = ({ user }: { user: Models.Document }) => {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) throw new Error("User not found");

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      desc: "",
      tags: "",
      dueDate: new Date(),
      creator: user.id,
    },
  });

  async function onSubmit(data: z.infer<typeof todoSchema>) {
    setIsLoading(true);

    if (!data.tags) data.tags = "";

    const tags = data.tags.split(" ");

    try {
      const todo = {
        title: data.title,
        desc: data.desc,
        priority: data.priority || "neutral",
        labels: data.labels || "miscellaneous",
        tags: tags || data.tags || undefined,
        dueDate: date,
        status: data.status || "Todo",
        creator: user.userId,
      };

      if (!todo) throw new Error("Todo not found");

      const response = await addTodo(todo);
      setIsLoading(false);

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleRemoveSubtask = (index: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 px-2 lg:px-3">
          <MessageCirclePlus className="mr-2 h-4 w-4" />
          <p>Add</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-10/12 h-9/12 max-h-full w-9/12">
        <DialogHeader>
          <DialogTitle className="text-3xl">Be brief💭</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full items-center justify-center gap-4"
          >
            <div className="flex h-full w-full flex-col items-start justify-center gap-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        divClassName="w-full"
                        className="w-full"
                        placeholder="Mission Title"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex h-full w-full items-center justify-between gap-5">
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem className="flex h-full w-full items-center gap-4">
                      <FormControl>
                        <Textarea
                          divClassName="w-full h-full"
                          className="h-full w-full"
                          placeholder="Details of the Work Load"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex h-full w-full flex-col items-start justify-start gap-5">
                  <div className="flex items-center justify-center gap-3">
                    Wanna be specific🐾 -&gt;
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 px-2 lg:px-3"
                      onClick={handleAddSubtask}
                    >
                      +
                    </Button>
                  </div>
                  {subtasks.length > 0 ? (
                    <ScrollArea className="flex max-h-72 w-full flex-col items-center justify-center gap-10 rounded-sm border border-primary p-2 pr-3">
                      {subtasks.map((subtask, index) => (
                        <div
                          key={index}
                          className="flex h-full w-full items-center justify-center gap-3"
                        >
                          <Input
                            key={index}
                            divClassName="w-full mb-2"
                            className="w-full"
                            placeholder="Subtask"
                            value={subtask}
                            onChange={(e) =>
                              handleSubtaskChange(index, e.target.value)
                            }
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="h-10 px-2 lg:px-3"
                            onClick={() => handleRemoveSubtask(index)}
                          >
                            -
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  ) : (
                    <p className="items- flex h-full w-full items-center justify-center rounded-sm border border-primary text-muted-foreground">
                      No subtasks
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex h-full w-3/12 flex-col items-end justify-between gap-5">
              <div className="flex h-full w-full flex-col items-center justify-start gap-5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "w-full justify-start border-b-2 border-primary bg-transparent text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <Select
                      onValueChange={(value) =>
                        setDate(addDays(new Date(), parseInt(value)))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent
                        className="border-b-2 border-primary"
                        position="popper"
                      >
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border-b-2 border-primary">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="flex w-full items-center gap-4">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-neutral-400">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="labels"
                  render={({ field }) => (
                    <FormItem className="flex w-full items-center gap-4">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-neutral-400">
                            <SelectValue placeholder="Labels" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="study">Study</SelectItem>
                            <SelectItem value="homework">Homework</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="exam">Exam</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex w-full items-center gap-4">
                      <FormControl>
                        <Input
                          divClassName="w-full"
                          className="w-full"
                          placeholder="#tags #for #categories"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToDoForm;
