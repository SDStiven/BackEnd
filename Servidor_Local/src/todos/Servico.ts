import type { responseType, ServicoMySqlType, Servicotype } from "./Utils/types.js";
import db from "./lib/db.js";

export let catalogoServicos: Servicotype[] = [
  {
    nome: "Serviço de limpeza",
    precoHora: 50,
    minimiDesconto: 3,
    percentagemDesconto: 10,
    categoria: "Limpeza",
  },
];
 
// adicionar um serviço
export function adicionarServico(NovoServico: Servicotype): responseType {
  // 1. Validação de Dados
  if (NovoServico.nome.trim() === "") {
    console.log("Erro: O nome do serviço não pode ser vazio.");
    return{
      success: false,
      message: "O nome do serviço não pode ser vazio.",
      data:"erro:o nome do serviço não pode ser vazio."
    }
  }  
  if (NovoServico.precoHora <= 0) {
    console.log("Erro: O preço por hora deve ser um número positivo.");
    return{
      success: false,
      message: "O preço por hora deve ser um número positivo.",
      data:"erro:O preço por hora deve ser um número positivo."
    }
  }
  for (let i = 0; i < catalogoServicos.length; i++) {
    if (catalogoServicos[i]?.nome === NovoServico.nome) {
      console.log("Erro: O serviço já existe no catálogo.");
      return({
        success: false,
        message: "O serviço já existe no catálogo.",
        data:"erro:O serviço já existe no catálogo."
      })
    }
  }
  // 3. Se passou por todos os "filtros" acima, adicionamos
  catalogoServicos.push(NovoServico);
  return({
    success: true,
    message: "Serviço adicionado com sucesso.",
    data:NovoServico
  })
}
 
// listar todos os servicos
export function listarServicos(): Servicotype[] 
{
  return catalogoServicos;
}

// apagar um servico
export function apagarServico(nome: string): boolean {
  // todo: implementar fetch de servicos
const novocatalogtempprario: Servicotype[] = []
for (let i = 0; i < catalogoServicos.length; i++) {
  if (catalogoServicos[i]?.nome !== undefined && catalogoServicos[i]?.nome !== nome ){
    novocatalogtempprario.push(catalogoServicos[i]!)
  }
} // Densemvolver um novo catalogo sem o serviço a ser apagado
catalogoServicos = novocatalogtempprario
return true
}

// obter um serviço por nome
export function obterServico(nome: string): Servicotype | null {
 
  for (let i = 0; i < catalogoServicos.length; i++) {
    if (catalogoServicos[i]?.nome === nome) {
      return catalogoServicos[i]!
    }
  }
  return null
}

// novo Serviço mysql
export async function novoServico(servico: ServicoMySqlType) {
  console.log({"servico Servico.ts":servico})
  try {
    const novoServico =   await db.execute(
      `
      insert into tbl_servicos
      values(?,?,?,?,?,?,?)
      `,
      [
        null,
        servico.nome,
        servico.descricao,
        servico.categoria,
        servico.enabled,
        servico.create_at,
        servico.apdate_at
      ]
    )
    console.log({"novoServico Servico.ts":novoServico})
    return novoServico
    
  } catch (error) {
    console.log({"catch Servico.ts":error})
    return null
  }
  
}
 
// selecionar todos os servicos mysql
export async function selecionarServicos() {
  try {
    const servicos = await db.execute(
      `
      select * from tbl_servicos
      `
    )
    return servicos[0]
  } catch (error) {
    console.log({"catch Servico.ts":error})
    return null
  }
}
 
// selecionar um servico pelo id mysql
export async function selecionarServicoById(id:string
  
) {
  try {
    const servico = await db.execute(
      `
      select * from tbl_servicos where id = ?
      `,
      [id]
    )
    return servico[0]
  } catch (error) {
    console.log({"catch Servico.ts":error})
    return null
  }
}


