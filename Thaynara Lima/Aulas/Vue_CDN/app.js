const meuAppVue = {
    data() {
        return {
            nome: "Thaynara lima",
            idade: 23,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");
