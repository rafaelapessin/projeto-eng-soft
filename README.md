# Projeto Final - Engenharia de Software
### Autor: Rafaela Amorim Pessin

## Objetivo
Projeto desenvolvido para a disciplina de Engenharia de Software com aplicação web simples utilizando Node.js, testes e mock de API.

## Principais requisitos
- App usando Node.js
- Mínimo de 3 telas de interação com o usuário
- Testes unitários
- Testes de integração
- Testes de aceitação
- Comunicação com API externa mockada

## Versões
- node v23.6.0 
- npm 11.0.0
- git version 2.39.2.windows.1
- jest@29.7.0

## Descrição da aplicação
- Aplicação web simples para agendamento de laboratórios em uma escola.
- O sistema permite que o usuário faça reservas de laboratórios, visualize reservas existentes e cancele reservas.
- As reservas são organizadas por laboratório, e ordenadas por data e aula.
- O sistema faz a validação e evita conflitos de agendamento.
- Todos os campos são obrigatórios para efetuar uma reserva.
- O sistema utiliza mock de API para simular uma API externa.
- Utiliza Node.js, Express, Jest e Axios.

## Instalando as dependências
- npm install ou yarn

## Preparando o ambiente
1. Instale o node.js LTS em: https://nodejs.org/en/download
2. Confirme a instalação no terminal digitando os comandos:
    - node -v
    - npm -v
- Se ambos mostrarem uma versão, está tudo certo
3. Crie o projeto
    - mkdir meu-projeto
    - cd meu-projeto
    - npm init -y
- Isso cria o arquivo package.json, que gerencia dependências
4. Instale o Express
    - npm install express
    - npm install -g express-generator
5. Instale e configure o Jest
    - npm install --save-dev jest

## Comandos
- Para verificar se o Node.js está instalado, assim como sua versão, digite no terminal: 
    - node -v
- Para verificar a versão utilizada do npm, digite no terminal: 
    - npm -v
- Para verificar se o git está instalado, digite no terminal: 
    - git --version
        - Se aparecer algo como git version 2.xx, o Git está instalado
        - Se não estiver, baixe aqui: https://git-scm.com/downloads
- Para verificar a versão do jest, use um dos dois comandos: 
    - npx jest --version
    - npm list jest
- Para instalar ferramentas para escrever testes com Jest e configurar variáveis de ambiente de forma correta em diferentes sistemas, execute o seguinte comando:
    - npm install --save-dev jest-cucumber@^4.0.3 cross-env
- Para instalar ferramentas para escrever testes com Jest e simular solicitações HTTP com Axios:
    - npm install --save-dev jest-cucumber axios-mock-adapter
- Instala a versão 2 do pacote node-fetch no seu projeto:
    - npm install node-fetch@2
- Tenta corrigir vulnerabilidades no seu projeto
    - npm audit fix --force

## Criando um repositório
1. Abra seu projeto no VS Code (Arquivo → Abrir Pasta)
2. Clique no ícone de Controle de Código-Fonte (com ramificação) na barra lateral
3. Clique em “Inicializar Repositório”
    - Se preferir, inicialize o Git pelo terminal: git init
4. Na aba de Código-Fonte, você verá seus arquivos listados como “Alterações”. Clique em “+” para adicioná-las. Escreva também uma mensagem.
5. Pressione Ctrl + Enter ou clique no ✓ (Commit)
6. Clique em "Publicar Branch".
7. Escolha entre publicar de forma pública ou privada. 
    - Será necessário logar no GitHub

## Rodando o projeto Node.js do GitHub
1. Baixe uma cópia completa do repositório do GitHub para o seu computador digitando no terminal o comando: git clone https://github.com/rafaelapessin/projeto-eng-soft.git
2. Acesse a pasta do projeto que acabou de ser clonada, digitando no terminal o comando: cd projeto-eng-soft
3. Instale as dependências do projeto digitando no terminal o comando: npm install
4. Inicie o servidor do projeto, digitando no termial um dos seguintes comandos: npm start OU node app.js
5. Abra o endereço local onde o servidor está rodando: http://localhost:3333

## Testes
- Unitários: Testam uma função ou módulo isoladamente
- Integração: Testam como diferentes módulos ou serviços funcionam juntos
- Aceitação / E2E (End-to-End): Testam o sistema como um todo, verificando fluxos completos
- Executa os testes automatizados do projeto conforme definido no package.json:
  - npm run test
- Gera um relatório de cobertura de testes, ou seja, quais partes do código foram testadas):
  - npm run --coverage