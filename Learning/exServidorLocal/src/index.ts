import express from "express";
import type { Request, Response } from "express";
import { AdicionarServico, ListarServicos, RemoverServico } from "./Servicos.js";

const app = express();
app.use(express.json());

// rota: raiz
app.get("/", (req: Request, res: Response) => {
    res.send("Servidor funcionando!");
});

// rota:/saudacao
app.get('/saudacao', (req: Request, res: Response) => {
    const { nome } = req.query;//query-do tipo'chave,valor
    if (nome) {
        res.send(`Olá, ${nome} . Servidor funcionndo ...`)
    } else {
        res.send(`Ola, Visitante`)
    }
})

// rota:/saudacao/nome
app.get('/saudacao/:nome', (req: Request, res: Response) => {
    const nome = req.params.nome
    res.send(`olá,${nome}`)
})

// rota:/id/idade
app.get('/usuario/:nome', (req: Request, res: Response) => {
    const nome = req.params.nome
    const { idade } = req.query
    if(idade){
        res.send(`nome:${nome} e idade:${idade}`)
    }else{
        res.send(`nome:${nome}`)
    }
})

// rota:Adicionar Servico
app.get('/adicionar-servico', (req: Request, res: Response) => {
    const novoServico = req.body
    res.send(AdicionarServico(novoServico))
})


// rota:Listar Servicos
app.get('/listar-servicos', (req: Request, res: Response) => {
    res.send(ListarServicos())
})

// rota:Remover Servico
app.delete('/remover-servico', (req: Request, res: Response) => {
    const { nome } = req.body
    res.send(RemoverServico(nome as string))
})  

// A escuta do servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

