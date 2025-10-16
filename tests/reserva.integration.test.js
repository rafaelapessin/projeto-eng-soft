// tests/reserva.integration.test.js
import request from 'supertest';
import { app, reservas } from '../app.js'; // importa app e reservas do app.js

describe('Integração de rotas', () => {

  // Antes de cada teste, limpa a lista de reservas
  beforeEach(() => {
    reservas.length = 0;
  });

  test('GET / deve retornar 200 e conter texto da página inicial', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Reservas de Salas e Laboratórios');
  });

  test('POST /reservar cria reserva com sucesso', async () => {
    const response = await request(app)
      .post('/reservar')
      .send({
        sala: 'Laboratório de Informática',
        dia: '2025-10-20',
        aula: 3,
        professor: 'João',
        disciplina: 'Matemática',
        turma: '1A'
      });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Reserva concluída com sucesso');
  });

  test('POST /excluir-todas limpa todas reservas', async () => {
    // Adiciona uma reserva para testar exclusão
    reservas.push({
      id: '123',
      sala: 'Laboratório de Informática',
      dia: '2025-10-20',
      aula: 3,
      professor: 'João',
      disciplina: 'Matemática',
      turma: '1A'
    });

    const response = await request(app).post('/excluir-todas');
    expect(response.status).toBe(302); // Redirecionamento
    expect(reservas.length).toBe(0);   // Certifica que as reservas foram removidas
  });

});
