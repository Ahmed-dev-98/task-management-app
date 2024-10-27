import { ITask } from "@/app/types/types";
import { useAppSelector } from "@/store";
import { selectTasks } from "@/store/slices/tasks.slice";
import { useEffect, useState } from "react";

const TaskCard = ({ task }: { task: ITask }) => {
  const tasks = useAppSelector(selectTasks);
  const [state, setState] = useState(task?.state);

  useEffect(() => {
    const taskState = tasks.find((e) => e.id === task?.id)?.state;
    if (taskState) setState(taskState);
  }, [tasks]);

  return (
    <div className="p-5 border rounded-lg shadow-md bg-white mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-sm">{task?.title}</h4>
          <p className="text-gray-600 text-xs line-clamp-3">
            {task?.description}
          </p>
        </div>
        {task.image && (
          <img
            src={task.image}
            className="h-12 w-12 rounded-md object-cover"
            alt="Task"
          />
        )}
      </div>
      <div className="mt-2 flex items-center justify-start  space-x-2 w-full ">
        <span
          className={`flex justify-center items-center px-2 py-1 text-xs font-semibold rounded ${
            task.priority === "high"
              ? "bg-red-100 text-red-600"
              : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
        </span>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            state === "todo"
              ? "bg-red-200 text-red-600"
              : state === "doing"
              ? "bg-blue-200 text-blue-600"
              : "bg-green-200 text-green-600"
          }`}
        >
          {state?.charAt(0).toUpperCase() + state?.slice(1)}
        </span>
        <div className=" flex ">
          {task.assignedTo && task.assignedTo.length > 0 ? (
            task.assignedTo.map((emp) => (
              <div
                key={emp.id}
                className="w-6 h-6 rounded-full text-white bg-[#294664] border border-white  flex items-center justify-center"
                title={`${emp.given_name} ${emp.family_name}`}
              >
                <p className="text-[8px] font-medium cursor-default">
                  {`${emp.given_name.charAt(0)}${emp.family_name.charAt(0)}`}
                </p>
              </div>
            ))
          ) : (
            <p className="italic text-[8px] text-gray-400">
              No assigned employees
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
