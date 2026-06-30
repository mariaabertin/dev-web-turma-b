window.onload = function () {
    iniciar();
};

function iniciar() {
    const input = document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista = document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", ()=> {
    //Recuper valor do campo input text
    const texto = input.value.trim();

    //Criar um elemento da minha lista de tarefas
    const itemLista = document.createElement("li");
    
    //Remover item da Lista
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "x";
    btnRemover.classList.add("fechar");

    btnRemover.addEventListener("click", () => {
        itemLista.remove();
    });

    //Adiconar o valor do input do seu item da Lista
    itemLista.textContent = texto;

    itemLista.appendChild(btnRemover);

    itemLista.addEventListener("click", () => {
        itemLista.classList.toggle("concluida");
    });
    //Adicona o item da lista para ser apresentado
    lista.appendChild(itemLista);

    input.value = "";
});
}