import { AuthGoogleContext } from "../contexts/authGoogle";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { IoExitOutline } from "react-icons/io5";
//import { IoPersonCircleOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export const NavBar = () => {
	const { user, logOut } = useContext(AuthGoogleContext);

	const navigate = useNavigate();
	const location = useLocation();

	const [isOpen, setIsOpen] = useState(false);
	const [logOutButton, setLogOutButton] = useState(false);

	const toggleLogOut = () => {
		setLogOutButton(false);
	};

	const navItems = [
		{
			label: "Página inicial",
			path: "/home",
			icon: <IoHomeSharp />,
		},
		{
			label: "Transações",
			path: "/transactions",
			icon: <BiTransfer />,
		},
	];

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="
					md:hidden fixed top-4 left-4
					z-[60] flex h-11 w-11
					items-center justify-center
					rounded-xl border border-slate-800
					bg-slate-900 text-white
				"
			>
				{isOpen ? (
					<IoClose className="text-xl" />
				) : (
					<GiHamburgerMenu className="text-lg" />
				)}
			</button>

			{isOpen && (
				<div
					onClick={() => setIsOpen(false)}
					className="fixed inset-0 z-40 bg-black/50 md:hidden"
				/>
			)}

			<aside
				className={`
					fixed left-0 top-0 z-50
					flex h-screen w-[280px]
					flex-col border-r
					border-slate-800
					bg-slate-950 transition-transform
					duration-300

					${isOpen ? "translate-x-0" : "-translate-x-full"}

					md:relative md:translate-x-0
				`}
			>
				<div className="border-b border-slate-800 p-5">
					<div className="flex items-center gap-3">
						<div>
							<img
								className="
								flex h-12 w-12
								items-center justify-center
								rounded-2xl
							"
								src={user?.photoURL}
								alt="Foto de perfil do Usuário"
							/>
						</div>

						<div className="min-w-0">
							<h1 className="truncate text-sm font-medium text-white">
								Olá, {user?.displayName?.split(" ")[0]}
							</h1>

							<p className="truncate text-xs text-slate-500">{user?.email}</p>
						</div>
					</div>
				</div>

				<nav className="flex-1 p-4">
					<div className="space-y-1">
						{navItems.map((item) => {
							const isActive = location.pathname === item.path;

							return (
								<button
									key={item.path}
									onClick={() => {
										navigate(item.path);
										setIsOpen(false);
									}}
									className={`
										flex w-full
										items-center gap-3
										rounded-2xl px-4 py-3
										text-sm font-medium
										transition-all

										${
											isActive
												? `
													bg-slate-900
													text-white
												`
												: `
													text-slate-400
													hover:bg-slate-900
													hover:text-white
												`
										}
									`}
								>
									<span className="text-lg">{item.icon}</span>

									{item.label}
								</button>
							);
						})}
					</div>
				</nav>

				<div className="border-t border-slate-800 p-4">
					<button
						onClick={() => setLogOutButton(true)}
						className="
							flex h-11 w-full
							items-center justify-center
							gap-2 rounded-2xl
							bg-slate-900
							text-sm font-medium
							text-slate-300
							transition
							hover:bg-red-500/10
							hover:text-red-400
						"
					>
						<IoExitOutline className="text-lg" />
						Sair
					</button>
				</div>
			</aside>

			{logOutButton && (
				<div
					className="
						fixed inset-0 z-[80]
						flex items-center
						justify-center bg-black/70
						p-4 backdrop-blur-sm
					"
				>
					<div
						className="
							w-full max-w-sm rounded-[28px]
							border border-slate-800
							bg-slate-900 p-6
							shadow-2xl
						"
					>
						<h2 className="text-lg font-semibold text-white">Sair da conta?</h2>

						<p className="mt-2 text-sm leading-6 text-slate-400">
							Você poderá entrar novamente a qualquer momento. Seus dados
							permanecerão salvos.
						</p>

						<div className="mt-6 flex gap-3">
							<button
								onClick={toggleLogOut}
								className="
									h-11 flex-1 rounded-xl
									bg-slate-800
									text-sm text-slate-300
									transition hover:bg-slate-700
								"
							>
								Cancelar
							</button>

							<button
								onClick={logOut}
								className="
									h-11 flex-1 rounded-xl
									bg-red-500 text-sm
									font-medium text-white
									transition hover:bg-red-600
								"
							>
								Sair
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
