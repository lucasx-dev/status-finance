# 💰 Finance Status

Um dashboard financeiro interativo e moderno, desenvolvido com **React + TailwindCSS**, que permite acompanhar de forma visual e prática todas as suas entradas, saídas e saldo em tempo real.


## ✨ Funcionalidades

- Visualização de saldo atual (entradas, saídas e total)  
- Cadastro de transações financeiras (entrada e saída)  
- Exclusão de transações com atualização imediata do saldo  
- Gráfico dinâmico com evolução das entradas e saídas (via Recharts)  
- Lista completa de transações com scroll customizado  
- Filtro de transações por tipo (Entrada/Saída/Todas/Outros/Alimentação/  
  Transporte/Saúde/Educação/Lazer/Contas fixas/Mais Antigas)
- Responsividade total (Mobile First)

## 🚀 Tecnologias Utilizadas

- React JS
- TailwindCSS  
- Recharts (para gráficos interativos)  
- Firebase Firestore (para salvar transações e saldo)  
- React Icons (ícones estilizados)


## 🧠 Como Funciona a Aplicação

- Ao abrir o app, os dados de saldo e transações são carregados do **Firestore** (caso estejam salvos).  

- Na página **Home**, é possível adicionar ou remover valores de entrada e saída, além do tipo da transação — todos refletidos imediatamente no saldo.  

- Na página de **Transações**, você vê a lista completa, além de totais de entrada, saída e saldo atual calculado.  

- O gráfico visualiza a linha vermelha para saídas e verde para entradas, movimentando-se conforme inserções.  


## 📁 Estrutura do Projeto

src/
├── assets/ # Logos, imagens e fontes
├── components/ # Componentes
│ ├── ContentPages/ # Componentes das páginas principais
│ ├── Graphics/ # Gráficos com Recharts
│ ├── LoginContent.jsx # Conteúdo visual da tela de login
│ ├── ModalLogin.jsx # Modal de login e cadastro
│ └── NavBar.jsx # Barra de navegação
├── contexts/ # Contextos globais (tema, auth, dados)
├── documents/ # PDF e funcionalidades relacionadas à exportação
├── hooks/ # Hooks personalizados
├── pages/ # Renderização das páginas principais (Home, Login, Transactions)
├── routes/ # Gerenciamento de rotas da aplicação
├── services/ # Integração com Firebase e lógicas auxiliares
├── App.jsx # Componente raiz da aplicação
├── index.css # Estilização global
└── main.jsx # Ponto de entrada do React


## ✅ Desafios e Melhores Implementações

- Storages sincronizados entre **localStorage** e **Firestore** para persistência dos dados.  
- Modal de criação estilizado e intuitivo  
- Scroll customizado com tailwind que suporta longas listas de transação sem afetar o layout.
- Exclusão dinâmica sem recarregar a página  
- Gráfico que reflete entradas e saídas em tempo real  
- Exportação das transações e saldo em PDF

## 🛠️ Possíveis Melhorias Futuras para a plataforma

- Filtro por valor  
- Versão PWA para funcionamento offline completo
- Integrações com outras APIs financeiras  


## 📷 Demonstração

Acesse o projeto ao vivo aqui: https://finance-status.vercel.app/

![alt text](image.png)

## 🧑‍💻 Autor

Desenvolvido por **@lucasx-dev**, Front-end Developer e entusiasta de UI/UX para apps funcionais e intuitivos.

Lucas Albuquerque 2025

## 📄 Licença

Projeto licenciado e protegido sob a **MIT License**.
