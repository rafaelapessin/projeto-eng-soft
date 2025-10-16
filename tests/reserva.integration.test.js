// tests/reserva.integration.test.js
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { jest } from '@jest/globals';
import appModule from '../app.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', appModule); // Importa seu app.js como módulo

describe('Integração de rotas', () => {
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
    const response = await request(app).post('/excluir-todas');
    expect(response.status).toBe(302); // Redirecionamento
  });
});
