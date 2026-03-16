import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, novoServico, obterServico, selecionarServicoById, selecionarServicos, } from "./Servico.js";
import { apagarPrestador, apagarPrestadorFilter, calcularOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, selecionarPrestador, SelecionarServicos } from "./orcamento.js";
import { getUseById, getUser, novoUtilizador } from "./users.js";
import type { PrestadorMySqlType, ServicoMySqlType, utilizadorMySqlType } from "./Utils/types.js";
import { novoPrestador } from "./Prestador.js";

const app = express(); // cria a aplicação
app.use(express.json()); // para interpretar o corpo das requisições como JSON

// rota inicial
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// rota para adicionar um serviço
app.post("/adicionar-servico", (req: Request, res: Response) => {
  const novoServico = req.body;
  console.log(novoServico);
  const addServico = adicionarServico(novoServico);
  res.json(addServico);
});

// rota para listar todos os serviços
app.get("/listall", (req: Request, res: Response) => {
  const listenerServicoResponse = listarServicos();
  res.json({ listarServicosResponse: listarServicos() });
});

// rota para apagar um serviço 
app.delete("/apagar-servico", (req: Request, res: Response) => {
  const { nome } = req.query
  if (nome) {
    const apagarServicoResponse = apagarServico(nome as string);
    res.json({ apagarServicoResponse })
  } else
    message: "nome do servico não encontrado"
})

// rota para obter servico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
  const { nome } = req.query
  if (nome) {
    const obterServicoResponse = obterServico(nome as string)
    res.json(obterServicoResponse)
  } else {
    { message: "nome do servico é obrigatório" }
  }
})

// rota para selecionar servico
app.post("/selecionar-servico", (req: Request, res: Response) => {
  const { nome } = req.body;

  const selecionarServicoResponse = SelecionarServicos(nome as string);
  res.json({ selecionarServicoResponse })
})

// Rota: coalcula orçamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
  const pedido = req.body;

  const calcularOrcamentoResponse = calcularOrcamento(pedido);
  res.json({ calcularOrcamentoResponse })
})

// rota para selecionar prestador
app.post("/selecionar-prestador", (req: Request, res: Response) => {
  const { novoPrestador } = req.body

  const selecionarPrestadorResponse = criarPrestadoresDeServico(novoPrestador)

  res.json(selecionarPrestadorResponse)
})

// rota para editar prestador
app.put("/editar-prestador", (req: Request, res: Response) => {
  const { nomeDoPretador, novosDadosDoPrestador } = req.body
  const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPretador, novosDadosDoPrestador)

  res.json(editarPrestadorResponse)

})

// rota para apagar prestador
app.delete("/apagar-prestador", (req: Request, res: Response) => {
  const { nome } = req.body
  const apagarPrestadorResponse = apagarPrestador(nome as string);
  res.json(apagarPrestadorResponse)
})

// rota para apagar prestador
app.delete("/apagar-prestadorrrrr", (req: Request, res: Response) => {
  const { nome } = req.body
  const apagarPrestadorResponseFilter = apagarPrestadorFilter(nome as string);
  res.json(apagarPrestadorResponseFilter)
})

// SElecionar todos os utilivadores presentes na base de dados
app.get("//get-users", async (req: Request, res: Response) => {
  const getUserResponse = await getUser()

  res.json(getUserResponse)
})

// SElecionar um utilizador pelo id
app.get("/get-user-By-Id", async (req: Request, res: Response) => {
  const { id } = req.query
  if (id) {
    const getUserResponse = await getUseById(id as string)
    if (!getUserResponse) {
      res.status(404).json({
        status: "error",
        message: "utilizador não encontrado",
        data: null
      })
    }
    res.status(200).json({
      status: "success",
      message: "utilizador encontrado",
      data: getUserResponse
    })
  }
})

// Inserir um novo utilizadormysql
app.post("/novo-utilizador", async (req: Request, res: Response) => {
  const utilizador = req.body as utilizadorMySqlType
  console.log({ " utilizador index.ts": utilizador })
  const novoUtilizadorResponse = await novoUtilizador(utilizador)
  res.json(novoUtilizadorResponse)
})

// Inserir um novo servico mysql
app.post("/novo-servico", async (req: Request, res: Response) => {
  const servico = req.body as ServicoMySqlType
  console.log({ " servico index.ts": servico })
  const novoServicoResponse = await novoServico(servico)
  res.json(novoServicoResponse)
})

// Inserir um novo prestadoresmysql
app.post("/novo-prestador", async (req: Request, res: Response) => {
  const prestador = req.body as PrestadorMySqlType
  console.log({ " prestador index.ts": prestador })
  const novoPrestadorResponse = await novoPrestador(prestador)
  res.json(novoPrestadorResponse)
})

// SElecionar todos os servicos presentes na base de dados
app.get("/get-servicos", async (req: Request, res: Response) => {
  const getServicosResponse = await selecionarServicos()

  res.json(getServicosResponse)
})

// SElecionar um servico pelo id mysql
app.get("/get-servico-by-id", async (req: Request, res: Response) => {
  // const iidd   = req.body
  // const novo = await selecionarServicoById(iidd.id)
  // ou este aqui
  const{id}=req.body 
  const novo = await selecionarServicoById(id)

  res.json(novo)
  
})

// inicia o servidor na porta 3000
app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});