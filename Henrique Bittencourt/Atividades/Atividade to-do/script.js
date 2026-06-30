window.onload = function() {
    iniciar();
};

function iniciar() {
    
    const input=document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista = document.getElementById("listaTarefa");

    btnAdicionar.addEventListener("click",() => {
        
        //RECUPERAR O VALOR DO CAMPO INPUT TEXT
        const texto = input.value.trim();

        //CRIAR UM ELEMENTO DA MINHA LISTA DE TAREFAS
        const itemLista = document.createElement("li");

        const btnRemover = document.createElement("button")
        btnRemover.textContent = "x";
        btnRemover.classList.add("fechar");

        btnRemover.addEventListener("click", () => {
            itemLista.remove();
        });

        itemLista.appendChild(btnRemover);

        itemLista.addEventListener("click" , () => {
            itemLista.classList.toggle("concluida");
        })

        //Adicionar o valor do input do meu item da lista 
        itemLista.textContent = texto;
        
        itemLista.appendChild(btnRemover);

        //Adiciona o intem na lista para ser apresentado 
        lista.appendChild(itemLista);

        input.value = "";

    });

    

}