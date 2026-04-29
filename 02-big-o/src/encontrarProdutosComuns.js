function encontrarProdutosComuns(listaA, listaB) {
  const setA = new Set(listaA);
  return listaB.filter(item => setA.has(item));
}

module.exports = encontrarProdutosComuns;
