const numero = document.getElementById("input");
const select = document.getElementById("tabuada-select");
const sms = document.querySelector(".sms");
const res = document.getElementById("resultado");
const fin = document.getElementById("finalizar");
console.log(res);
let option = document.createElement("option");
let valores = [];

// Função para validação do numero
function isNumero(n) {
  if (Number(n) >= 1 && Number(n) <= 100) {
    return true;
  } else {
    return false;
  }
}
// Função para verificar se o numero já existe na lista
function inLista(n, l) {
  if (l.indexOf(Number(n)) != -1) {
    return true;
  } else {
    return false;
  }
}

// Função quen adiciona o numero a lista
function Adicionar() {
  let nu = numero.value;
  if (isNumero(nu) && !inLista(nu, valores)) {
    numero.classList.add("valido");
    select.classList.add("valido");
    let option = document.createElement("option");
    option.text = `Valor ${nu} adicionado.`;
    select.appendChild(option);
    valores.push(Number(nu));
  } else {
    numero.classList.add("erro");
    alert(`Valor invalido ou já encontrado na lista ${valores}`);
  }
  res.innerHTML = "";
  numero.value = "";
  numero.focus();
}

// Adicionar o numero com a tecla enter
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    Adicionar();
  }
});

// Finalizar a analise dos numeros com a tecla espaço
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    Finalizar();
  }
});

// Função para finalizar a analise dos numeros
function Finalizar() {
  if (valores.length == 0) {
    alert("Adicione valores antes de finalizar!");
  } else {
    let tot = valores.length;
    let maior = valores[0];
    let menor = valores[0];
    let soma = 0;
    let media = 0;

    res.innerHTML = "";
    res.innerHTML = `<p>Ao todo, temos ${tot} números cadastrados.</p>`;

    for (let pos in valores) {
      if (valores[pos] > maior) {
        maior = valores[pos];
      }
      if (valores[pos] < menor) {
        menor = valores[pos];
      }
    }
    res.innerHTML += `<p>O maior valor informado foi ${maior}.</p>`;
    res.innerHTML += `<p>O menor valor informado foi ${menor}.</p>`;
    for (let pos in valores) {
      soma += valores[pos];
    }
    for (let pos in valores) {
      media = soma / tot;
    }
    res.innerHTML += `<p>Somando todos os valores, temos ${soma}.</p>`;
    res.innerHTML += `<p>A média dos valores digitados é ${media}.</p>`;
  }
}
