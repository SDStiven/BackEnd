// typagem
export interface Servicotype {
  nome: string;
  precoHora: number;
  minimiDesconto: number;
  categoria: string;
  percentagemDesconto?: number;
}

// Lista onde é adicionado os servicos
const ListaServicos:Servicotype[] =[]

// Função para adicionar servico
function AddicionarServico (P_ServicoaAdicionar:Servicotype){
    // pegar o servico e adicionar  ao array
    ListaServicos.push(P_ServicoaAdicionar)
    // 

}