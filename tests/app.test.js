// tests/reserva.unit.test.js
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Criação de app de teste
export const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

// Lista de reservas em memória
export let reservas = []

// Mock do Axios
const mock = new MockAdapter(axios)
mock.onPost('https://mockapi.local/reservas').reply(200)

// Rota /reservar
app.post('/reservar', async (req, res) => {
  const { sala, dia, aula, turma, professor, disciplina } = req.body

  // Validação de campos obrigatórios
  if (!sala || !dia || !aula || !turma || !professor || !disciplina) {
    return res.status(400).send('Campos obrigatórios ausentes')
  }

  // Verifica conflito de horário
  const conflito = reservas.find(r => r.sala === sala && r.dia === dia && r.aula === aula)
  if (conflito) return res.status(409).send('Sala já reservada')

  // Adiciona reserva e simula chamada à API
  reservas.push({ sala, dia, aula, turma, professor, disciplina })
  await axios.post('https://mockapi.local/reservas')

  res.status(200).send('Reserva criada')
})

// ----------------------------
// Testes unitários
// ----------------------------
describe('Testes da aplicação', () => {

  // Reseta reservas antes de cada teste
  beforeEach(() => {
    reservas = []
  })

  test('Deve criar uma nova reserva com sucesso', async () => {
    const res = await request(app).post('/reservar').send({
      sala: 'Laboratório de Informática',
      dia: '2025-10-10',
      aula: '1',
      turma: '2ºIPI01',
      professor: 'João',
      disciplina: 'Matemática'
    })
    expect(res.statusCode).toBe(200)
    expect(res.text).toBe('Reserva criada')
  })

  test('Deve rejeitar campos vazios', async () => {
    const res = await request(app).post('/reservar').send({})
    expect(res.statusCode).toBe(400)
    expect(res.text).toBe('Campos obrigatórios ausentes')
  })

  test('Deve detectar conflito de reserva', async () => {
    // Primeira reserva
    await request(app).post('/reservar').send({
      sala: 'Laboratório de Informática',
      dia: '2025-10-10',
      aula: '1',
      turma: '3ºMSI01',
      professor: 'João',
      disciplina: 'Matemática'
    })

    // Reserva conflituosa
    const res = await request(app).post('/reservar').send({
      sala: 'Laboratório de Informática',
      dia: '2025-10-10',
      aula: '1',
      turma: '2ºIPI02',
      professor: 'Maria',
      disciplina: 'História'
    })

    expect(res.statusCode).toBe(409)
    expect(res.text).toBe('Sala já reservada')
  })
})
