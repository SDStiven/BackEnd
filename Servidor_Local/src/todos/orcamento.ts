import { catalogoServicos } from "./Servico.js"
import { type PedidoServicoType, type PrestadorType, type Servicotype } from "../Utils/types.js"

// 1. Constantes de configuração
const taxaUrgencia: number = 0.3              // Percentual extra aplicado em pedidos urgentes (30%)
const minimoParaDesconto: number = 100        // Valor mínimo para aplicar desconto
const percentagemDesconto: number = 0.1       // Percentual de desconto (10%)

// 2. Arrays para armazenar dados durante a execução
const servicosSelecionados: Servicotype[] = []        // Lista de serviços escolhidos pelo cliente
const prestadoresDeServicos: PrestadorType[] = []     // Lista de todos os prestadores cadastrados
const prestadoressSelecionados: PrestadorType[] = []  // Lista de prestadores escolhidos para atender


// funcao para selecionar servicos e horasEstimadas
export function SelecionarServicos(nome: string) {
    // 1. Percorre todos os itens do catálogo de serviços
    for (let i = 0; i < catalogoServicos.length; i++) {

        // 2. Verifica se o serviço atual existe (uso do ?. evita erro se for undefined)
        //    e se o nome dele corresponde ao nome passado como parâmetro
        if (catalogoServicos[i]?.nome === nome) {

            // 3. Adiciona o serviço encontrado ao array de serviços selecionados
            //    O operador ! diz ao compilador que o valor não é nulo/undefined
            servicosSelecionados.push(catalogoServicos[i]!)

            // 4. Retorna true indicando que o serviço foi encontrado e selecionado
            return true
        }
    }

    // 5. Caso nenhum serviço com o nome especificado seja encontrado,
    //    retorna false
    return false
}



// funcao para selecionar prestadores
export function criarPrestadoresDeServico(novoPrestador: PrestadorType) {
    // 1. Verificar se o prestador já existe no array de prestadores
    prestadoresDeServicos.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // 2. Se já existe, não adicionar e retornar mensagem de erro
            return {
                status: false,
                mensagem: "Já existe um prestador de serviço com esse nome",
                data: null
            }
        }
    })

    // 3. Se não existe, adicionar ao array de prestadores
    prestadoresDeServicos.push(novoPrestador)

    // 4. Retornar mensagem de sucesso
    return {
        status: true,
        mensagem: "Prestador adicionado com sucesso",
        data: null
    }
}



// funcao para calcular o orcamento
// Função para calcular o orçamento de um pedido de serviço
export function calcularOrcamento(pedido: PedidoServicoType) {
    // 1. Inicializa variáveis para acumular os totais
    let totalBruto: number = 0
    let totalFinal: number = 0

    // 2. Percorre todos os serviços selecionados
    servicosSelecionados.map((servico: Servicotype) => {
        // Calcula o custo de cada serviço = preço por hora * horas estimadas
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas

        // Soma ao total bruto
        totalBruto = totalBruto + totalDoServico
    })

    // 3. Define o total final inicialmente igual ao bruto
    totalFinal = totalBruto

    // 4. Se o pedido for urgente, aplica taxa de urgência
    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    // 5. Se o total bruto atingir o mínimo para desconto, aplica desconto
    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

    // 6. Retorna o valor final calculado
    return totalFinal
}

// () => {} --- arrow function
// function () {} --- function normal

/* 
urgente: true
taxaUrgencia: 0.3
totalBruto: 100
totalTaxa: 100 * 0.3 = 30
totalFinal: 100 + 30 = 130
 
totalBruto: 100
totalbruto apos urgencia: 150
minimo descnto: 100
percentagem: 10%
desconto sobre total final: 150 * 0.1 = 15
desconto sobre total bruto: 100 * 0.1 = 10
*/


const prestadoresDisponiveis: PrestadorType[] = [];
let prestadoresSelecionados: PrestadorType[] = [];

export function selecionarPrestador(nomePrestador: PrestadorType) {
    // 1. Verifica se o prestador está na lista de disponíveis
    if (prestadoresDisponiveis.includes(nomePrestador)) {
        // 2. Se estiver disponível, adiciona à lista de selecionados
        prestadoresSelecionados.push(nomePrestador);

        // 3. Retorna true indicando que foi adicionado com sucesso
        return true;
    } else {
        // 4. Caso não esteja disponível, retorna false
        return false;
    }
}

export function selecionarPrestadoresDeServico(novoPrestador: PrestadorType) {
    //verificar se os prestadores ja esta no array
    prestadoresDeServicos.map((prestadorExisteente: PrestadorType) => {
        if (prestadorExisteente.nome === novoPrestador.nome) {
            //se o prestador ja existe, nao adicionar e retornar mensagem de erro
            return {
                status: false,
                mensagem: " ja existe um prestador de servicocom esse nome",
                data: null
            }
        }
    })


    //se o prestador nao existe, adicionar ao array de prestadores
    prestadoresDeServicos.push(novoPrestador)
    return {
        status: true,
        mensagem: "Prestador adicionado com sucesso",
        data: null
    }
}

// Função para editar prestador
export function editarPrestadorDeServico(nomeDoPretador: string, novosDadosDoPrestador: PrestadorType) {
    // 1. Verifica se o prestador está na lista de disponíveis /cliclo 
    prestadoresDeServicos.map((prestadorExistente: PrestadorType) => {
        if (prestadorExistente.nome === nomeDoPretador) {
            // 2. Se estiver disponível, adiciona à lista de selecionados
            prestadorExistente.nome === novosDadosDoPrestador.nome
            prestadorExistente.precoHora === novosDadosDoPrestador.precoHora
            prestadorExistente.profissao === novosDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto === novosDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto === novosDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia === novosDadosDoPrestador.taxaUrgencia

            // 3. Retorna true indicando que foi adicionado com sucesso
            return {
                status: true,
                mensagem: 'prestador de servico editado com sucesso',
                data: prestadorExistente
            }
        } else {
            // 4. Caso não esteja disponível, retorna false
            return {
                status: false,
                mensagem: 'Este Pretador de serviso não existe"',
                data: null
            }
        }
    })
}

// Função para pagar prestador
export function apagarPrestador(nomeprestadordeservico: string) {
    const novoArreyprestadoresDeServico: PrestadorType[] = []
    // 1. Verifica se o prestador está na lista de disponíveis / usar ciclo
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        // 2. Se estiver disponível/if para verificar se o nomedo pretador for igual ao nome recebido
        if (nomeprestadordeservico === prestadoresDeServicos[i]?.nome) {
            // se encontrar remover o pretador
            novoArreyprestadoresDeServico.push(prestadoresDeServicos[i]!)
            // 3. Retorna true indicando que foi adicionado com sucesso/ sms
            return {
                status: true,
                mensagem: 'prestador de servico eliminado com sucesso',
                data: novoArreyprestadoresDeServico
            }
        } else {
            // 4. Caso não esteja disponível, retorna false/sms
            return {
                status: false,
                mensagem: 'Este Pretador de serviso não existe para eliminar',
                data: null
            }
        }
    }
}

// Função para pagar prestador
export function apagarPrestadorFilter(nomeprestadordeservico: string) {

    if (!nomeprestadordeservico) {
        return {
            status: false,
            mensagem: 'Prestador de servico nao encontrado',
            data: null
        }
    }

    prestadoresDeServicos.filter((prestadorExistente: PrestadorType) => prestadorExistente.nome !== nomeprestadordeservico)
    return {
        status: true,
        mensagem: 'prestador de servico eliminado com sucesso',
        data: prestadoresDeServicos
    }

}





// funcao para obter prestador de servico pelo nome
export function obterPrestador(nomePrestador: string) {
    const prestadorEncontrado = prestadoresDeServicos.filter((prestador: PrestadorType) => prestador.nome === nomePrestador)

}
// 1. Verifica se o prestador está na lista de disponíveis
// 2. Se estiver disponível, adiciona à lista de selecionados

// 3. Retorna true indicando que foi adicionado com sucesso
// 4. Caso não esteja disponível, retorna false




