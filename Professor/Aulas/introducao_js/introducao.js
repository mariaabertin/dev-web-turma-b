//Se precisar Comentar use //

var ola = "Olá Mundo JS!";
console.log(ola);

function log(valor) {
  console.log(valor);
}

var valor = 10;
log(typeof valor); //number

var palavra = "palavra";
log(typeof palavra); //string

var isOk = true;
log(typeof isOk); // boolean

var meuObj = {}; //Object
var meuArray = []; //Array
var nulo = null; //Null
var variavelFlamengo; //Undefined

function compararEscopo() {
  if (true) {
    var varDentro = "Var dentro do Bloco";
    let letDentro = "Let dentro do Bloco";
    const constDentro = "Const Dentro";
  }
  log(varDentro); //Funciona
  // log(letDentro); //Não Funciona
  //log(constDentro); //Não Funciona
}
compararEscopo();

//Operações Simples

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1 + n2); //6
log(n1 / n2); // 0.2
log(n1 * n2); // 5

//Operações Lógica

log(n1 == n2); //false
log(n2 == valorNumericoStr); //true
log(n2 === valorNumericoStr); //false

log((n2 > n1 || n1 > n2) && 1 > 2); //false

//Listas
let frutas = ["Maça", "Banana", "Laranja"];
log(frutas.length); // 3
log(frutas[1]); // Banana

//add novo item
frutas.push("Manga");

log(frutas);

//Remover o último
frutas.pop();

//Estruturas condicionais
const idade = 18;
if (idade >= 18) {
  log("Sou Adulto");
} else if (idade >= 2) {
  log("Sou uma criança");
} else {
  log("Sou bebê");
}

const instituicao = "CEUB";
switch (instituicao) {
  case "CEUB":
    log("FACULDADE");
    break;
  case "CIL":
    log("ESCOLA DE LÍNGUAS");
    break;
  case "CEM10":
    log("ESCOLA");
    break;
  default:
    log("Não encontrei a opção");
}

for (let loop = 0; loop < 5; loop++) {
  log(`Meu valor no loop: ${loop}`);
}

let valorWhile = 0;
while (valorWhile < 5) {
  log(`Meu valor no while: ${valorWhile}`);
  valorWhile++; // Se esquecer vai ficar infinito
}

//Funções Asíncronas permitem executar operações
// sem bloquear a execução código

async function buscarDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Dados Recebidos");
    }, 4 * 1000);
  });
}

async function executarBusca() {
  log("Buscando...");
  let dadosRecebidos = await buscarDados(); //
  log("Finalizado!");
  log(dadosRecebidos);
}

executarBusca();
