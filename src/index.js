import express from "express";
const app = express(); // cria a aplicação
// rota inicial
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
//# sourceMappingURL=index.js.map