
 export function tesla(parcela){

    let valorInicial= parcela
    let parcelaDuplicado =2
    let dias =30
    let valorTotal
    
    for(let i = 1;i <= dias; i++){
        valorInicial = valorInicial * parcelaDuplicado
    }
    valorTotal = valorInicial
return valorTotal
}

    console.log(`Valor total ao ser pago pelo veicolo em 30 dia é de ${tesla(1
    )}`)