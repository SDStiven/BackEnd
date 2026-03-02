let odjeto = {
    none: "stiven",
    idade:'21',
    algoritimo: function(p){
        console.log(p);
        this.idade = p;
    }

};
console.log(typeof odjeto);
console.log(odjeto);

odjeto.algoritimo(25);