var ola = "Olá Mundo JS";
console.log(ola);


function log(valor) {
    console.log(valor);
}


var valor = 10;
    log(typeof valor); //number
var palavra = "string";
    log(typeof palavra); //string
var is0k = true;
    log(typeof is0k); //boolean
var meu0bj = {}; //object
var meuArray = {}; //array
var nulo = null; //Null
var varFla; //undefined


function compararEscopo() {
    if(true) {
        var varDentro = "Var dentro do Bloco"; //variavel fixa
        let letDentro = "Let dentro do Bloco"; //variavel só do bloco
        const constDentro = "Const Dentro"; //constante só do bloco
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
log(n1 + n2); //3
log(n1 / n2); //0.2
log(n1 * n2); //5


//Operações Simples
log(n1 == n2); //false
log(n2 == valorNumericoStr); //tru, compara o conteúdo
log(n2 === valorNumericoStr); //false, compara o tipo
log((n2 > n1|| n1 > n2) && 1 > 2); //false


//Listas
let frutas = ["Maça", "Banana", "Laranja"];
log(frutas.length); //3
log(frutas[1]); //Banana


//add novo item
frutas.push("Manga");


log(frutas);


//Remover o último
frutas.pop();


//Estruturas condicionais
const idade = 18;
if(idade >= 18) {
    log("Sou Adulto");
}
else if (idade >= 2) {
    log("Sou Criança");
}
else {
    log("Sou Bebê");
}


const instituicao = "CEUB";
switch(instituicao){
    case "CEUB":
        log("FACULDADE");
        break;
    case "CIL":
        log ("ESCOLA DE LÍNGUAS");
        break;
    case "CEM 10":
        log("ESCOLA");
        break;
    default:
        log("Não encontrei a opção");
}


for(let loop = 0; loop < 5; loop++) {
    log(`Meu valor no loop: ${loop}`);
}


let valorWhile = 0;
while (valorWhile < 5) {
    log(`Meu valor no loop: ${valorWhile}`);
    valorWhile++; //Se esquecer vai ficar infinito
}




//Funções Assíncronas: permitem executar operações sem
//'''''''''''''''''''' bloquear as execução do código


async function buscarDados () {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve("Dados Recebidos")
        }, 4*1000);
    });
}


async function executarBusca() {
    log("Buscando...");
    let dadosRecebidos = buscarDados();
    log("Finalizado!");
    log(dadosRecebidos);
}
executarBusca();


const meuMetodo = () => {};
log(meuMetodo);


const objTest = {
    oi() {
        log("Oi");
    }
}


function toggleImage() {
    let img = document.getElementById ("minhaImagem");
    img.style.display = img.style.display === "none"? "block" : "none";
}
