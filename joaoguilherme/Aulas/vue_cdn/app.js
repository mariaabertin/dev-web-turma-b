const meuAppVue = {
    data() {
        return {
            nome: "João Guilherme",
            idade: "19",
            inputText: ""
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");
