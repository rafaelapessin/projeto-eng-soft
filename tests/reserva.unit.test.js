// tests/reserva.unit.test.js
import { parseDataLocal, formatarDataComDia, gerarId } from '../app.js';

describe('Funções utilitárias', () => {

  test('parseDataLocal converte corretamente', () => {
    const data = parseDataLocal('2025-10-16');
    expect(data.getFullYear()).toBe(2025);
    expect(data.getMonth()).toBe(9); // mês começa do 0
    expect(data.getDate()).toBe(16);
  });

  test('formatarDataComDia retorna o dia da semana correto', () => {
    const str = formatarDataComDia('2025-10-16');
    expect(str).toContain('Quinta-feira');
    expect(str).toContain('16-10-2025');
  });

  test('gerarId gera strings únicas', () => {
    const id1 = gerarId();
    const id2 = gerarId();
    expect(typeof id1).toBe('string');
    expect(id1).not.toBe(id2);
  });

});
