import type { Servicotype } from "./Utils/typs.ts";

// lista de serviços
let listaDeServicos: Servicotype[] = [];

// adicionar serviço
export function AdicionarServico(novoServico: Servicotype) {
    if (novoServico.nome !== '' && novoServico.preco !== 0) {
        listaDeServicos.push(novoServico);
        return `novoServico adicionado com sucesso${novoServico}`;
    } else {
        return "Serviço inválido";
    }
}
 
// listar serviços
export function ListarServicos() {
    return listaDeServicos;
}

// remover serviço  
export function RemoverServico(nome: string) {
    if (nome === '') {
        return "Nome inválido";
    }

    if (listaDeServicos.find((servico) => servico.nome === nome)) {
        listaDeServicos = listaDeServicos.filter((servico) => {
            return servico.nome !== nome;
        });
    }else{
        return "Serviço nao encontrado";
    }
    return "Serviço removido com sucesso";

}


