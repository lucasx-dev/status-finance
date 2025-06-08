import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
} from "recharts";
export const LineChartGraphic = ({
  transactionFilter,
  sortedTransactions,
  filterTransactions,
}) => {
  const data = sortedTransactions
    .filter((t) => filterTransactions(t, transactionFilter, sortedTransactions))
    .map((t) => {
      return {
        name: t.type,
        uv: t.type === "entrada" ? t.value : -t.value,
      };
    });
  const stroke = () => {
    if (transactionFilter === "entradas") {
      return "#00ff00";
    } else if (transactionFilter === "saidas") {
      return "#ff0000";
    }
    return "#8884d8";
  };

  return (
    <div>
      <LineChart width={250} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke={stroke(transactionFilter)} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};
