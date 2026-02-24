interface pedindoServico {
    cliente: string;
    descricao: string;
    horasestimadas: number;
    urgente: boolean;
}
const pedido: pedindoServico = {
    cliente: "Ismar",
    descricao: "Serviço de limpeza",
    horasestimadas: 5,
    urgente: true
}

function processarPedido(pedido: pedindoServico, precoHora: number): number {
    let taxaUrgencia: number =0.3 
    let total: number 

    if (pedido.urgente) {

        taxaUrgencia = 30;
        total = (pedido.horasestimadas * precoHora) 
        total = total + total * taxaUrgencia 
    }
    else {
        total = pedido.horasestimadas * precoHora;
    }
    
    return total;
}
