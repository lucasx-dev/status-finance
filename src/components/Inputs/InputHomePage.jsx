import { NumericFormat } from "react-number-format";

export const CurrencyInput = ({
  error,
  optionValue,
  inputValue,
  outputValue,
  handleInputChange,
  handleOutputChange, 
}) => {
  const onValueChangeHandler = (values) => {
    const { floatValue } = values;
    if (optionValue === "input") {
      handleInputChange(floatValue);
    } else {
      handleOutputChange(floatValue);
    }
  };
  const maxLength = 16;


  return (
    <div className="flex flex-col md:w-[400px] w-50 mt-5 bg-gray-950 text-white ">
      <NumericFormat 
        value={optionValue === "input" ? inputValue : outputValue}
        onValueChange={onValueChangeHandler}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        decimalScale={2}
        maxLength={maxLength}
        fixedDecimalScale
        allowNegative={false}
      className={`rounded-md p-2 mt-5 bg-gray-400/20 mb-3 text-center focus:outline-none focus:ring-2
          ${error ? "border-red-500 border-2" : ""}
          ${optionValue === "input" ? "text-green-500 focus:ring-green-500" : "text-orange-500 focus:ring-orange-500"}
        `}
        placeholder="Digite um valor"
      />
    </div>
  );
};

