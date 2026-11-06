// Cardápio da lanchonete: id do campo de quantidade, nome e preço
const cardapio = [
    { id: "qtdXBurguer", nome: "X-Burguer", preco: 18 },
    { id: "qtdPastel", nome: "Pastel", preco: 8 },
    { id: "qtdCoxinha", nome: "Coxinha", preco: 7 },
    { id: "qtdSuco", nome: "Suco natural", preco: 6 }
];

const botao = document.getElementById("btnCalcular");
botao.addEventListener("click", calcularPedido);

function calcularPedido() {
    // 1. Monta a lista de itens escolhidos (quantidade maior que zero)
    const itensEscolhidos = [];
    for (let i = 0; i < cardapio.length; i++) {
        const quantidade = document.getElementById(cardapio[i].id).value;
        if (quantidade > 0) {
            itensEscolhidos.push({
                nome: cardapio[i].nome,
                quantidade: quantidade,
                valor: quantidade * cardapio[i].preco
            });
        }
    }

    // 2. Mostra os itens no resumo e calcula o subtotal
    const lista = document.getElementById("listaItens");
    lista.innerHTML = "";
    let subtotal = 0;
    // Erro 5: lógica utilizava -1, excluindo o último elemento.
    for (let i = 0; i < itensEscolhidos.length; i++) {
        const item = itensEscolhidos[i];
        lista.innerHTML += "<li>" + item.quantidade + "x " + item.nome + ": R$ " + item.valor + "</li>";
        subtotal = subtotal + item.valor;
    }

    // 3. Soma a taxa de entrega
    const taxa = document.getElementById("taxaEntrega").value;
    // erro 4: erro na conversão dos valores.
    const total = Number(subtotal) + Number(taxa);

    document.getElementById("subtotal").textContent = "R$ " + subtotal;
    document.getElementById("total").textContent = "R$ " + total;
}
