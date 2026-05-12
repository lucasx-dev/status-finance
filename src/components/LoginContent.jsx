import { ModalLogin } from "./ModalLogin";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Wallet, TrendingUp } from "lucide-react";

export const LoginContent = ({ LoginGoogle, logogoogle, graphic_image }) => {
	return (
		<div
			className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden px-5"
			style={{
				backgroundImage: `url(${graphic_image})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-[#0F172A]" />
			<div className="absolute inset-0 bg-slate-950/70" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb20,transparent_35%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#0ea5e920,transparent_35%)]" />

			<div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-blue-600/10 blur-[100px]" />
			<div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-cyan-500/10 blur-[100px]" />

			<div className="relative z-10 w-full max-w-md">
				<div className="rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
					<div className="mb-5 flex justify-center">
						<div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
							<div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
							Sistema protegido
						</div>
					</div>

					<div className="text-center">
						<h1 className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-4xl font-medium text-transparent">
							Finance Status
						</h1>

						<p className="mt-3 text-sm leading-relaxed text-slate-400">
							Controle suas finanças pessoais com praticidade e segurança.
						</p>
					</div>

					<div className="mt-6 space-y-3">
						<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
							<div className="rounded-xl bg-blue-500/10 p-2 text-blue-400">
								<Wallet size={18} />
							</div>

							<div>
								<p className="text-sm font-medium text-white">
									Controle financeiro
								</p>
								<p className="text-xs text-slate-400">
									Receitas e despesas organizadas.
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
							<div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
								<TrendingUp size={18} />
							</div>

							<div>
								<p className="text-sm font-medium text-white">
									Insights financeiros
								</p>
								<p className="text-xs text-slate-400">
									Acompanhe sua evolução.
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
							<div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
								<ShieldCheck size={18} />
							</div>

							<div>
								<p className="text-sm font-medium text-white">Login seguro</p>
								<p className="text-xs text-slate-400">
									Protegido com Google Auth.
								</p>
							</div>
						</div>
					</div>

					<div className="mt-6">
						<Button
							className="
								group h-12 w-full rounded-2xl
								bg-white text-slate-900
								font-semibold transition-all
								duration-300 hover:scale-[1.01]
								hover:bg-slate-100
							"
							onClick={LoginGoogle}
						>
							<img
								src={logogoogle}
								className="mr-2 h-10 w-10 transition-transform group-hover:scale-110"
								alt="Logo Google"
							/>
							Continuar com Google
						</Button>
					</div>
				</div>
			</div>
			<ModalLogin />
		</div>
	);
};
