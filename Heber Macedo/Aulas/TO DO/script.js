window.onload = function (){
    iniciar();
};
 function iniciar () {
   
    const input = document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista = document.getElementById("listaTarefas");


    btnAdicionar.addEventListener("click", () => {


        //recupera o valor do campo input etext
        const texto = input.value.trim();


        //criar elemento da minha lista de tarefas
        const itemLista = document.createElement("li");


        const btnRemover = document.createElement("button");
        btnRemover.textContent = "x";


        //adiciona classe ao fechar botão
        btnRemover.classList.add("fechar");


        //remove item da lista
        btnRemover.addEventListener("click", () => {
            itemLista.remove()
        });


        //adicionar o valor do input no meu item da lista
        itemLista.textContent = texto;


        //adiciona o botão no item de lista
        itemLista.appendChild(btnRemover);


        itemLista.addEventListener("click", () => {
            itemLista.classList.add("concluida");
        });


        //adicionar o item na lista pra ser apresentado
        lista.appendChild(itemLista);


        //limpar o input
        input.value = "";
    });
}
