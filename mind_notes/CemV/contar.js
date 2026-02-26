function contar(){
let inicio = document.getElementById('inicio')
let fim = document.getElementById('fim')
let passo = document.getElementById('passo')
let res = document.getElementById('res')  
    let i = Number(inicio.value)
    let f = Number(fim.value)
    let p = Number(passo.value)

// console.log(inicio.value, fim.value, passo.value)

if (i.lenght == 0||f.lenght==0||p.lenght==0){

    window.alert('erroo')

}

for (let c = i ; c <= f ; c+=p ){
    console.log (c)
    res.innerHTML += ` ${c} \u{1F449} `
}



}