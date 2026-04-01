window.onload = function () {
  iniciar();
};

function iniciar() {
  const input = document.getElementById("tarefaInput");
  const btnAdicionar = document.getElementById("btnAdicionar");
  const lista = document.getElementById("listaTarefas");

  btnAdicionar.addEventListener("click", () => {
    //recupera o valor do campo input text
    const texto = input.value.trim();

    //Criar um elemento da minha lista de tarefas
    const itemLista = document.createElement("li");

    //Crie um botão
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "x";
    //adiciona a classe fechar ao botão
    btnRemover.classList.add("fechar");

    //Adiciona o evento de delete do item
    btnRemover.addEventListener("click", () => {
      itemLista.remove();
    });

    //Adicionar o valor do input no meu item da lista
    itemLista.textContent = texto;

    //Adicionei o botão no item de lista.
    itemLista.appendChild(btnRemover);

    itemLista.addEventListener("click", () => {
      itemLista.classList.toggle("concluida");
    });

    //Adiciona o imte na lista para ser apresentado
    lista.appendChild(itemLista);

    //Limpar o input
    input.value = "";
  });
}
