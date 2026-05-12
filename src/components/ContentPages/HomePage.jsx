import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLogic } from "../../hooks/LogicContext";
import { CurrencyInput } from "../Inputs/InputHomePage";
import { NumericFormat } from "react-number-format";
import { Button } from "../ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

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
		error,
		handleInputChange,
		handleOutputChange,
		setInputValue,
		setOutputValue,
		AddInput,
		AddOutput,
	} = useLogic();

	return (
		<div className="min-h-screen bg-[#0F172A] text-white">
			<div className="mx-auto w-full max-w-2xl px-5 py-8">
				<header className="mb-8">
					<h1 className="text-2xl font-semibold tracking-tight">
						Página Inicial
					</h1>

					<p className="mt-1 text-sm text-slate-400">
						Gerencie suas movimentações financeiras.
					</p>
				</header>

				<section className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
					<div className="flex items-start justify-between">
						<div>
							<p className="text-sm text-slate-400">Saldo disponível</p>

							<h2 className="mt-2 text-3xl font-semibold tracking-tight">
								R${" "}
								{isHidden ? (
									"••••••"
								) : (
									<NumericFormat
										value={newBalance}
										displayType="text"
										thousandSeparator="."
										decimalSeparator=","
										decimalScale={2}
										fixedDecimalScale
									/>
								)}
							</h2>
						</div>

						<button
							className="
								flex h-10 w-10 items-center
								justify-center rounded-xl
								bg-slate-800 transition
								hover:bg-slate-700
							"
							onClick={() => setIsHidden(!isHidden)}
						>
							{isHidden ? (
								<FaRegEye className="text-slate-300" />
							) : (
								<FaRegEyeSlash className="text-slate-300" />
							)}
						</button>
					</div>
				</section>

				<section className="mt-5 rounded-3xl border border-slate-800 bg-slate-900 p-5">
					<div className="mb-5">
						<h2 className="text-lg font-medium">Nova movimentação</h2>

						<p className="text-sm text-slate-400">
							Adicione uma entrada ou saída.
						</p>
					</div>

					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm text-slate-300">
								Categoria
							</label>

							<select
								className="
									h-11 w-full rounded-xl
									border border-slate-700
									bg-slate-800 px-4
									text-sm outline-none
									transition
									focus:border-blue-500
								"
								value={description}
								onChange={handleDescriptionChange}
							>
								<option value="Outros">Outros</option>
								<option value="Alimentação">Alimentação</option>
								<option value="Transporte">Transporte</option>
								<option value="Saúde">Saúde</option>
								<option value="Educação">Educação</option>
								<option value="Lazer">Lazer</option>
								<option value="Contas Fixas">Contas Fixas</option>
							</select>
						</div>

						<div>
							<label className="mb-2 block text-sm text-slate-300">Tipo</label>

							<Select
								value={optionValue}
								onValueChange={(value) => {
									setOptionValue(value);

									if (value === "input") {
										setOutputValue("");
									} else {
										setInputValue("");
									}
								}}
							>
								<SelectTrigger className="h-11 rounded-xl border-slate-700 bg-slate-800">
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="input">Entrada</SelectItem>

									<SelectItem value="output">Saída</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className="mb-2 block text-sm text-slate-300">Valor</label>

							<CurrencyInput
								error={error}
								optionValue={optionValue}
								inputValue={inputValue}
								outputValue={outputValue}
								handleInputChange={handleInputChange}
								handleOutputChange={handleOutputChange}
							/>
						</div>

						{error && (
							<p className="text-sm text-red-400">Digite um valor válido</p>
						)}

						<Button
							className="
								mt-2 h-11 w-full rounded-xl
								bg-blue-600 text-sm
								font-medium hover:bg-blue-500
							"
							onClick={optionValue === "input" ? AddInput : AddOutput}
						>
							Adicionar movimentação
						</Button>
					</div>
				</section>

				<footer className="mt-8 text-center text-xs text-slate-500">
					<p>Finance Status © 2025</p>
					<p>Desenvolvido por Lucas Albuquerque</p>
				</footer>
			</div>
		</div>
	);
};
