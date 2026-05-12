import { FaMoneyBillWave } from "react-icons/fa";
import { useLogic } from "../../hooks/LogicContext";
import {
	MdDeleteOutline,
	MdOutlineAccountBalanceWallet,
	MdOutlineDeleteOutline,
} from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { TransactionsPDF } from "../../documents/transactions/transactionsfile";
import { useEffect, useState } from "react";
import { ChartPieSimple } from "../Graphics/PieChart";
import { NumericFormat } from "react-number-format";
import { ChartLineDefault } from "../Graphics/LineChart";

export const TransactionsContent = () => {
	const [modal, setModal] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [transactionFilter, setTransactionFilter] = useState("todas");
	const [transactionFilterPeriodic, setTransactionFilterPeriodic] =
		useState("Todos");
	const [pdfContent, setPdfContent] = useState("");
	const {
		excluirTransacaoFirestore,
		newBalance,
		totalEntradas,
		totalSaidas,
		transactions,
		filterTransactions,
		filterPeriodic,
	} = useLogic();

	const sortedTransactions = transactions.sort(
		(a, b) => new Date(a.date) - new Date(b.date),
	);

	useEffect(() => {
		setPdfContent("");
	}, [transactionFilter, transactionFilterPeriodic]);

	const handleButtonClick = () => {
		const contentfilter = transactions
			.slice()
			.reverse()
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.filter(
				(t) =>
					filterTransactions(t, transactionFilter, sortedTransactions) &&
					filterPeriodic(t, transactionFilterPeriodic),
			)
			.map(
				(t) =>
					`${t.type === "entrada" ? "Entrada" : "Saída"}: R$${t.value
						.toFixed(2)
						.replace(
							".",
							",",
						)} - ${t.category} - Data: ${t.date.toLocaleString()}`,
			)
			.join("\n");

		const content = `Histórico de Transações\n\n${contentfilter}`;
		setPdfContent(content);
	};

	return (
		<div className="min-h-screen bg-[#0F172A] text-white">
			<div className="mx-auto max-w-7xl px-5 py-8">
				<header className="mb-8">
					<h1 className="text-2xl font-semibold tracking-tight">Transações</h1>

					<p className="mt-1 text-sm text-slate-400">
						Acompanhe seu histórico financeiro.
					</p>
				</header>

				<div className="grid gap-6 xl:grid-cols-[420px,1fr]">
					<div className="space-y-5">
						<div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-emerald-500/10 p-2">
										<FaArrowTrendUp className="text-emerald-400" />
									</div>

									<div>
										<p className="text-xs text-slate-500">Entradas</p>

										<p className="text-lg font-semibold text-emerald-400">
											R$
											<NumericFormat
												value={totalEntradas}
												displayType="text"
												thousandSeparator="."
												decimalSeparator=","
												decimalScale={2}
												fixedDecimalScale
											/>
										</p>
									</div>
								</div>
							</div>

							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-red-500/10 p-2">
										<FaArrowTrendDown className="text-red-400" />
									</div>

									<div>
										<p className="text-xs text-slate-500">Saídas</p>

										<p className="text-lg font-semibold text-red-400">
											R$
											<NumericFormat
												value={totalSaidas}
												displayType="text"
												thousandSeparator="."
												decimalSeparator=","
												decimalScale={2}
												fixedDecimalScale
											/>
										</p>
									</div>
								</div>
							</div>

							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-blue-500/10 p-2">
										<MdOutlineAccountBalanceWallet className="text-blue-400" />
									</div>

									<div>
										<p className="text-xs text-slate-500">Saldo</p>

										<p className="text-lg font-semibold text-white">
											R$
											<NumericFormat
												value={newBalance}
												displayType="text"
												thousandSeparator="."
												decimalSeparator=","
												decimalScale={2}
												fixedDecimalScale
											/>
										</p>
									</div>
								</div>
							</div>
						</div>

						<section className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
							<div className="mb-5 flex items-center justify-between ">
								<div>
									<h2 className="text-lg font-medium">Histórico</h2>

									<p className="text-sm text-slate-500">
										Movimentações registradas.
									</p>
								</div>

								<div className="flex gap-5">
									<select
										onChange={(e) => setTransactionFilter(e.target.value)}
										value={transactionFilter}
										className="
								h-10 rounded-xl border
								border-slate-700
								bg-slate-800 px-3
								text-sm outline-none
							"
									>
										<option value="todas">Todas</option>
										<option value="Outros">Outros</option>
										<option value="Alimentação">Alimentação</option>
										<option value="Transporte">Transporte</option>
										<option value="Saúde">Saúde</option>
										<option value="Educação">Educação</option>
										<option value="Lazer">Lazer</option>
										<option value="Contas Fixas">Contas fixas</option>
										<option value="entradas">Entradas</option>
										<option value="saidas">Saídas</option>
									</select>

									<select
										onChange={(e) =>
											setTransactionFilterPeriodic(e.target.value)
										}
										value={transactionFilterPeriodic}
										className=" h-10 rounded-xl borde border-slate-700
										bg-slate-800 px-3 text-sm outline-none m-0
										"
									>
										<option value="Todos">Todos os meses</option>
										<option value="Janeiro">Janeiro</option>
										<option value="Fevereiro">Fevereiro</option>
										<option value="Maio">Maio</option>
										<option value="Marco">Março</option>
										<option value="Abril">Abril</option>
										<option value="Maio">Maio</option>
										<option value="Junho">Junho</option>
										<option value="Julho">Julho</option>
										<option value="Agosto">Agosto</option>
										<option value="Setembro">Setembro</option>
										<option value="Outubro">Outubro</option>
										<option value="Novembro">Novembro</option>
										<option value="Dezembro">Dezembro</option>
									</select>
								</div>
							</div>

							<div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
								{transactions.length === 0 ? (
									<div className="py-12 text-center text-sm text-slate-500">
										Nenhuma transação registrada.
									</div>
								) : (
									transactions
										.slice()
										.reverse()
										.filter(
											(t) =>
												filterTransactions(
													t,
													transactionFilter,
													sortedTransactions,
												) && filterPeriodic(t, transactionFilterPeriodic),
										)
										.map((t, index) => (
											<div
												key={index}
												className="
											flex items-center
											justify-between
											rounded-2xl
											border border-slate-800
											bg-slate-800/50
											p-4 transition
											hover:bg-slate-800
										"
											>
												<div className="flex items-center gap-3">
													<div
														className={`
													flex h-10 w-10
													items-center justify-center
													rounded-xl
													${
														t.type === "entrada"
															? "bg-emerald-500/10 text-emerald-400"
															: "bg-red-500/10 text-red-400"
													}
												`}
													>
														<FaMoneyBillWave />
													</div>

													<div>
														<p className="text-sm font-medium">{t.category}</p>

														<p className="text-xs text-slate-500">
															{new Date(t.date).toLocaleString("pt-BR")}
														</p>
													</div>
												</div>

												<div className="flex items-center gap-4">
													<p
														className={`text-sm font-semibold ${
															t.type === "entrada"
																? "text-emerald-400"
																: "text-red-400"
														}`}
													>
														R$
														<NumericFormat
															value={t.value}
															displayType="text"
															thousandSeparator="."
															decimalSeparator=","
															decimalScale={2}
															fixedDecimalScale
														/>
													</p>

													<button
														onClick={() => {
															setSelectedTransaction(t);
															setModal(true);
														}}
														className="
													text-slate-500
													transition
													hover:text-red-400
												"
													>
														<MdDeleteOutline className="text-xl" />
													</button>
												</div>
											</div>
										))
								)}
							</div>

							{transactions.length !== 0 && (
								<button
									onClick={handleButtonClick}
									className="
								mt-5 h-11 w-full
								rounded-xl border
								border-slate-700
								bg-slate-800 text-sm
								font-medium transition
								hover:bg-slate-700
							"
								>
									{pdfContent ? (
										<PDFDownloadLink
											document={<TransactionsPDF content={pdfContent} />}
											fileName="transacoes.pdf"
										>
											Baixar relatório PDF
										</PDFDownloadLink>
									) : (
										"Gerar relatório PDF"
									)}
								</button>
							)}
						</section>
					</div>

					{sortedTransactions.length !== 0 && (
						<div className="space-y-5">
							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
								<h3 className="mb-4 text-lg font-medium">Evolução do saldo</h3>

								<ChartLineDefault
									transactionFilter={transactionFilter}
									sortedTransactions={sortedTransactions}
									filterTransactions={filterTransactions}
									filterPeriodic={filterPeriodic}
									transactionFilterPeriodic={transactionFilterPeriodic}
								/>
							</div>

							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
								<h3 className="mb-4 text-lg font-medium">
									Distribuição por categoria
								</h3>

								<ChartPieSimple
									transactionFilter={transactionFilter}
									sortedTransactions={sortedTransactions}
									filterTransactions={filterTransactions}
									filterPeriodic={filterPeriodic}
									transactionFilterPeriodic={transactionFilterPeriodic}
								/>
							</div>
						</div>
					)}
				</div>

				{modal && selectedTransaction && (
					<div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
						<div className="w-full max-w-sm rounded-[28px] border border-slate-800 bg-slate-900 p-6">
							<h2 className="text-lg font-semibold">Excluir transação?</h2>

							<p className="mt-2 text-sm leading-6 text-slate-400">
								Esta ação é irreversível e alterará seu saldo atual.
							</p>

							<div className="mt-6 flex gap-3">
								<button
									onClick={() => {
										setModal(false);
										setSelectedTransaction(null);
									}}
									className="h-11 flex-1 rounded-xl bg-slate-800 text-sm hover:bg-slate-700"
								>
									Cancelar
								</button>

								<button
									onClick={async () => {
										await excluirTransacaoFirestore(selectedTransaction);

										setModal(false);
										setSelectedTransaction(null);
									}}
									className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-medium hover:bg-red-600"
								>
									Excluir
									<MdOutlineDeleteOutline />
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
