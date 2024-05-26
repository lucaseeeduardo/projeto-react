#Iniciando o projeto localmente!

Existem alguns passos necessários a serem seguidos para executar o projeto localmente!

1) Abra seu VScode e instale a extensão do WSL
2) Vá em "Destinos do WSL" na aba da extensão
3) Crie uma distribuição (utilizei o Ubuntu 24.0.4 para testar e deu tudo ok)
4) Crie uma pasta qualquer para armzenar o projeto e execute "git clone https://github.com/lucaseeeduardo/projeto-react.git" 
5) Ao clonar o projeto localmente, certifique-se de ter nvm, npm, nodejs e yarn instalados.
/// INICIANDO O FRONT-END
Abra o terminal bash
a) yarn
b) yarn start
// INICIANDO O SERVIDOR (BACK-END)
Abra outro terminal bash
a) yarn setup

//OBS
O front foi configurado para rodar como http na porta 3000 do localhost: "localhost:3000". 
O back foi configurado para rodar como http na porta 3001 do localhost - criado CRUD, ver configuração da API se necessário.
