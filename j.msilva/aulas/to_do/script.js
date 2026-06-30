window.onload = function() {
    inicar();
}

function inicar(){
    const input = document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista = document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", () => {
        
        //recupera o valor do campo input que o usuário digitar
        const texto = input.value.trim();

        const itemLista = document.createElement("li"); //Criando ulma lista e retornando HTML element
       
        //Criado botão de remover
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "x";
        //adionando classe fechar ao botão
        btnRemover.classList.add("fechar");

        btnRemover.addEventListener("click", () => {
            itemLista.remove();
        });

        itemLista.textContent = texto; //Preenchendo o a lista
        
        //Adicionando o botão de item de lista
        itemLista.appendChild(btnRemover);

        itemLista.addEventListener("click", () => {
            itemLista.classList.toggle("concluida");
        });

        lista.appendChild(itemLista) //adionando item na lista

        input.value = null;
    });

    
    
}