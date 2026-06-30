const meuAppVue = {
    data() {
        return {
            nome: "Heber Macedo",
            idade: 19,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");

