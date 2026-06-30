const meuAppVue = {
    data() {
        return {
            nome: "Matheus",
            idade: 21,
            profissao: "Desenvolvedor Web",
            inputText: " ",
        };
    }
};

Vue.createApp(meuAppVue).mount("#app");