<template>
  <div v-if="visivel" :class="['mensagem-container', tipoAlerta]">
    <span class="icone-alerta">{{ icone }}</span>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  data() {
    return {
      visivel: false,
      msg: "",
      tipoAlerta: "sucesso", 
      icone: "✓"
    };
  },
  methods: {
    
    exibirMensagem(texto, tipo = "sucesso") {
      this.msg = texto;
      this.tipoAlerta = tipo;
      this.visivel = true;

     
      if (tipo === "sucesso") this.icone = "✓";
      else if (tipo === "erro") this.icone = "✕";
      else if (tipo === "aviso") this.icone = "⚠";
      else if (tipo === "info") this.icone = "ℹ";

      setTimeout(() => {
        this.visivel = false;
        this.msg = "";
      }, 4000);
    }
  }
};
</script>

<style scoped>

.mensagem-container {
  position: fixed;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 400px;
}

.icone-alerta {
  font-size: 18px;
  font-weight: bold;
  margin-right: 12px;
}

.mensagem-container p {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.sucesso {
  background-color: #e8f8f5;
  color: #2ecc71;
  border-left: 5px solid #2ecc71;
}

.erro {
  background-color: #fdedec;
  color: #e74c3c;
  border-left: 5px solid #e74c3c;
}

.aviso {
  background-color: #fef5e7;
  color: #e67e22;
  border-left: 5px solid #e67e22;
}

.info {
  background-color: #eaf2f8;
  color: #2980b9;
  border-left: 5px solid #2980b9;
}
</style>