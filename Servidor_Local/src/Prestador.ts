import db from "./lib/db.js"
import type { PrestadorMySqlType } from "./Utils/types.js"

class Prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number

    constructor(
        nomeDoPrestador: string,
        precoHoraDoPrestador: number,
        profissaoDoPrestador: string,
        minimoParaDescontoDoPrestador: number,
        percentagemDescontoDoPrestador: number,
        taxaUrgenciaDoPrestador: number


    ) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.profissao = profissaoDoPrestador
        this.minimoParaDesconto = minimoParaDescontoDoPrestador
        this.percentagemDesconto = percentagemDescontoDoPrestador
        this.taxaUrgencia = taxaUrgenciaDoPrestador
    }

    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }

    alterarNome(novoNome: string) {
        this.nome = novoNome
    }




}
const prestador1 = new Prestador(
    "Ismar",
    100,
    "Eletricista",
    100,
    0.1,
    0.3
)
console.log(prestador1)



// novo prestador mysql
export async function novoPrestador(prestador: PrestadorMySqlType) {
    console.log({ "prestador Prestador.ts": prestador })
    try {
        const novoPrestador = await db.execute(
            `
          insert into tbl_prestadores 
          values(
            ?,?,?,?,?,?,?,?,?
          )
          `,
            [
                prestador.id,
                prestador.nome,
                prestador.profissao,
                prestador.taxa_urgencia,
                prestador.minimo_desconto,
                prestador.nif,
                prestador.persentagem_desconto,
                prestador.preco_hora,
                prestador.disponivel
            ]
        )
        if (!novoPrestador) {
            return {
                status: "error",
                message: "prestador não adicionado",
                data: null
            }
        }
        console.log({ "novoPrestador Prestador.ts": novoPrestador })

        return novoPrestador

    } catch (error) {
        console.log({ "catch Prestador.ts": error })
        return null
    }

}

