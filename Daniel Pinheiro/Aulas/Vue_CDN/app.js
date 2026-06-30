const meuAppVue = {
    data() {
        return{
            nome: 'Danel Pinheiro',
            idade: 19,
            inputText: "",
        };
    }
};

Vue.createApp(meuAppVue).mount("#app");