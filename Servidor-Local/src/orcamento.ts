import { catalogoServicoatalogoServicos} from "./Servico.js"
import { type PedidoServicoType, type PrestadorType, type ServicoType } from "./Utils/types.js"

const taxaUrgencia: number = 0.3
const minimoParaDesconto: number = 100
const percentagemDesconto: number = 0.1

const servicosSelecionados: ServicoType[] = []
const prestadoresDeServicos: PrestadorType[] = []
const prestadoressSelecionados: PrestadorType[] = []


// funcao para selecionar servicos e horasEstimadas
export function selecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServicos.length; i++) {
        if (catalogoServicos[i]?.nome === nome) {
            servicosSelecionados.push(catalogoServicos[i]!)
            return true
        }
    }
    return false
}


// funcao para selecionar prestadores
export function criarPrestadoresDeServico(novoPrestador: PrestadorType) {
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


// funcao para calcular o orcamento
export function calcularOrcamento(pedido: PedidoServicoType) {
    let totalBruto: number = 0
    let totalFinal: number = 0

    servicosSelecionados.map((servico: ServicoType) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas
        totalBruto = totalBruto + totalDoServico
    })

    totalFinal = totalBruto

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * taxaUrgencia)
    }

    if (totalBruto >= minimoParaDesconto) {
        totalFinal = totalFinal - (totalBruto * percentagemDesconto)
    }

    return totalFinal

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
}