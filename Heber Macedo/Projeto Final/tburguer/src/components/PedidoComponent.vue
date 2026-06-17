<template>
  <div>
    <alert-component-vue ref="alertComponent" />
    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-pizza-content">
          {{ pizza && pizza.nome ? pizza.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="pizza && pizza.foto ? pizza.foto : ''"
        />
      </div>
      <div class="inputs" id="form-pedido">
        <label>Nome do Cliente *</label>
        <input
          v-model="nomeCliente"
          type="text"
          placeholder="Digite seu Nome"
          id="nome-cliente"
        />
      </div>
      <div class="inputs">
        <label>Tamanho da Pizza *</label>
        <select
          v-model="tamanhoSelecionado"
          name="tamanho"
          id="tamanho"
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
        <label id="adicionais-titulo">Adicionais</label>
        <label id="adicionais-subtitulo">Selecione os complementos</label>

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
          <span>{{ complemento.nome }} - R$ {{ complemento.valor }},00</span>
        </div>

        <label>Bebidas</label>

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
          <span>{{ bebida.nome }} - R$ {{ bebida.valor }},00</span>
        </div>

        <div class="inputs">
          <p id="total-pedido">Total: R$ {{ calcularTotal() }},00</p>
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AlertComponentVue from "./AlertComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    AlertComponentVue,
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
    };
  },
  methods: {
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tipos_pontos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getAdicionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },
    calcularTotal() {
      let total = this.pizza ? this.pizza.valor : 0;
      this.listaComplementosSelecionados.forEach((comp) => {
        total += comp.valor || 0;
      });
      this.listaBebidasSelecionadas.forEach((bebida) => {
        total += bebida.valor || 0;
      });
      return total;
    },
    validarPedido() {
      if (!this.nomeCliente || this.nomeCliente.trim() === "") {
        this.$refs.alertComponent.mostrarAlerta(
          "erro",
          "Por favor, preencha o nome do cliente!"
        );
        return false;
      }
      if (!this.tamanhoSelecionado) {
        this.$refs.alertComponent.mostrarAlerta(
          "erro",
          "Por favor, selecione um tamanho para a pizza!"
        );
        return false;
      }
      return true;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.validarPedido()) {
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        ponto: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        burguer: this.pizza,
        statusId: 5,
      };

      console.log(dadosPedido);

      const dadosJson = JSON.stringify(dadosPedido);

      try {
        const req = await fetch(`${this.$apiUrl}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dadosJson,
        });

        if (req.ok) {
          this.$refs.alertComponent.mostrarAlerta(
            "sucesso",
            "Pedido criado com sucesso!",
            2000
          );

          // Aguarda a exibição do alerta e depois redireciona
          setTimeout(() => {
            this.$router.push("/pedidos");
          }, 2000);
        } else {
          this.$refs.alertComponent.mostrarAlerta(
            "erro",
            "Erro ao criar pedido. Tente novamente."
          );
        }
      } catch (error) {
        console.error(error);
        this.$refs.alertComponent.mostrarAlerta(
          "erro",
          "Erro ao conectar com o servidor"
        );
      }
    },
  },
  mounted() {
    this.getTamanhos();
    this.getAdicionais();
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

#nome-pizza-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: #ff6b35;
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
  border-left: 4px solid #ff6b35;
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

#adicionais-titulo {
  width: 100%;
}

#adicionais-subtitulo {
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

#total-pedido {
  font-size: 20px;
  font-weight: bold;
  color: #ff6b35;
  margin-bottom: 12px;
}

.submit-btn {
  background-color: #222;
  color: #ff6b35;
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
  background-color: #ff6b35;
  color: #222;
}
</style>
