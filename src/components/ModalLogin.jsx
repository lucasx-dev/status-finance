import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ModalLogin = () => {
	const contents = [
		{
			key: "Política de Privacidade",
			text: `Levamos sua privacidade a sério.

1. Coletamos apenas os dados necessários para o funcionamento da aplicação: nome, e-mail e foto de perfil fornecidos pelo Google.
2. Seus dados são armazenados com segurança usando o Firebase.
3. Não compartilhamos, vendemos ou divulgamos suas informações a terceiros.
4. As informações financeiras inseridas são privadas e visíveis apenas para você.
5. Você pode solicitar a exclusão de seus dados a qualquer momento.

O uso deste app implica na aceitação desta política.`,
		},
		{
			key: "Termos de Uso",
			text: `Ao utilizar este aplicativo, você concorda com os seguintes termos:

1. O aplicativo foi desenvolvido para organização financeira pessoal.
2. O acesso ocorre exclusivamente por login com Google.
3. Você é responsável pelas informações inseridas.
4. É proibido o uso do app para fins ilegais ou ofensivos.
5. Os dados são protegidos e utilizados apenas internamente.

Podemos atualizar estes termos a qualquer momento.`,
		},
		{
			key: "Sobre - Finance Status",
			text: `O Finance Status foi criado para ajudar você a organizar suas finanças de forma simples, segura e intuitiva.

Nosso objetivo é permitir acompanhamento claro do seu saldo, ganhos e despesas — tudo salvo com segurança e visível apenas para você.`,
		},
	];

	return (
		<footer
			className="
				fixed bottom-0 left-0 z-40
				w-full border-t border-slate-800
				bg-slate-950/95 backdrop-blur-sm
			"
		>
			<div
				className="
					mx-auto flex max-w-6xl
					flex-col items-center
					justify-between gap-3
					px-5 py-4
					md:flex-row
				"
			>
				<div className="text-center md:text-left">
					<h2 className="text-sm font-semibold text-slate-200">
						Finance Status
					</h2>

					<p className="text-xs text-slate-500">
						Segurança, privacidade e transparência.
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
					{contents.map(({ key, text }) => (
						<AlertDialog key={key}>
							<AlertDialogTrigger
								className="
									rounded-lg px-3 py-2
									text-sm text-slate-400
									transition hover:bg-slate-800
									hover:text-slate-200
								"
							>
								{key}
							</AlertDialogTrigger>

							<AlertDialogContent
								className="
									max-w-lg rounded-3xl
									border border-slate-800
									bg-slate-900 text-white
								"
							>
								<AlertDialogHeader>
									<AlertDialogTitle className="text-lg font-semibold text-slate-100">
										{key}
									</AlertDialogTitle>

									<AlertDialogDescription className="mt-3 max-h-[55vh] overflow-y-auto text-sm leading-7 text-slate-400">
										{text
											.split("\n")
											.filter(Boolean)
											.map((line, index) => (
												<p key={index} className="mb-3">
													{line}
												</p>
											))}
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter className="mt-4">
									<AlertDialogCancel
										className="
											border-slate-700
											bg-slate-800
											text-slate-300
											hover:bg-slate-700
										"
									>
										Fechar
									</AlertDialogCancel>

									<AlertDialogAction
										className="
											bg-blue-600
											hover:bg-blue-500
										"
									>
										Entendi
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					))}
				</div>
			</div>
		</footer>
	);
};
