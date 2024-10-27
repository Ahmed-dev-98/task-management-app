import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const TaskBarChart = ({
  data,
}: {
  data: {
    date: string;
    todo: number;
    doing: number;
    done: number;
  }[];
}) => (
  <BarChart data={data} width={500} height={300}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="todo" fill="red" />
    <Bar dataKey="doing" fill="blue" />
    <Bar dataKey="done" fill="green" />
  </BarChart>
);
