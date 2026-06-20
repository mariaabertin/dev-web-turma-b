<template>
  <div>
    <mensagem-component v-if="msg" :msg="msg" :tipo="alertType" />

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-hamburguer-content">
          {{ pizza && pizza.nome ? pizza.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="pizza && pizza.foto ? pizza.foto : ''"
        />
      </div>
      <div class="inputs" id="form-pedido">
        <label>Nome</label>
        <input
          v-model="nomeCliente"
          type="text"
          placeholder="Digite seu Nome"
          id="nome-cliente"
        />
      </div>
      <div class="inputs">
        <label>Tamanho da Pizza</label>
        <select
          v-model="tamanhoSelecionado"
          name="tamanho-pizza"
          id="tamanho-pizza"
        >
          <option value="" selected>Selecione o tamanho</option>
          <option
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            :value="tamanho"
          >
            {{ tamanho.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <label id="opcionais-titulo"> Selecione os opcionais</label>
        <label id="opcionais-subtitulo"> Bordas recheadas e adicionais</label>

        <div
          v-for="complemento in listaComplementos"
          :key="complemento.id"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :name="complemento.nome"
            :value="complemento"
            v-model="listaComplementosSelecionados"
          />
          <span>{{ complemento.nome }}</span>
        </div>

        <label>Adicione uma bebida</label>

        <div
          v-for="bebida in listaBebidas"
          :key="bebida.id"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :name="bebida.nome"
            :value="bebida"
            v-model="listaBebidasSelecionadas"
          />
          <span>{{ bebida.nome }}</span>
        </div>

        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MensagemComponent from '@/components/MensagemComponent.vue';

export default {
  name: "PedidoComponent",
  components: {
    MensagemComponent
  },
  props: {
    pizza: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaComplementos: [],
      listaBebidas: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],
      msg: null,
      alertType: "sucesso"
    };
  },
  methods: {
    async getTiposTamanhos() {
      const response = await fetch("https://api-mammamia.onrender.com/tipos_tamanhos");
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch("https://api-mammamia.onrender.com/opcionais");
      const dados = await response.json();
      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente || !this.tamanhoSelecionado) {
        this.msg = "Erro de Preenchimento: Os campos 'Nome' e 'Tamanho da Pizza' precisam estar preenchidos!";
        this.alertType = "erro"; 
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        pizza: this.pizza,
        statusId: 6,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      try {
        const req = await fetch("https://api-mammamia.onrender.com/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dadosJson,
        });

        if (req.ok) {
          this.msg = `Molto bene! Pedido realizado com sucesso para ${dadosPedido.nome}!`;
          this.alertType = "sucesso";

          this.nomeCliente = "";
          this.tamanhoSelecionado = "";
          this.listaComplementosSelecionados = [];
          this.listaBebidasSelecionadas = [];

          setTimeout(() => {
            this.msg = null;
            this.$router.push("/pedidos");
          }, 2000);
        } else {
          this.msg = "Ocorreu um erro ao processar o envio.";
          this.alertType = "erro";
        }
      } catch (error) {
        this.msg = "Erro de conexão com o banco de dados.";
        this.alertType = "erro";
      }
    },
  },
  mounted() {
    this.getTiposTamanhos();
    this.getOpcionais();
  },
};
</script>

<style scoped>

#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-hamburguer-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid darkgoldenrod;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: #222;
  color: darkgoldenrod;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: darkgoldenrod;
  color: #222;
}
</style>