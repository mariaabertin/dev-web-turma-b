
function alternarImagem() {
    const img = document.getElementById('img');
    img.classList.toggle('escondida');

    document.querySelector('#botao').textContent = img.classList.contains('escondida') ? 'Clique aqui para ver o Danel' : 'Clique aqui para sumir com o Danel';
}


