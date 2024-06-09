"use client";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  SelectItem,
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { getCurrentUser } from "@/lib/actions/user";

const AddToDoForm = ({ user }: { user: Models.Document }) => {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>();
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
        tags: tags || data.tags || undefined,
        dueDate: date,
        creator: user.userId,
      };

      if (!todo) throw new Error("Todo not found");

      const response = await addTodo(todo);
      setIsLoading(false);
      setOpen(false);

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Todos</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add ToDos</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Title</FormLabel>
                    <FormControl>
                      <Input
                        divClassName="col-span-3"
                        className="w-full"
                        placeholder="Task title"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Tags</FormLabel>
                    <FormControl>
                      <Input
                        divClassName="col-span-3"
                        className="w-full"
                        placeholder="tags"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="grid w-full grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        divClassName="col-span-3"
                        className="w-full"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Due Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "w-[280px] justify-start border-b-2 border-primary bg-transparent text-left font-normal",
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
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToDoForm;
