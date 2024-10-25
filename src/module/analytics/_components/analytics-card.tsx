import { TrendingDown, TrendingUp } from "lucide-react";

const AnalyticsCard = ({
  card,
}: {
  card: {
    count: number;
    title: string;
    growth: {
      number: number;
      description: string;
    };
    icon: React.ReactNode;
  };
}) => {
  return (
    <div className="h-[140px] flex-1 flex flex-col justify-between gap-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
        <div className="text-blue-500 text-3xl">{card.icon}</div>
      </div>

      <div className="text-start text-4xl font-bold text-gray-900">
        {card.count.toLocaleString()}
      </div>

      <div className="text-start text-sm text-green-500 font-medium flex items-center gap-1">
        {card.growth.number >= 0 ? (
          <span className="text-green-500">
            <TrendingUp />
          </span>
        ) : (
          <span className="text-red-500">
            <TrendingDown />
          </span>
        )}
        <p
          className={`${
            card.growth.number >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {card.growth.number}% {card.growth.description}
        </p>
      </div>
    </div>
  );
};

export default AnalyticsCard;
