import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const PieChartGraphic = ({
  sortedTransactions,
  transactionFilter,
  filterTransactions,
}) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
  ];
  const grouped = {};
  sortedTransactions
    .filter((t) => filterTransactions(t, transactionFilter, sortedTransactions))
    .forEach((t) => {
      const category = t.category;
      const value = t.type === "entrada" ? t.value : -t.value;
      grouped[category] = (grouped[category] || 0) + value;
    });
  const data = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
  return (
    <div>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};
