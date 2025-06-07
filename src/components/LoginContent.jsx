import { ModalLogin } from "./ModalLogin";
import { FaCircle } from "react-icons/fa";
export const LoginContent = ({ LoginGoogle, logogoogle }) => {
  return (
    <div className="w-screen h-screen absolute flex flex-col justify-center items-center bg-black/80  text-white m-0 p-0">
      <div className=" justify-center font-bold items-center relative font-[Urbanist] flex text-center flex-col select-none">
        <div className="flex">
          <h1 className="text-5xl md:text-6xl p-2">FINANCE STATUS</h1>
          <div className="relative rounded-full justify-center items-center ">
            <FaCircle
              className="text-blue-700 mr-30 fixed size-5 animate-ping
           "
            />
            <FaCircle
              className="text-blue-700 mr-30 fixed size-5
           "
            />
          </div>
        </div>
        <p className="text-xl font-light  p-2">
          Uma platafoma para controlar suas finanças pessoais com praticidade.
        </p>
        <div className="flex flex-col  text-2xl items-center p-4 gap-4">
          <button
            className="flex items-center  justify-center select-none  hover:scale-105  transition-transform hover:bg-blue-500  text-xl bg-blue-700 text-white p-3 w-max rounded-4xl gap-1.5"
            onClick={LoginGoogle}
          >
            <img
              src={logogoogle}
              className="w-7 text-white  items-center"
              alt="Logo do Google"
            />
            Entrar com Google
          </button>
        </div>
      </div>
      <ModalLogin />
    </div>
  );
};
