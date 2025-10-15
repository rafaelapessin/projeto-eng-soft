import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const porta = 3333

// Configurações do EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

// "Banco de dados" em memória
let reservas = []

// Função para gerar ID único
function gerarId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000)
}

// 🧩 Função para converter "YYYY-MM-DD" em Date (modo local, sem UTC)
function parseDataLocal(dateString) {
  const [ano, mes, dia] = dateString.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

// Formata data DD-MM-AAAA (com base local)
function formatarDataDDMMYYYY(dateString) {
  const data = parseDataLocal(dateString)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}-${mes}-${ano}`
}

// Formata data com dia da semana (base local)
function formatarDataComDia(dateString) {
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ]

  const data = parseDataLocal(dateString)
  if (isNaN(data)) return "Data inválida"

  const diaSemana = diasSemana[data.getDay()]
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()

  return `${diaSemana}, ${dia}-${mes}-${ano}`
}

// Página inicial: lista de reservas
app.get('/', (req, res) => {
  const reservasOrdenadas = [...reservas]
    .sort((a, b) => {
      const dataA = parseDataLocal(a.dia)
      const dataB = parseDataLocal(b.dia)

      if (dataA.getTime() === dataB.getTime()) return a.aula - b.aula
      return dataA - dataB
    })
    .map(r => ({
      ...r,
      diaFormatado: formatarDataComDia(r.dia)
    }))

  res.render('index', { reservas: reservasOrdenadas })
})

// Tela de nova reserva
app.get('/nova', (req, res) => {
  const hoje = new Date().toISOString().split('T')[0]
  res.render('nova', { erro: null, dados: {}, hoje })
})

// Cadastrar nova reserva
app.post('/reservar', async (req, res) => {
  const { sala, dia, aula, professor, disciplina, turma } = req.body
  const dadosPreenchidos = { sala, dia, aula, professor, disciplina, turma }
  const hoje = new Date().toISOString().split('T')[0]

  // Validação de campos obrigatórios
  if (!sala || !dia || !aula || !professor || !disciplina || !turma) {
    return res.render('nova', {
      erro: 'Todos os campos são obrigatórios!',
      dados: dadosPreenchidos,
      hoje
    })
  }

  // Validação de data passada
  const dataReserva = parseDataLocal(dia)
  const dataHoje = new Date()
  dataHoje.setHours(0, 0, 0, 0)

  if (dataReserva < dataHoje) {
    return res.render('nova', {
      erro: 'Não é possível agendar em datas passadas!',
      dados: dadosPreenchidos,
      hoje
    })
  }

  // Verificar conflito de horário
  const conflito = reservas.find(
    r => r.sala === sala && r.dia === dia && r.aula == aula
  )
  if (conflito) {
    return res.render('nova', {
      erro: 'Esta sala já está reservada para este horário!',
      dados: dadosPreenchidos,
      hoje
    })
  }

  // Criar reserva
  const novaReserva = { id: gerarId(), sala, dia, aula, professor, disciplina, turma }
  reservas.push(novaReserva)

  // Simula envio a API mock
  await axios.post('https://mockapi.local/reservas', novaReserva).catch(() => {})

  // Renderiza sucesso com data formatada
  res.render('sucesso', {
    reserva: {
      ...novaReserva,
      diaFormatado: formatarDataComDia(novaReserva.dia)
    }
  })
})

// Excluir reserva individual
app.post('/excluir/:id', (req, res) => {
  const { id } = req.params
  reservas = reservas.filter(r => r.id !== id)
  res.redirect('/')
})

// Excluir todas reservas
app.post('/excluir-todas', (req, res) => {
  reservas = []
  res.redirect('/')
})

// Iniciar servidor
app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
})
