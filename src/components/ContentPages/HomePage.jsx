import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLogic } from "../../hooks/LogicContext";

export const HomeContent = () => {
  const {
    newBalance,
    isHidden,
    setIsHidden,
    description,
    handleDescriptionChange,
    optionValue,
    setOptionValue,
    inputValue,
    outputValue,
    erro,
    handleInputChange,
    handleOutputChange,
    setInputValue,
    setOutputValue,
    AddInput,
    AddOutput,
  } = useLogic();
  return (
    <div className="justify-center mt-[10dvh] gap-10  md:gap-0 items-center flex flex-col md:mt-5 md:ml-30 md:flex-row">
      <div className="flex flex-col justify-center md:block items-center flex-1">
        <h1 className="text-white font-bold text-2xl ">Página Inicial</h1>
        <div className="w-[14rem] md:w-[23rem] border-2 items-center rounded-3xl gap-40 flex p-6 mt-7 border-blue-700">
          <h1 className="text-white text-xl  font-semibold">
            Saldo: R${" "}
            {isHidden ? "******" : newBalance.toFixed(2).replace(".", ",")}
          </h1>
          <button
            className="text-white fixed ml-40 md:ml-60"
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? (
              <FaRegEye className="size-7" />
            ) : (
              <FaRegEyeSlash className="size-7" />
            )}
          </button>
        </div>
        <div className="flex-col flex justify-center  md:w-[60dvh] items-center mt-5">
          <h1 className="text-white font-extrabold">CATEGORIA</h1>
          <select
            className="text-white bg-gray-900/90 w-50 md:w-100 rounded-md outline-0 p-2"
            value={description}
            onChange={handleDescriptionChange}
          >
            <option value="Outros">Outros</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Lazer">Lazer</option>
            <option value="Contas Fixas">Contas fixas</option>
          </select>
          <h1 className="text-white mt-2 font-extrabold ">TIPO</h1>
          <select
            className="text-white bg-gray-900/90 w-50 md:w-100 rounded-md outline-0 p-2"
            value={optionValue}
            onChange={(e) => {
              setOptionValue(e.target.value);
              if (e.target.value === "input") {
                setOutputValue("");
              } else {
                setInputValue("");
              }
            }}
          >
            <option value="input">Entrada</option>
            <option value="output">Saída</option>
          </select>
          <input
            className={`rounded-md p-2 w-50 md:w-100 mt-5 bg-gray-400/20 mb-3 ${
              erro && "border-red-500 border-2"
            }
                ${
                  optionValue === "input" ? "text-green-500" : "text-orange-500"
                }`}
            type="number"
            placeholder="Digite um valor"
            key={optionValue}
            value={optionValue === "input" ? inputValue : outputValue}
            onChange={
              optionValue === "input" ? handleInputChange : handleOutputChange
            }
          ></input>
          {erro && <h1 className="text-red-500">Digite um valor válido</h1>}
          <div className="items-center flex justify-center ">
            <button
              className="rounded-md  bg-blue-700  text-white w-40 md:w-100 p-1 hover:scale-105 hover:bg-blue-800 "
              onClick={optionValue == "input" ? AddInput : AddOutput}
            >
              Adicionar
            </button>
          </div>
        </div>
        <footer className=" mt-10 text-white/20">Finance Status</footer>
      </div>
    </div>
  );
};
