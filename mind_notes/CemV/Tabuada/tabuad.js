const numero = document.getElementById("input");
const select = document.getElementById("tabuada-select");
const sms = document.querySelector(".sms");

// Função para calcular a tabuada
function tabuada() {
if (numero.value == 0 ) {
  numero.classList.add("erro");
  numero.focus();
  sms.innerHTML += "Por favor, insira um número válido";
}else {
  select.innerHTML = "";
  sms.innerHTML = "numero válido";
  numero.classList.add('valido')
let n =Number(numero.value)
for (let i = 0; i <= 10; i++) {
  let option = document.createElement("option");
  option.text = `${n} x ${i} = ${i * n}`;
  select.appendChild(option);
}
console.log(numero.value);
}}
