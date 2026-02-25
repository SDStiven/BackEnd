import express from "express"
import{adicionarServico} from "./Serviço.js"


const app = express(); // cria a aplicação

// rota inicial
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/adicionar-servico", (req, res) => {
  const novoServico = req.body
  
  adicionarServico(novoServico)
})

// inicia o servidor na porta 3000
app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});
 
 
