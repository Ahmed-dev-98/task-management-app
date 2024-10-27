import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const taskChartConfig = {
  taskCount: {
    label: "Task Count",
  },
  todo: {
    label: "To Do",
    color: "hsl(var(--chart-todo-color))",
  },
  doing: {
    label: "In Progress",
    color: "hsl(var(--chart-doing-color))",
  },
  done: {
    label: "Done",
    color: "hsl(var(--chart-done-color))",
  },
} satisfies ChartConfig;

export function TasksPieChart({
  taskData,
  totalCount,
}: {
  taskData: {
    status: "todo" | "doing" | "done";
    taskCount: number;
    fill: string;
  }[];
  totalCount: number;
}) {
  return (
    <ChartContainer
      config={taskChartConfig}
      className="mx-auto aspect-square max-h-[250px]  w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={taskData}
          dataKey="taskCount"
          nameKey="status"
          innerRadius={60}
          outerRadius={100}
          fill="fill"
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalCount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Tasks Count
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
