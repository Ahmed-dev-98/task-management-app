import {
  BookCheck,
  ClipboardList,
  Contact,
  StickyNote,
  Users2,
} from "lucide-react";
import AnalyticsCard from "./_components/analytics-card";
import { selectEmployees } from "@/store/slices/employees.slice";
import { useAppSelector } from "@/store";
import { selectTasks } from "@/store/slices/tasks.slice";
import { TasksPieChart } from "./_components/PieChart";
import { useEffect, useState } from "react";

const Analytics = () => {
  const employees = useAppSelector(selectEmployees);
  const tasks = useAppSelector(selectTasks);
  const [doneTasks, setDoneTasks] = useState(0);
  const [doingTasks, setDoingTasks] = useState(0);
  const [todoTasks, setTodoTasks] = useState(0);
  const cards = [
    {
      count: employees?.length,
      title: "Employees",
      growth: {
        number: 12,
        description: "from last month",
      },
      icon: <Users2 size={20} />,
    },
    {
      count: tasks?.length,
      title: "Tasks",
      growth: {
        number: -13,
        description: "from last month",
      },
      icon: <ClipboardList size={20} />,
    },
    {
      count: doneTasks,
      title: "Done",
      growth: {
        number: 33,
        description: "from last month",
      },
      icon: <BookCheck size={20} />,
    },
    {
      count: doingTasks,
      title: "doing",
      growth: {
        number: 43,
        description: "from last month",
      },
      icon: <Contact size={20} />,
    },
    {
      count: todoTasks,
      title: "todo",
      growth: {
        number: -13,
        description: "from last month",
      },
      icon: <StickyNote size={20} />,
    },
  ];
  useEffect(() => {
    setDoneTasks(tasks.filter((task) => task.state === "done").length);
    setDoingTasks(tasks.filter((task) => task.state === "doing").length);
    setTodoTasks(tasks.filter((task) => task.state === "todo").length);
  }, [tasks]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex  gap-4 w-full ">
        {cards.map((card) => (
          <AnalyticsCard card={card} />
        ))}
      </div>
      <div className="h-[400px] w-1/2  flex items-end">
        <TasksPieChart
          totalCount={tasks.length}
          taskData={[
            {
              status: "todo",
              taskCount: todoTasks,
              fill: "red",
            },
            {
              status: "doing",
              taskCount: doingTasks,
              fill: "blue",
            },
            {
              status: "done",
              taskCount: doneTasks,
              fill: "green",
            },
          ]}
        />
        <h2>TODO</h2>
      </div>
    </div>
  );
};

export default Analytics;
