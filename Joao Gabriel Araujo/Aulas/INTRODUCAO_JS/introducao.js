var ola="Olá mundo JS!";
console.log(ola);

function log(valor) {
    console.log(valor);
}

var valor = 10;
log(typeof valor);

var palavra ="palavra";
log(typeof palavra);

var isOk = true;
log(typeof isOk);

var meuObj={};
var meuArray={};
var nulo = null;
var variavelFlamengo;

function compararEscopo() {
    if(true){
        var varDentro = " Var dentro do Bloco";
        let letDentro = "Let dentro do Bloco";
        const contsDentro = "Const Dentro";
    }
    log(varDentro);
}
compararEscopo();

const n1 = 1;
const n2 = 5;
const valorNumericoStr = "5";

log(n1+n2);
log(n1/n2);
log(n1*n2);

log(n1 == n2);
log (n2 ==valorNumericoStr);
log(n2 == valorNumericoStr);
log((n2>n1 || n1 >n2) && 1>2);


let frutas =["maça", "banana", "laranja"];
log(frutas.length);
log(frutas[1]);


frutas.push("Manga");
log(frutas);

frutas.pop();

const idade =18;
if (idade >= 18){
    log("Sou Adulto");
}else if(idade >= 2){
log("Sou criança");
}else{
    log("Sou Bebe");
}

const instituicao ="CEUB";
switch(instituicao) {
    case "CEUB":
    log("FACULDADE");
    break;
    case"CIL":
    log("ESCOLA DE LINGUAS");
    break;
    case"CEM10":
    log("ESCOLA");
    break;
    default:
        log("Nao encontrei A OPÇÂO");
}

for(let loop=0; loop <5; loop++) {
    log(`Meu valor no loop: ${loop}`);
}




async function buscarDados() {
    return new Promise((resolve)=> {
        setTimeout(()=>{

        },4 * 1000);
    });
    
}


async function executarBusca() {
    log("Buscar...");
    let dadosRecebidos = await buscarDados();
    log("Finalizado!");
    log("Dados Recebidos");
    
}

executarBusca();

function toggleImage() {
    let img = document.getElementById("minhaImagem");
    img
}