const REGRAS_DESCONTO = [
  { tipo: 'premium', minValor: 1000, minAnos: 6, taxa: 0.20 },
  { tipo: 'premium', minValor: 1000, minAnos: 0, taxa: 0.15 },
  { tipo: 'premium', minValor: 500, minAnos: 0, taxa: 0.10 },
  { tipo: 'premium', minValor: 0, minAnos: 0, taxa: 0.05 },

  { tipo: 'gold', minValor: 1000, minAnos: 0, taxa: 0.10 },
  { tipo: 'gold', minValor: 0, minAnos: 0, taxa: 0.02 }
];

function calcularDesconto(cliente, valor) {
  const anosCadastro = cliente.anosCadastro ?? 0;

  const regra = REGRAS_DESCONTO.find(
    ({ tipo, minValor, minAnos }) =>
      tipo === cliente.tipo &&
      valor > minValor &&
      anosCadastro >= minAnos
  );

  return regra ? valor * regra.taxa : 0;
}

module.exports = calcularDesconto;
