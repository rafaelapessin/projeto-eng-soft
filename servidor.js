import { createServer } from 'node:http';

// request = dados da requisição do usuário
// response = resposta enviada de volta ao cliente
const server = createServer((request, response) => {
  console.log('Requisição recebida:', request.url);

  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Servidor Node.js funcionando corretamente!');
});

const PORT = 3332;

server.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:${PORT}');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('A porta ${PORT} já está em uso. Tente outra porta.');
  } else {
    console.error('Erro no servidor:', err);
  }
});
