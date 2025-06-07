import { createContext, useContext, useState, useEffect } from "react";
import { getUserData } from "../services/firestoreUser";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
const LogicContext = createContext();
export const LogicProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [optionValue, setOptionValue] = useState("input");
  const [erro, setErro] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [uid, setUid] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchTransactions() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setTransactions(data.transactions || []);
      }
    }

    fetchTransactions();
  }, [transactions, uid]);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    console.log("Usuário autenticado:", user);
    const unsubescribe = onAuthStateChanged(auth, async (user) => {
      // Verifica se o usuário está autenticado
      // Se o usuário estiver autenticado, obtém os dados do usuário
      // e atualiza o estado do saldo
      // Se o usuário não estiver autenticado, o saldo permanece 0
      if (user) {
        setUid(user.uid);
        const data = await getUserData(user.uid);
        if (data) {
          setBalance(data.saldo || 0);
        }
      }
    });
    return () => unsubescribe();
  }, []);
  const registrarTransacaoFirestore = async (novaTransacao) => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const dados = docSnap.data();
      const transactionsPrevious = Array.isArray(dados.transactions)
        ? dados.transactions
        : [];

      await setDoc(userDocRef, {
        ...dados,
        transactions: [...transactionsPrevious, novaTransacao],
      });
    }
  };
  const excluirTransacaoFirestore = async (excluirTransacao) => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const dados = docSnap.data();
      const transactionsPrevious = Array.isArray(dados.transactions)
        ? dados.transactions
        : [];
      const novaLista = transactionsPrevious.filter(
        (transaction) => transaction.id !== excluirTransacao.id
      );
      await setDoc(userDocRef, {
        ...dados,
        transactions: novaLista,
      });
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value.replace(",", ".");
    setInputValue(value);
  };
  const handleOutputChange = (e) => {
    const value = e.target.value.replace(",", ".");
    setOutputValue(value);
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  async function AddInput() {
    const input = parseFloat(inputValue);
    if (inputValue === "" || isNaN(input)) {
      setErro(true);
      return;
    }
    const transaction = {
      id: uuidv4(),
      type: "entrada",
      value: input,
      balance: newBalance,
      category: description,
      date: new Date().toLocaleString(),
    };
    await registrarTransacaoFirestore(transaction);

    setErro(false);
    setInputValue("");
  }
  async function AddOutput() {
    const output = parseFloat(outputValue);
    if (!outputValue || isNaN(output)) {
      setErro(true);
      setOutputValue("");
      return;
    }
    const transaction = {
      id: uuidv4(),
      type: "saída",
      balance: newBalance,
      value: output,
      category: description,
      date: new Date().toLocaleString(),
    };

    await registrarTransacaoFirestore(transaction, newBalance);
    setErro(false);
    setOutputValue("");
  }

  const filterTransactions = (t, transactionFilter, sortedTransactions) => {
    if (transactionFilter === "entradas") {
      return t.type === "entrada";
    }
    if (transactionFilter === "todas") {
      return true;
    }
    if (transactionFilter === "saidas") {
      return t.type === "saída";
    }
    if (transactionFilter === "Alimentação") {
      return t.category === "Alimentação";
    }
    if (transactionFilter === "Outros") {
      return t.category === "Outros";
    }
    if (transactionFilter === "Transporte") {
      return t.category === "Transporte";
    }
    if (transactionFilter === "Saúde") {
      return t.category === "Saúde";
    }
    if (transactionFilter === "Educação") {
      return t.category === "Educação";
    }
    if (transactionFilter === "Lazer") {
      return t.category === "Lazer";
    }
    if (transactionFilter === "Contas Fixas") {
      return t.category === "Contas Fixas";
    }
    if (transactionFilter === "antigas") {
      const oldestTenIds = sortedTransactions.slice(0, 10).map((t) => t.id);
      return oldestTenIds.includes(t.id);
    }
    return true;
  };
  const color = (t) => {
    if (t.category === "Alimentação") {
      return "text-orange-500";
    }
    if (t.category === "Outros") {
      return "text-white";
    }
    if (t.category === "Transporte") {
      return "text-green-500";
    }
    if (t.category === "Saúde") {
      return "text-red-500";
    }
    if (t.category === "Educação") {
      return "text-blue-500";
    }
    if (t.category === "Lazer") {
      return "text-yellow-500";
    }
    if (t.category === "Contas Fixas") {
      return "text-red-800";
    }
    return "text-white";
  };
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
  ];
  const totalEntradas = transactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + t.value, 0);

  const totalSaidas = transactions
    .filter((t) => t.type === "saída")
    .reduce((acc, t) => acc + t.value, 0);

  const newBalance = totalEntradas - totalSaidas;
  balance !== newBalance && setBalance(newBalance);
  return (
    <LogicContext.Provider
      value={{
        newBalance,
        isHidden,
        setIsHidden,
        optionValue,
        setOptionValue,
        inputValue,
        outputValue,
        setInputValue,
        setOutputValue,
        erro,
        handleInputChange,
        handleOutputChange,
        handleDescriptionChange,
        description,
        setDescription,
        AddInput,
        AddOutput,
        transactions,
        excluirTransacaoFirestore,
        filterTransactions,
        color,
        totalEntradas,
        totalSaidas,
      }}
    >
      {children}
    </LogicContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLogic = () => useContext(LogicContext);
