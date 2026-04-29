//SPR E DIP:
class Pedido {
  constructor({ id, itens, clienteEmail }) {
    this.id = id;
    this.itens = itens;
    this.clienteEmail = clienteEmail;
  }

  validar() {
    if (!this.itens || this.itens.length === 0) {
      throw new Error('Pedido sem itens');
    }
  }

  calcularTotal() {
    const subtotal = this.itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );

    return subtotal > 1000 ? subtotal * 0.9 : subtotal;
  }

  gerarPedidoPago() {
    return {
      id: this.id,
      itens: this.itens,
      clienteEmail: this.clienteEmail,
      total: this.calcularTotal(),
      status: 'pago'
    };
  }
}

class VendasRepository {
  async salvar() {}
}

class NotificadorService {
  async notificar() {}
}

class SistemaDeVendas {
  constructor(
    repository = new VendasRepository(),
    notificador = new NotificadorService()
  ) {
    this.repository = repository;
    this.notificador = notificador;
  }

  async processarVenda(dadosPedido) {
    const pedido = new Pedido(dadosPedido);

    pedido.validar();

    const pedidoPago = pedido.gerarPedidoPago();

    await this.repository.salvar(pedidoPago);

    await this.notificador.notificar(
      pedidoPago.clienteEmail,
      `Pedido ${pedidoPago.id} confirmado. Total: R$ ${pedidoPago.total}`
    );

    return pedidoPago;
  }
}

module.exports = SistemaDeVendas;