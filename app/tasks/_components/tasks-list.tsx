"use client";
import dayjs from "dayjs";
import { useTasks } from "../_hooks/useTasks";
import { cn } from "@/lib/utils";

export const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <div className="grid gap-4 p-4">
      {tasks?.map((task, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md px-4 py-3 hover:shadow-lg transition-shadow"
        >
          <h1 className="text-lg font-semibold mb-3 text-gray-800 relative">
            {task.title}
            <span
              className={cn(
                "bg-red-500 absolute right-[-5px] text-[12px] uppercase text-white top-[-5px] text-sm px-3 py-1 rounded-full",
                task.priority === "medium" ? "bg-purple-500" : "",
                task.priority === "low" ? "bg-green-500" : "",
              )}
            >
              {task.priority}
            </span>
          </h1>
          <div className="flex space-x-6 text-gray-600 justify-between">
            <div className="flex gap-4">
              <p>{dayjs(task.date).format("DD/MM/YYYY")}</p>
              <p>{task.time}</p>
            </div>
            <p className="capitalize">
              Status: <b>{task.status}</b>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
