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
    <div className="h-[140px] flex-1 flex flex-col justify-between gap-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200  hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-gray-800">{card.title}</h2>
        <div className="text-blue-500">{card.icon}</div>
      </div>

      <div className="text-start text-lg font-bold text-gray-900">
        {card.count.toLocaleString()}
      </div>

      <div className="text-start text-xs text-green-500 font-medium flex items-center gap-1">
        {card.growth.number >= 0 ? (
          <span className="text-green-500">
            <TrendingUp size={15} />
          </span>
        ) : (
          <span className="text-red-500">
            <TrendingDown size={15} />
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
