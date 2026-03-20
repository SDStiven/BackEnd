
import express, { type Request, type Response } from "express";
import { router as servicoRouter} from "./routes/servico.route.js";
const app = express(); // cria a aplicação
app.use(express.json()); // para interpretar o corpo das requisições como JSON

app.use("/service", servicoRouter)

// rota inicial
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// inicia o servidor na porta 3000
app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});