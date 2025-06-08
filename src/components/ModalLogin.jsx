import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

export const ModalLogin = () => {
  const [openModal, setOpenModal] = useState(null);
  const toggleModal = (key) => {
    setOpenModal(openModal === key ? null : key);
  };

  const contents = {
    privacy: {
      text: `Levamos sua privacidade a sério.\n
              1. Coletamos apenas os dados necessários para o funcionamento da aplicação: nome, e-mail e foto de perfil fornecidos pelo Google. \n
              2. Seus dados são armazenados com segurança usando o serviço Firebase, com autenticação e banco de dados protegidos. \n
              3. Não compartilhamos, vendemos ou divulgamos suas informações a terceiros. \n
              4. As informações financeiras inseridas (saldo, despesas, lucros) são privadas e visíveis apenas para você. \n
              5. Você pode solicitar a exclusão de seus dados a qualquer momento entrando em contato conosco. \n\n
              O uso deste app implica na aceitação desta política.`,
    },
    terms: {
      text: `Ao utilizar este aplicativo, você concorda com os seguintes termos: \n
              1. Este aplicativo foi desenvolvido com o objetivo de ajudar usuários a organizar e visualizar suas finanças pessoais. \n
              2. O acesso é feito exclusivamente por meio de login com Google, e os dados utilizados são nome, e-mail e foto de perfil. \n
              3. Você é responsável pelas informações inseridas no aplicativo. Não nos responsabilizamos por dados incorretos ou incompletos. \n
              4. É proibido o uso deste app para fins ilegais, ofensivos ou que prejudiquem terceiros. \n
              5. Os dados armazenados são protegidos e usados apenas para fins internos do funcionamento do aplicativo. \n
              Podemos atualizar os termos de uso a qualquer momento. O uso contínuo após mudanças significa sua aceitação.\n Se não concordar com algum termo, por favor, não utilize este aplicativo.
            `,
    },
    about: {
      text: `Este aplicativo foi criado para ajudar você a organizar suas finanças de forma simples, segura e visual. \n
             Nosso objetivo é oferecer uma experiência intuitiva, onde você possa acompanhar seu saldo, lucros e despesas com poucos cliques —\n tudo salvo com segurança e visível apenas para você.
             Desenvolvido para facilitar sua vida financeira. 
`,
    },
  };
  return (
    <>
      <footer className="flex flex-col h-20 w-screen justify-center underline items-center bg-blue-700 bottom-0 fixed z-40">
        <p onClick={() => toggleModal("privacy")} className="cursor-pointer">
          Política de Privacidade
        </p>
        <p onClick={() => toggleModal("terms")} className="cursor-pointer">
          Termos de Uso
        </p>
        <p onClick={() => toggleModal("about")} className="cursor-pointer">
          Sobre - Finance Status
        </p>
      </footer>

      {openModal && (
        <div className="fixed inset-0  bg-transparent/90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl overflow-y-auto shadow-xl w-20vw h-[50dvh] ">
            <p className="text-gray-800 text-base whitespace-pre-line">
              {contents[openModal].text}
            </p>
            <button
              onClick={() => setOpenModal(null)}
              className="fixed top-2 right-2 text-red-500 hover:text-red-900 text-2xl"
            >
              <IoCloseCircleSharp className="size-7" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
