
import express, { type Request, type Response } from "express";
import { router as servicoRouter} from "./routes/servico.route.js";
import { router as propostaRouter} from "./routes/proposta.routes.js";
import { router as orcamentoRouter} from "./routes/orcamento.routes.js";
import { router as utilizadorRouter} from "./routes/user.routes.js"; 
import { router as prestadorRouter} from "./routes/prestador.ruotes.js";
import { router as prestacao_servicoRouter} from "./routes/prestacao_servico.routes.js";


const app = express(); // cria a aplicação
app.use(express.json()); // para interpretar o corpo das requisições como JSON

app.use("/servico", servicoRouter)
app.use("/proposta", propostaRouter)
app.use("/orcamento", orcamentoRouter )
app.use("/user", utilizadorRouter)
app.use("/prestador", prestadorRouter)
app.use("/prestacao_servico", prestacao_servicoRouter)

// rota inicial
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// inicia o servidor na porta 3000
app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});