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
import { TaskBarChart } from "./_components/BarChart";

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

  const overTimeExampleData = [
    {
      date: "2024-10-01",
      todo: todoTasks * Math.random(),
      doing: doingTasks * Math.random(),
      done: doneTasks * Math.random(),
    },
    {
      date: "2024-11-02",
      todo: todoTasks * Math.random(),
      doing: doingTasks * Math.random(),
      done: doneTasks * Math.random(),
    },
  ];

  useEffect(() => {
    setDoneTasks(tasks.filter((task) => task.state === "done").length);
    setDoingTasks(tasks.filter((task) => task.state === "doing").length);
    setTodoTasks(tasks.filter((task) => task.state === "todo").length);
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
      {cards.map((card, index) => (
        <AnalyticsCard key={index} card={card} />
      ))}

      <div className="col-span-1 md:col-span-2  w-1/2">
        <h2 className="text-xl font-bold mb-2">Task Status Overview</h2>
        <TasksPieChart
          totalCount={tasks.length}
          taskData={[
            {
              status: "todo",
              taskCount: todoTasks,
              fill: "hsl(0, 100%, 50%)",
            },
            {
              status: "doing",
              taskCount: doingTasks,
              fill: "hsl(240, 100%, 50%)",
            },
            {
              status: "done",
              taskCount: doneTasks,
              fill: "hsl(120, 100%, 50%)",
            },
          ]}
        />
      </div>
      <div className="col-span-1 md:col-span-2  w-1/2">
        <h2 className="text-xl font-bold mb-2">Task Counts Over Time</h2>
        <TaskBarChart data={overTimeExampleData} />
      </div>
    </div>
  );
};

export default Analytics;
