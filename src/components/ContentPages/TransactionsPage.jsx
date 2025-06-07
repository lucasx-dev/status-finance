import { FaMoneyBillWave } from "react-icons/fa";
import { IoFilterCircleSharp } from "react-icons/io5";
import { useLogic } from "../../hooks/LogicContext";
import {
  MdDeleteOutline,
  MdOutlineAccountBalanceWallet,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";
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
      className="justify-center mt-[10dvh] gap-10 md:gap-0 items-center flex flex-col md:mt-5 md:ml-30 md:flex-row"
    >
      <div>
        <div className="mb-5 text-[1rem] font-semibold">
          <h1 className="text-white text-2xl font-bold mb-3">
            Histórico de Transações
          </h1>
          <p className="flex gap-2 items-center">
            <FaArrowTrendUp className="text-green-800" /> Tot. Entradas: R${" "}
            {totalEntradas.toFixed(2).replace(".", ",")}
          </p>
          <p className="flex gap-2 items-center">
            {" "}
            <FaArrowTrendDown className="text-red-800" />
            Tot. Saídas: R$ {totalSaidas.toFixed(2).replace(".", ",")}
          </p>
          <p className="flex gap-2 items-center mb-1.5">
            {" "}
            <MdOutlineAccountBalanceWallet />
            Saldo: R$ {newBalance.toFixed(2).replace(".", ",")}
          </p>
          <div className="gap-[10dvw] w-[15dvw] items-center text-gray-800 md:flex rounded-md border-1 border-gray-900">
            <h1 className="items-center ml-9">Filtrar</h1>
            <select
              name=""
              id=""
              onChange={(e) => setTransactionFilter(e.target.value)}
              value={transactionFilter}
              className="text-white bg-gray-900/90 rounded-md outline-0 p-2"
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
        </div>
        <div>
          <div
            className="w-[60dvh] h-60 flex flex-col [&::-webkit-scrollbar]:[width:0.5rem]
        [&::-webkit-scrollbar-thumb]:bg-blue-500
        overflow-y-auto "
          >
            {transactions.length === 0 ? (
              <p className="text-gray-400">Nenhuma transação registrada.</p>
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
                    className={`p-3 mb-5 border-3 rounded-xl  ${
                      t.type === "entrada"
                        ? "border-green-700 hover:bg-green-700"
                        : "border-red-800  hover:bg-red-800"
                    }`}
                  >
                    <FaMoneyBillWave
                      className={`${
                        t.type === "entrada"
                          ? "text-green-500"
                          : "text-red-500 "
                      }`}
                    />
                    <p className="text-white text-[1.20rem] font-semibold">
                      {t.type === "entrada" ? "Entrada" : "Saída"}: R$
                      {t.value.toFixed(2).replace(".", ",")}
                    </p>
                    <p
                      className={` text-[0.75rem] bg-gray-900 w-[15dvh] p-1 items-center flex rounded-md font-semibold ${color(
                        t
                      )}
                      )} `}
                    >
                      <IoFilterCircleSharp />
                      {t.category}
                    </p>
                    <p className="text-sm  text-gray-300">Data: {t.date}</p>
                    <button
                      onClick={() => {
                        setSelectedTransaction(t);
                        setModal(true);
                      }}
                      className="text-white border-1 mt-4 flex gap-2  items-center border-white hover:border-black hover:text-black rounded-md p-1"
                    >
                      Excluir <MdDeleteOutline />
                    </button>
                  </div>
                ))
            )}
            {modal && selectedTransaction && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl  overflow-y-auto shadow-xl w-50vw h-50 ">
                  <p className="text-gray-800 ">
                    Tem certeza que deseja excluir essa transação?
                  </p>
                  <button
                    onClick={async () => {
                      await excluirTransacaoFirestore(selectedTransaction);
                      setModal(false);
                      setSelectedTransaction(null);
                    }}
                    className=" bg-blue-500 mt-5 items-center justify-center p-1 hover:bg-blue-900 flex w-full text-xl rounded-md"
                  >
                    Sim
                    <MdOutlineDeleteOutline className="text-2xl" />
                  </button>
                  <button
                    onClick={() => {
                      setModal(false);
                      setSelectedTransaction(null);
                    }}
                    className=" bg-red-500 items-center justify-center mt-2 p-1 hover:bg-red-900 flex w-full text-xl rounded-md"
                  >
                    Não
                  </button>
                </div>
              </div>
            )}
          </div>
          {transactions.length !== 0 && (
            <button
              className="rounded-md items-center md:mt-0 mt-5 flex w-full border-blue-700 border-1 text-white  justify-center hover:scale-105 hover:bg-blue-800 "
              onClick={handleButtonClick}
            >
              {pdfContent ? (
                <PDFDownloadLink
                  document={<TransactionsPDF content={pdfContent} />}
                  filename="transactions.pdf"
                >
                  {({ loading }) => (loading ? "Carregando..." : "Baixar PDF")}
                </PDFDownloadLink>
              ) : (
                "Gerar PDF"
              )}
            </button>
          )}
        </div>
      </div>
      {sortedTransactions.length !== 0 && (
        <div className="items-center flex justify-center md:block flex-col">
          <LineChartGraphic
            transactionFilter={transactionFilter}
            sortedTransactions={sortedTransactions}
            filterTransactions={filterTransactions}
          />
          <PieChartGraphic
            transactionFilter={transactionFilter}
            sortedTransactions={sortedTransactions}
            filterTransactions={filterTransactions}
          />
        </div>
      )}
    </div>
  );
};
