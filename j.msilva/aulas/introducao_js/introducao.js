var ola = "Olá mundo JS!";
console.log(ola);

function log(valor){
    console.log(valor);
}

var valor = 10;
log(typeof valor);

var palavra = "palavra";
log(typeof palavra);

var is0k = true;
log(typeof is0k);

var meuObj = {}; //Objeto
var meuArray = [];
var nulo = null; 
var variavelFlamengo;
log(typeof meuObj);
log(typeof variavelFlamengo);  //Undefined

function compararEscopo(){
    if(true){
        var varDentro = "Var dentro do bloco";
        let letDentro = "Let dentro do bloco - Variável de Bloco";
        const constDentro = "Const dentro do bloco - Variável Imutável";
    }
    log(varDentro); // Funciona
    // log(letDentro); //Não Funciona
    // log(constDentro); //Não Funciona
}
compararEscopo();

//Operações Simples
const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1 + n2); //6
log(n1 / n2); //0.2
log(n1 * n2); //5

//Operações lógicas
log(n1 == n2); //false
log(n2 == valorNumericoStr) //true
log(n2 === valorNumericoStr) //false

log((n2 > n1 || n1 > n2) && 1 > 2) //false

//listas
let frutas = ["Maça", "Banana", "Laranja"]
log(frutas.length);
log(frutas[1]);

//add novo item
frutas.push("Manga");

log(frutas.length);

//Remove o último
frutas.pop();

//Estruturas Condicionais
const idade = 18;
if(idade >= 18){
    log("Maior de idade");
}
else if(idade >= 2){
    log("Sou uma criança");
}
else{
    log("Sou bebê");
}

const instituicao = "CEUB";
switch(instituicao){
    case "CEUB":
        log("faculdade");
        break;
    case "CIL":
        log("Escola de Linguas");
        break;
    case "CEM10":
        log("Escola");
        break;
    default:
        log("Não encontrado (404)");
}

for(let loop = 0; loop < 5; loop++){
    log(`Meu valor mo loop: ${loop}`);
}

let valorWhile = 0;
while(valorWhile < 100){
    log(`O valor do while é ${valorWhile}`);
    valorWhile++
}

//Funções permitem executar operações
//Sem bloquear a execução de código

async function buscarDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Dados Recebidos");
        }, 4 * 1000);
    });
}

async function executarBusca() {
    log("Buscando...");
    let dadosRecebidos = await buscarDados();
    log("Finalizado!");
    log(dadosRecebidos)
}

executarBusca();