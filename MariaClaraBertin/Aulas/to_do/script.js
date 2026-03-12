window.onload = function () {
    iniciar();
};

function iniciar() {

    const input = document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista =document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", ()=> {
        
        //recupera valor do campo input text
        const texto = input.value.trim();
        
        //cria um elemento da lista
        const itemLista = document.createElement("li");


        //criar botão de remover
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "x";
        btnRemover.classList.add("fechar"); //adiciona classe fechar ao botão

        btnRemover.addEventListener("click", () => {
            itemLista.remove();
        });

        //elemento da lista recebe o texto digitado 
        itemLista.textContent = texto;

        //marca e desmarca como concluida
        itemLista.addEventListener("click", () => {
            itemLista.classList.toggle("concluida");
        });
        
        //adiciona o item e botão remover da lista na lista
        lista.appendChild(itemLista);
        itemLista.appendChild(btnRemover);


        //limpa o input depois de adicionar o item
        input.value = "";
    });
}