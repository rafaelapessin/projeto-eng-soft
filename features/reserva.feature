# language: pt
Funcionalidade: Reservas de salas e laboratórios
  Como usuário do sistema
  Eu quero cadastrar, visualizar e excluir reservas
  Para organizar o uso dos laboratórios

Cenário: Criar reserva com sucesso
  Dado que o usuário acessa a página de nova reserva
  Quando ele preenche todos os campos corretamente
  E envia o formulário
  Então ele deve ver a mensagem "Reserva concluída com sucesso!"
  E a reserva deve aparecer na lista de reservas
