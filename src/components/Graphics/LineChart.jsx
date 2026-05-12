import { TrendingUp } from "lucide-react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { NumericFormat } from "react-number-format";

export function ChartLineDefault({
	sortedTransactions,
	transactionFilter,
	filterTransactions,
	filterPeriodic,
	transactionFilterPeriodic,
}) {
	const filtered = sortedTransactions.filter(
		(t) =>
			filterTransactions(t, transactionFilter, sortedTransactions) &&
			filterPeriodic(t, transactionFilterPeriodic),
	);

	let runningBalance = 0;

	const data = filtered.map((t) => {
		runningBalance += t.type === "entrada" ? t.value : -t.value;

		return {
			date: new Date(t.date).toLocaleString("pt-BR"),
			saldo: runningBalance,
			tipo: t.type,
		};
	});

	const average =
		data.length > 0
			? data.reduce((acc, item) => acc + item.saldo, 0) / data.length
			: 0;

	return (
		<div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
			{/* Header */}
			<div className="mb-6 flex items-start justify-between">
				<div>
					<h3 className="text-lg font-medium text-white">Evolução do saldo</h3>

					<p className="text-sm text-slate-500">
						Movimentação financeira ao longo do tempo.
					</p>
				</div>

				<div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
					<TrendingUp size={16} />
					Média: R$
					<NumericFormat
						value={average}
						displayType="text"
						thousandSeparator="."
						decimalSeparator=","
						decimalScale={2}
						fixedDecimalScale
					/>
				</div>
			</div>

			<div className="h-[320px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						data={data}
						margin={{
							top: 10,
							right: 10,
							left: -20,
							bottom: 0,
						}}
					>
						<defs>
							<linearGradient id="saldoGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />

								<stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
							</linearGradient>
						</defs>

						<CartesianGrid stroke="#1E293B" vertical={false} />

						<XAxis
							dataKey="date"
							tick={{
								fill: "#64748B",
								fontSize: 12,
							}}
							tickLine={false}
							axisLine={false}
						/>

						<YAxis
							tick={{
								fill: "#64748B",
								fontSize: 12,
							}}
							tickFormatter={(value) => `R$${Math.round(value)}`}
							tickLine={false}
							axisLine={false}
						/>

						<Tooltip
							contentStyle={{
								background: "#0F172A",
								border: "1px solid #1E293B",
								borderRadius: "16px",
								color: "white",
							}}
							formatter={(value) => [
								`R$ ${Number(value).toLocaleString("pt-BR", {
									minimumFractionDigits: 2,
								})}`,
								"Saldo",
							]}
						/>

						<Area
							type="monotone"
							dataKey="saldo"
							stroke="#2563EB"
							strokeWidth={2.5}
							fill="url(#saldoGradient)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
