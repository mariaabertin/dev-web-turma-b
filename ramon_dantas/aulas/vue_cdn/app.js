const meuAppVue = {
    data() {
        return {
            nome: "Ramon Dantas",
            idade: 19,
            inputText: "",
        };
    },
};

Vue.createApp (meuAppVue).mount('#app');