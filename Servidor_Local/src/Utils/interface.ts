interface AlunosType {
    nome:string
    endereco : string
contacto?: string|null
}

const  Alunos: Array <AlunosType> = [
    {
    nome: "tiagogo",
    endereco: "rua 1",
    contacto: "1234567",
}
]

let horasTrabalhadas:number = 10
let precoHoras:number = 10
let TaxaDeUrgencia:number = 10
let desconto:number = 10
let total:number = 10

let variavel: string = "variavel"
desconto=== TaxaDeUrgencia&& desconto>TaxaDeUrgencia?TaxaDeUrgencia +=desconto:TaxaDeUrgencia-= desconto
total = (horasTrabalhadas * precoHoras)+ TaxaDeUrgencia- desconto