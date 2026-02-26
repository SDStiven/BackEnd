import { response } from "express";

interface Servicotype {
  nome: string;
  precoHora: number;
  minimiDesconto: number;
  categoria: string;
  percentagemDesconto?: number;
}
interface responseType {
  success: boolean;
  message: string;
data: Servicotype|null
}

let catalogoServico: Servicotype[] = [
  {
    nome: "Serviço de limpeza",
    precoHora: 50,
    minimiDesconto: 3,
    percentagemDesconto: 10,
    categoria: "Limpeza",
  },
];
export function adicionarServico(NovoServico: Servicotype): void|responseType {
  // 1. Validação de Dados
  if (NovoServico.nome.trim() === "") {
    console.log("Erro: O nome do serviço não pode ser vazio.");
    return;
  }
  if (NovoServico.precoHora <= 0) {
    console.log("Erro: O preço por hora deve ser um número positivo.");
    return;
  }

  // 2. Verificação de Duplicados
  for (let i = 0; i < catalogoServico.length; i++) {
    if (catalogoServico[i]?.nome === NovoServico.nome) {
      console.log("Erro: O serviço já existe no catálogo.");
      return({
        success: false,
        message: "O serviço já existe no catálogo.",
        data: null
      })
    }
  }


  // 3. Se passou por todos os "filtros" acima, adicionamos
  catalogoServico.push(NovoServico);
}


// listar todos os servicos
export function listarServicos(): Servicotype[] 
{
  return catalogoServico;
}

// todo: implementar fetch de servicos

// apagar um servico
export function apagarServico(nome: string): boolean {
  // todo: implementar fetch de servicos
const novocatalogtempprario: Servicotype[] = []

for (let i = 0; i < catalogoServico.length; i++) {
  if (catalogoServico[i]?.nome !== undefined && catalogoServico[i]?.nome !== nome ){
    novocatalogtempprario.push(catalogoServico[i]!)
  }
} // Densemvolver um novo catalogo sem o serviço a ser apagado
catalogoServico = novocatalogtempprario
return true
}

// obter um serviço por nome
export function obterServico(nome: string): Servicotype | null {
 
  for (let i = 0; i < catalogoServico.length; i++) {
    if (catalogoServico[i]?.nome === nome) {
      return catalogoServico[i]!
    }
  }
  return null
}
