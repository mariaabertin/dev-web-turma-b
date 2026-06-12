var ola = "Olá mundo JS!";
console.log(ola);

function log(valor) {
    console.log(valor);
}

var valor = 10;
log(typeof valor);

var palavra = "palavra";
log(typeof palavra);

var isOK = true;
log(typeof isOK);

var meuObj = {};
log(typeof objeto);

var meuArray = [];
log(typeof lita);

var nulo = null;
log(typeof null);

var variavelFlamengo;
log(typeof variavelFlamengo);

function compararEscopo() {
    if(true){
        var varDentro = "Var dentro do Bloco";
        let letDentro = "Let dentro do Bloco";
        const constDentro = "Const Dentro";
    }
    log(varDentro);
    //log(letDentro);
    //log(constDentro);
}

compararEscopo();


//Operações Simples 

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1 + n2);
log(n1 / n2);
log(n1 * n2);

//Operações Lógicas

log(n1 == n2);
log(n2 == valorNumericoStr);
log(n2 === valorNumericoStr);

log((n2 > n1 || n1 > n2) && 1 > 2);

//Lista

let frutas = ["Maça","Banana","Laranja"];
log(frutas.length);
log(frutas[1]);


// add novo item
frutas.push("Manga");

log(frutas);

// remove o ultimo

frutas.pop();

//Estruturas condicionais
const idade = 18;
if(idade >= 18){
    log("Sou adulto")
}
    else if(idade >= 2) {
    log ("Sou uma criança");
    }
    else{
        log("Sou um bebe");
    }

const instituicao = "CEUB";
switch(instituicao){
    case "CEUB":
        log("Faculdade");
    break;
    case "CIL":
        log("Escola de linguas");
    break;
    case "CEM10":
        log("Escola");
    break;
    default:
        log ("Não encontrei a opção");

}

for(let loop = 0; loop < 5; loop++){
    log(`Meu valor no loop: ${loop}`);
}
 
let valorWhile = 0; 
while (valorWhile < 5) {
    log(`Meu valor no while: ${valorWhile}`);
    valorWhile++;
}


async function buscarDados(){
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve("Dados recebidos");
        }, 4 * 1000);
    });
    }

async function executarBusca() {
    log("Buscando...");
    let dadosRecebidos = await buscarDados();
    log("Finalizando!");
    log(dadosRecebidos);
}

executarBusca();


