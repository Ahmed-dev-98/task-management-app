import {
  BookCheck,
  ClipboardList,
  Contact,
  StickyNote,
  Users2,
} from "lucide-react";
import AnalyticsCard from "./_components/analytics-card";

const Analytics = () => {
  const cards = [
    {
      count: 12,
      title: "Employees",
      growth: {
        number: 12,
        description: "from last month",
      },
      icon: <Users2 />,
    },
    {
      count: 12,
      title: "Tasks",
      growth: {
        number: -13,
        description: "from last month",
      },
      icon: <ClipboardList />,
    },
    {
      count: 12,
      title: "Done",
      growth: {
        number: 33,
        description: "from last month",
      },
      icon: <BookCheck />,
    },
    {
      count: 32,
      title: "doing",
      growth: {
        number: 43,
        description: "from last month",
      },
      icon: <Contact />,
    },
    {
      count: 15,
      title: "todo",
      growth: {
        number: -13,
        description: "from last month",
      },
      icon: <StickyNote />,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex  gap-4 w-full ">
        {cards.map((card) => (
          <AnalyticsCard card={card} />
        ))}
      </div>
    </div>
  );
};

export default Analytics;
