window.onload = function() {
    iniciar();
};

function iniciar() {

    const input = document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista = document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", () => {

        //recupera o valor do campo input text
        const texto = input.value.trim();

        //criar um elemento da minha lista de tarefas
        const itemLista = document.createElement("li");

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "x";
        
        //adiciona a classe fechar o botão 
        btnRemover.classList.add("fechar");

        //adiciona o evento delete do item   
        btnRemover.addEventListener("click", () => {
            itemLista.remove();
        });

        //adicionar o valor do input no meu item da lista
        itemLista.textContent = texto;

        //adicionei botão de remover item da lista
        itemLista.appendChild(btnRemover);

        itemLista.addEventListener("Click", () => {
        itemLista.classList.add("concluida");    
        });

        //adicionar o item na lista para ser apreentado
        lista.appendChild(itemLista);

        //limpar o campo input
        input.value = "";
    });

}