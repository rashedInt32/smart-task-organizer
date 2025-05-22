"use client";
import { FormEvent, useEffect, useState } from "react";
import { getDataFromOpenAI, Task } from "../action";
import { createTask, getTasks } from "@/lib/db/queries";
import { User } from "@/lib/db/types";
import { tryCatch } from "@jsts-utils/trycatch";
import { useUser } from "@/lib/auth";
import { useStore } from "@/lib/store";

export const useTasks = () => {
  const { tasks, setTasks } = useStore();
  const [task, setTask] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await getDataFromOpenAI(task);
    if (!data?.title || !data?.priority) return;

    const taskInput = {
      userId: user?.id ?? null,
      date: data.date,
      time: data.time,
      title: data.title,
      priority: data.priority,
    };
    //await createTask(taskInput);
    const { response, error } = await tryCatch(createTask(taskInput));
    setIsLoading(false);
    setTask("");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks(user?.id ?? 0);
      const tasksWithLocalTime = tasks.map((task) => ({
        ...task,
        user: null,
        time: new Date(`${task.date}T${task.time}`).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        ),
      }));
      setTasks(tasksWithLocalTime);
    };
    fetchTasks();
  }, [user, isLoading]);

  return { tasks, setTasks, onSubmit, task, setTask, isLoading, setIsLoading };
};
