window.onload = function () {
    iniciar();
}

function iniciar() {
    const input = document.getElementById("tarefaInput");
    const btnAdicionar = document.getElementById("btnAdicionar");
    const lista = document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", () => {

        // recupera o valor do campo input text
        const texto = input.value.trim();

        // criar elemeno na lista
        const itemLista = document.createElement("li");
        itemLista.textContent = texto;

        const btnRemover = document.createElement("button");
        btnRemover.classList.add("btnRemover")
        btnRemover.textContent = "X";

        btnRemover.addEventListener("click", () => {
            itemLista.remove();
        });

        itemLista.addEventListener("click", () => {
            itemLista.classList.toggle("concluido")
        })

        itemLista.appendChild(btnRemover);

        //adiciona item à lista
        if (texto && texto.trim() !== "") {
            lista.appendChild(itemLista);
        } else {
            console.log("sem texto");
        }


        input.value = null;
    });
}