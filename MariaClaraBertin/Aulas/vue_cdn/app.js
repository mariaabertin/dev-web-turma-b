const meuAppVue = {
    data() {
        return {
            nome: "Maria",
            idade: 19,
            inputText: ""
        };
    }
};

Vue.createApp(meuAppVue).mount("#app");