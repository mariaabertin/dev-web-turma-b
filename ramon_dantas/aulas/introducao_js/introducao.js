var ola = "Olá mundo JS!";
console.log(ola);

function log(valor) {
    console.log(valor);
}

var valor = 10;
log(typeof valor); //number

var palavra = "palavra";
log(typeof palavra); //string

var isOk = true;
log (typeof isOk); //boolea

var meuObj = {}; 
log (typeof meuObj); //Object

var meuArray = [];
log (typeof meuArray); //Array

var nulo = null;
log (typeof nulo); //null

var variavelSla;
log (typeof variavelSla); //undefined

function compararEscopo() {
    if(true){
        var varDentro = "var dentro do bloco";
        let letDentro = "let dentro do bloco";
        const constDentro = "const dentro do bloco";
    }

    log(varDentro);
    //log(letDentro);
    //log(constDentro);
}

compararEscopo();

// Operações Siples

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1 + n2);
log(n1 / n2);
log(n1 * n2);

// oprerações lógicas

log(n1 == n2);
log(n2 == valorNumericoStr);
log(n2 === valorNumericoStr);

log(n1 > n2 || n1> n2 && 1> 2);

// listas

let frutas = ["maçã", "banana", "laranja"];
log(frutas.length);
log(frutas[1]);

//add novos itens
frutas.push("manga");
log(frutas.length);
log(frutas);

//remove o ultimo
frutas.pop();
log(frutas);

//estruturas condicionais 

const idade = 18;

if (idade >=18) {
    log("Sou adulto");
} else if (idade <= 4) {
    log("sou criança");
} else {
    log("sou bebê");
}

const institucao = "CEUB";

switch(institucao){
    case "CEUB":
        log("Faculdade");
        break;
    case "CIL":
        log("Escola de liguas");
        break;
    case "CEM10":
        log("Escola");
        break;
    default:
        log("Não encontrado a opção");
}

//estruturas de repetição

for(let loop = 0; loop < 5; loop++) {
    log(`Meu valor no loop: ${loop}`);
}

let valorWhile = 0;
while(valorWhile < 5){
    log(`Meu valor no while: ${valorWhile}`);
    valorWhile++;
}

//funções asíncronas permitem executar operações
//sem bloquear a execução do código

async function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Dados Recebdos");
        }, 4 * 1000);
    })
}

async function executarBusca() {
    log("buscando...");
    let dadosRecebidos = await buscarDados();
    log("finalizado!");
    log(dadosRecebidos);
    
}

executarBusca();
