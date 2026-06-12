const meuAppVue = {
    data() {
        return {
            nome: "Henrique Bittencourt",
            idade: 19,
            inputText: "",
        };
    }
};
VTTCue.createApp(meuAppVue).mount("#app");