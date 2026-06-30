const imagem = document.querySelector('.image');
const button = document.querySelector('#button');

button.addEventListener('click', () => {
    imagem.style.display = imagem.style.display === "none" ? "block" : "none";
});