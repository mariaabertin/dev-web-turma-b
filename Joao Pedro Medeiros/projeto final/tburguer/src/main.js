import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Variável global usada pelos componentes do projeto, conforme a base de aula.
app.config.globalProperties.$apiUrl =
  process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

app.use(router).mount("#app");
