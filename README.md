# Projeto Final - Engenharia de Software
# Autor: Rafaela Amorim Pessin

## Objetivo
Projeto desenvolvido para a disciplina de Engenharia de Software com aplicação web simples utilizando Node.js, testes e mock de API.

## Principais requisitos
- App Node.js com no mínimo 3 telas
- Testes unitários
- Testes de integração
- Testes de aceitação
- Comunicação com API externa mockada

## Versões
node v23.6.0 
npm 11.0.0
git version 2.39.2.windows.1

## Comandos
→ Para verificar se o Node.js está instalado, assim como sua versão, digite no terminal: node -v
→ Para verificar a versão utilizada do npm, digite no terminal: npm -v
→ Para verificar se o git está instalado, digite no terminal: git --version
    → Se aparecer algo como git version 2.xx, o Git está instalado
    → Se não estiver, baixe aqui: https://git-scm.com/downloads

## Criando um repositório
1. Abra seu projeto no VS Code (Arquivo → Abrir Pasta)
2. Clique no ícone de Controle de Código-Fonte (com ramificação) na barra lateral
3. Clique em “Inicializar Repositório”
    → Se preferir, inicialize o Git pelo terminal: git init
4. Na aba de Código-Fonte, você verá seus arquivos listados como “Alterações”. Clique em “+” para adicioná-las. Escreva também uma mensagem.
5. Pressione Ctrl + Enter ou clique no ✓ (Commit)
6. Clique em "Publicar Branch".
7. Escolha entre publicar de forma pública ou privada. 
    → Será necessário logar no GitHub

## Rodando o projeto Node.js do GitHub
1. Baixe uma cópia completa do repositório do GitHub para o seu computador digitando no terminal o comando: git clone https://github.com/rafaelapessin/projeto-eng-soft.git
2. Acesse a pasta do projeto que acabou de ser clonada, digitando no terminal o comando: cd projeto-eng-soft
3. Instale as dependências do projeto digitando no terminal o comando: npm install
4. Inicie o servidor do projeto, digitando no termial um dos seguintes comandos: npm start OU node app.js
5. Abra o endereço local onde o servidor está rodando: http://localhost:3333

## Testes
npm test
npm run coverage