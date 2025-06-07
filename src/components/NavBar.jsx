import { AuthGoogleContext } from "../contexts/authGoogle";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
  const { user } = useContext(AuthGoogleContext);
  const { logOut } = useContext(AuthGoogleContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 flex m-0 text-3xl text-white z-100"
      >
        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block flex flex-col select-none bg-blue-800 w-screen md:w-80 h-screen  text-white fixed  items-center md:relative z-50`}
      >
        <div className="flex  justify-center gap-2 p-5 border-b border-white/50">
          <IoPersonCircleOutline className="size-10 " />
          <div>
            <h1 className="text-xl">Olá {user.displayName}</h1>
            <h1 className="text-[0.75rem]">{user.email}</h1>
          </div>
        </div>
        <div className="p-7 text-2xl  md:text-xl  text-white space-y-5 md:space-y-2 flex-col">
          <button
            onClick={() => {
              navigate("/home");
            }}
            className={`flex items-center gap-5 leading-7 ${
              location.pathname === "/home" ? "text-blue-300" : ""
            }
              )} hover:text-blue-300`}
          >
            <IoHomeSharp />
            <h1>Página inicial</h1>
          </button>
          <button>
            <h1
              onClick={() => navigate("/transactions")}
              className={`flex items-center gap-5 leading-7 ${
                location.pathname === "/transactions" ? "text-blue-300" : ""
              }
              )} hover:text-blue-300`}
            >
              <BiTransfer />
              Transações
            </h1>
          </button>
        </div>
        <div className="items-end-safe  justify-center flex bottom-0">
          <button
            onClick={logOut}
            className="flex gap-4 mt-50 mb:mt-0 text-xl hover:text-white hover:bg-blue-500 bg-white text-black transition-colors items-end p-3 rounded-4xl"
          >
            Sair <IoExitOutline className="size-7 text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};
