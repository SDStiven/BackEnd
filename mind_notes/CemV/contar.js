function contar() {
  let inicio = document.getElementById("inicio");
  let fim = document.getElementById("fim");
  let passo = document.getElementById("passo");
  let res = document.getElementById("res");
  let i = Number(inicio.value);
  let f = Number(fim.value);
  let p = Number(passo.value);

  // console.log(inicio.value, fim.value, passo.value)
  if (
    inicio.value.length == 0 ||
    fim.value.length == 0 ||
    passo.value.length == 0
  ) {
    return
    window.alert("Faltam dados");
  } else {
    if (i <= f) {
        window.alert("crescente");
      for (let c = i; c <= f; c += p) {
        console.log(c);
        res.innerHTML += ` ${c} \u{1F449} `;
      }
    } else {
      window.alert("descrescente");
      for (let c = i; c >= f; c -= p) {
        console.log(c);
        res.innerHTML += ` ${c} \u{1F449} `;
      }
    }
  }
}
