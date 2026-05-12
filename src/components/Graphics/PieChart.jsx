"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { NumericFormat } from "react-number-format";

export function ChartPieSimple({
	sortedTransactions,
	transactionFilter,
	filterTransactions,
	filterPeriodic,
	transactionFilterPeriodic,
}) {
	const chartConfig = {
		Alimentação: "#F97316",
		Outros: "#94A3B8",
		Transporte: "#22C55E",
		Saúde: "#EF4444",
		Educação: "#3B82F6",
		Lazer: "#EAB308",
		"Contas Fixas": "#8B5CF6",
	};

	const filteredData = sortedTransactions.filter(
		(t) =>
			filterTransactions(t, transactionFilter, sortedTransactions) &&
			filterPeriodic(t, transactionFilterPeriodic),
	);

	const groupedData = filteredData.reduce((acc, t) => {
		const categoria = t.category || "Outros";

		const valor = Math.abs(t.value);

		if (!acc[categoria]) acc[categoria] = 0;

		acc[categoria] += valor;

		return acc;
	}, {});

	const data = Object.entries(groupedData).map(([name, value]) => ({
		name,
		value,
		color: chartConfig[name] || "#64748B",
	}));

	const total = data.reduce((acc, item) => acc + item.value, 0);

	return (
		<div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
			<div className="mb-6">
				<h3 className="text-lg font-medium text-white">
					Distribuição por categoria
				</h3>

				<p className="text-sm text-slate-500">
					Resumo das movimentações financeiras.
				</p>
			</div>

			{data.length === 0 ? (
				<div className="flex h-[280px] items-center justify-center text-sm text-slate-500">
					Sem dados para exibir.
				</div>
			) : (
				<div className="grid items-center gap-4 lg:grid-cols-[1fr,220px]">
					<div className="h-[280px]">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
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
										"Valor",
									]}
								/>

								<Pie
									data={data}
									dataKey="value"
									nameKey="name"
									innerRadius={70}
									outerRadius={100}
									paddingAngle={3}
									stroke="none"
								>
									{data.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</div>

					<div className="space-y-3">
						<div className="mb-4 rounded-2xl bg-slate-800 p-4">
							<p className="text-xs text-slate-500">Total movimentado</p>

							<p className="mt-1 text-xl font-semibold text-white">
								R$
								<NumericFormat
									value={total}
									displayType="text"
									thousandSeparator="."
									decimalSeparator=","
									decimalScale={2}
									fixedDecimalScale
								/>
							</p>
						</div>

						{data.map((item) => {
							const percentage = ((item.value / total) * 100).toFixed(1);

							return (
								<div
									key={item.name}
									className="
										flex items-center
										justify-between
										rounded-2xl
										bg-slate-800/50
										p-3
									"
								>
									<div className="flex items-center gap-3">
										<div
											className="h-3 w-3 rounded-full"
											style={{
												backgroundColor: item.color,
											}}
										/>

										<div>
											<p className="text-sm text-white">{item.name}</p>

											<p className="text-xs text-slate-500">{percentage}%</p>
										</div>
									</div>

									<p className="text-sm font-medium text-slate-300">
										R$
										<NumericFormat
											value={item.value}
											displayType="text"
											thousandSeparator="."
											decimalSeparator=","
											decimalScale={2}
											fixedDecimalScale
										/>
									</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
