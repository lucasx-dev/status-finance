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
import { LineChartGraphic } from "../Graphics/LineChart";
import { PieChartGraphic } from "../Graphics/PieChart";

export const TransactionsContent = () => {
  const [modal, setModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionFilter, setTransactionFilter] = useState("todas");
  const [pdfContent, setPdfContent] = useState("");
  const {
    excluirTransacaoFirestore,
    newBalance,
    totalEntradas,
    totalSaidas,
    transactions,
    filterTransactions,
    color,
    categoryIcon,
  } = useLogic();

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    setPdfContent("");
  }, [transactionFilter]);

  const handleButtonClick = () => {
    const contentfilter = transactions
      .slice()
      .reverse()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((t) =>
        filterTransactions(t, transactionFilter, sortedTransactions)
      )
      .map(
        (t) =>
          `${t.type === "entrada" ? "Entrada" : "Saída"}: R$${t.value
            .toFixed(2)
            .replace(".", ",")} - ${t.category} - Data: ${t.date}`
      )
      .join("\n");

    const content = `Histórico de Transações\n\n${contentfilter}`;
    setPdfContent(content);
  };

return (
    <div
      id="divToExport"
      className="container mx-auto p-4 md:p-8 bg-gray-950 text-white min-h-screen"
    >
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
        {/* Lado Esquerdo: Histórico + Filtro + Transações */}
        <div className="w-full lg:w-2/5">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Histórico de Transações
            </h1>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-semibold">
              <p className="flex items-center gap-2 bg-gray-900 p-3 rounded-lg border border-green-700">
                <FaArrowTrendUp className="text-green-500" />
                <span>
                  Entradas: R$ {totalEntradas.toFixed(2).replace(".", ",")}
                </span>
              </p>
              <p className="flex items-center gap-2 bg-gray-900 p-3 rounded-lg border border-red-700">
                <FaArrowTrendDown className="text-red-500" />
                <span>
                  Saídas: R$ {totalSaidas.toFixed(2).replace(".", ",")}
                </span>
              </p>
              <p className="flex items-center gap-2 bg-gray-900 p-3 rounded-lg border border-blue-700">
                <MdOutlineAccountBalanceWallet className="text-blue-500" />
                <span>
                  Saldo: R$ {newBalance.toFixed(2).replace(".", ",")}
                </span>
              </p>
            </div>
          </header>

          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Transações</h2>
              <select
                onChange={(e) => setTransactionFilter(e.target.value)}
                value={transactionFilter}
                className="bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
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
                <option value="antigas">Mais Antigas</option>
              </select>
            </div>

            <div className="max-h-96 overflow-y-auto pr-2 space-y-4 [&::-webkit-scrollbar]:[width:0.5rem]
        [&::-webkit-scrollbar-thumb]:bg-gray-900">
              {transactions.length === 0 ? (
                <p className="text-gray-400 text-center py-10">
                  Nenhuma transação registrada.
                </p>
              ) : (
                transactions
                  .slice()
                  .reverse()
                  .filter((t) =>
                    filterTransactions(t, transactionFilter, sortedTransactions)
                  )
                  .map((t, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer border-l-4 ${
                        t.type === "entrada"
                          ? "border-green-500 bg-gray-800 hover:bg-gray-700"
                          : "border-red-500 bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FaMoneyBillWave
                            className={`text-xl ${
                              t.type === "entrada"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          />
                          <div>
                            <p className="text-lg font-bold">
                              {t.type === "entrada" ? "Entrada" : "Saída"}
                            </p>
                            <p className="text-sm text-gray-400">
                              Data: {t.date}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-lg font-bold ${
                            t.type === "entrada"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          R$ {t.value.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${color(
                            t
                          )} bg-gray-900/50 flex items-center gap-1`}
                        >
                          {categoryIcon(t)}
                          {t.category}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTransaction(t);
                            setModal(true);
                          }}
                          className="text-gray-400 hover:text-red-500 transition"
                          title="Excluir Transação"
                        >
                          <MdDeleteOutline className="text-xl" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>
          {transactions.length !== 0 && (
            <div className="mt-8">
              <button
                className="w-full text-center p-3 border border-blue-700 text-white rounded-md hover:bg-blue-800 transition font-semibold"
                onClick={handleButtonClick}
              >
                {pdfContent ? (
                  <PDFDownloadLink
                    document={<TransactionsPDF content={pdfContent} />}
                    filename="transactions.pdf"
                  >
                    {({ loading }) =>
                      loading ? "Gerando PDF..." : "Baixar Relatório em PDF"
                    }
                  </PDFDownloadLink>
                ) : (
                  "Gerar Relatório em PDF"
                )}
              </button>
            </div>
          )}
        </div>

        {sortedTransactions.length !== 0 && (
          <div className="lg:w-2/4 h-full flex flex-col gap-8">
            <h2 className="text-2xl font-bold tracking-tight lg:hidden">
              Análise Financeira
            </h2>
            <div className="p-6 bg-gray-900 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Evolução do Saldo</h3>
              <LineChartGraphic
                transactionFilter={transactionFilter}
                sortedTransactions={sortedTransactions}
                filterTransactions={filterTransactions}
              />
            </div>
            <div className="p-6 bg-gray-900 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Distribuição por Categoria
              </h3>
              <PieChartGraphic
                transactionFilter={transactionFilter}
                sortedTransactions={sortedTransactions}
                filterTransactions={filterTransactions}
              />
            </div>
          </div>
        )}
        {modal && selectedTransaction && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
              <p className="text-white text-lg mb-6 text-center">
                Tem certeza que deseja excluir esta transação?
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={async () => {
                    await excluirTransacaoFirestore(selectedTransaction);
                    setModal(false);
                    setSelectedTransaction(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg flex items-center justify-center text-lg font-semibold transition"
                >
                  Sim <MdOutlineDeleteOutline className="ml-2 text-xl" />
                </button>
                <button
                  onClick={() => {
                    setModal(false);
                    setSelectedTransaction(null);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white w-full p-3 rounded-lg text-lg font-semibold transition"
                >
                  Não
                </button>
              <p className="text-white text-[10px] text-center">
                Esta ação é irreversível e causará alteração no saldo atual.
              </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};