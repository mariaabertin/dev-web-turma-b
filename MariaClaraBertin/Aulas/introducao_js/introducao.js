//comentario

var ola = "Olá Mundo, JS!";
console.log(ola);

function log(valor) {
    console.log(valor);
}

var valor = 10;
log(typeof valor); //number

var palavra = "palavra";
log(typeof palavra); //string

var isOk = true;
log(typeof isOk); //boolean

var meuObj = {}; //Object
var meuArray = []; //Array
var nulo = null; //null
var variavelFlamengo; //undefined

function compararEscopo() {
    if(true) {
        var varDentro = "var dentro do bloco"; //variavel global
        let letDentro = "let dentro do bloco"; //somente dentro do topico de execucao
        const contDentro = "const dentro do bloco"; 
    }
    log(varDentro); //somente esse e visivel fora do bloco
    //log(letDentro);
    //log(constDentro);
}
compararEscopo();

//Operações simples

const n1 = 1;
const n2 = 5;
const valorNumStr = "5";

log(n1+n2);
log(n1/n2);
log(n1 * n2);

log(n1 == n2); //false
log(n2 == valorNumStr); //true
log(n2 === valorNumStr); //false compara tipo

log((n2>n1 || n1>n2) && 1>2); //false


//Listas

let frutas = ["Maça", "Laranja", "Pêssego"];
log(frutas.length); //3
log(frutas[2]); //Pêssego

//add item
frutas.push("Manga");
log(frutas);

//remove último item
frutas.pop();
log(frutas);


//Estruturas condicionais

const idade = 18;
if(idade >= 18) {
    log("Sou adulto");
} else if (idade >= 2) {
    log("Sou uma criança");
} else {
    log("Sou bebê");
}


const instituicao = "CIL";
switch(instituicao){
    case "CEUB":
        log("Faculdade");
        break;
    case "CIL":
        log("Escola de línguas");
        break;
    case "CEM10":
        log("Escola");
        break;
    default:
        log("Não encontrado");
}

for (let loop = 0; loop < 5; loop ++) {
    log(`Meu valor no loop: ${loop}`);
}

let valorWhile = 0;
while (valorWhile < 5) {
    log(`Meu valor no while: ${valorWhile}`);
    valorWhile++;
}


//Funções assíncronas permitem executar operções 
// sem bloquear a execução do código

async function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Dados Recebidos");
        }, 4*1000);
    });
}

async function executarBusca() {
    log("Buscando...");
    let dadosRecebidos = await buscarDados(); //esperar a busca
    log("Finalizado!");
    log(dadosRecebidos);
}

executarBusca();

const objTest = {
    oi(){
        log("oi!");
    },
    tchau(){
        log("tchau!);
    }
}

objTest.oi();
objTest.tchau();