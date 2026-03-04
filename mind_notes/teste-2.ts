// Objetivo: praticar a função adicionarServico e listarServicos

// 1. Crie dois novos serviços diferentes
const novoServico1: Servicotype = {
  nome: "Serviço de pintura",
  precoHora: 80,
  minimoDesconto: 5,
  percentagemDesconto: 15,
  categoria: "Construção",
};

const novoServico2: Servicotype = {
  nome: "Serviço de jardinagem",
  precoHora: 40,
  minimoDesconto: 2,
  percentagemDesconto: 5,
  categoria: "Exterior",
};

// 2. Adicione os serviços ao catálogo
console.log(adicionarServico(novoServico1));
console.log(adicionarServico(novoServico2));

// 3. Liste todos os serviços para verificar se foram adicionados
console.log(listarServicos());
