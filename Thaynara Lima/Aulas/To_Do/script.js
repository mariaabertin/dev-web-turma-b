window.onload = function (){
    iniciar();
};

function iniciar () {
    const input = document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista = document.getElementById("listaTarefas");

        btnAdicionar.addEventListener("click", () => {
            //recupera o valor do campo input text
        const texto = input.value.trim();

            //criar um elemento da minha lista de tarefas
        const itemLista = document.createElement("li");

            //crie um butão
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "X";

            //adiciona a classe fechar ao botão
        btnRemover.classList.add("fechar");

        btnRemover.addEventListener("click", () => {
            itemLista.remove();
        })

        
            // adicionar o valor do input no meu item da lista
        itemLista.textContent = texto;

            //adicionar botão no itemde lista
         itemLista.appendChild(btnRemover);

            //Adicionar um evento de risco na lista
         itemLista.addEventListener("click", () => {
            itemLista.classList.add("concluida");

            // retira o evento de risco na lista
        itemLista.addEventListener("click", () => {
            itemLista.classList.add("concluida");

         })
            //diciona o item na lista para ser apresentado
        lista.appendChild(itemLista);

    


            //Limpar o input
        input.value = "";

    });
}