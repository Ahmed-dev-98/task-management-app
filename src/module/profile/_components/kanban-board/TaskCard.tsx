import { ITask } from "@/module/tasks/Tasks-list";
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
    <div className={`p-4 border rounded-lg shadow-md bg-white mb-2`}>
      <div className="flex items-center w-full  justify-between ">
        <div className="flex flex-col gap-1 items-center justify-center">
          <h4 className="font-bold text-lg">{task?.title}</h4>
          <p className="text-gray-700">{task?.description}</p>
        </div>{" "}
        <div>
          <img src={task?.image} className="h-full max-w-[50px] rounded-md" alt="" />
        </div>
      </div>
      <div className="mt-2 w-full  flex justify-between">
        <span
          className={`flex justify-center items-center px-2 py-1 text-sm min-w-[4rem] font-semibold   ${
            task?.priority === "high"
              ? "bg-red-100 text-red-600"
              : task?.priority === "medium"
              ? "bg-yellow-100 text-yellow-600 "
              : "bg-blue-100 text-blue-600"
          } rounded-sm`}
        >
          {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
        </span>
        <span
          className={` ${
            state === "todo"
              ? "bg-red-200 text-red-600"
              : state === "doing"
              ? "bg-blue-200 text-blue-600"
              : "bg-green-200 text-green-600"
          } ml-2 flex justify-center items-center px-2 py-1 text-sm min-w-[4rem] font-semibold   rounded`}
        >
          {state?.charAt(0)?.toUpperCase() + state?.slice(1)}
        </span>
        <div className="text-start relative flex justify-end   h-10 items-center  w-full">
          {task.assignedTo && task.assignedTo.length > 0 ? (
            task.assignedTo.map((emp, index) => (
              <div
                style={{
                  right: `${index * 20}px`,
                  zIndex: `{index}`,
                }}
                className="w-8 h-8 top-1/2 transform -translate-y-1/2 rounded-full text-white bg-[#294664] border border-black absolute flex justify-center items-center"
              >
                <p
                  className="text-xs font-medium cursor-default"
                  title={`${emp.given_name} ${emp.family_name}`}
                >{`${emp.given_name.charAt(0)}${emp.family_name.charAt(0)}`}</p>
              </div>
            ))
          ) : (
            <p className="italic text-gray-400">- No assigned employees -</p>
          )}{" "}
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
