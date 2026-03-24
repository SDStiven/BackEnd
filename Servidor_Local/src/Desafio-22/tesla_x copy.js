let valorInicial = 1;
let parcelaDuplicado = 1;
let dias = 30;
let valorTotal;
for (let i = 1; i <= dias; i++) {
  valorInicial = valorInicial + parcelaDuplicado;
//   total = parcelaDuplicado
  console.log(`{Dia:${i},Parcela:${parcelaDuplicado},Total:`);
  parcelaDuplicado *= 2;
}
valorTotal = valorInicial;

console.log(
  `Valor total ao ser pago pelo veicolo em 30 dia é de ${valorTotal}`,
);
