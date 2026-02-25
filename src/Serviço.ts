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
  console.log("Sucesso: Serviço adicionado ao catálogo.");
}
