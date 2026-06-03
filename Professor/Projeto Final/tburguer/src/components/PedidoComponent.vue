<template>
  <div>
    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-hamburguer-content">
          {{ burguer && burguer.nome ? burguer.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="burguer && burguer.foto ? burguer.foto : ''"
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
        <label> Ponto da carne</label>
        <select
          v-model="pontoCarneSelecionado"
          name="ponto-carne"
          id="ponto-carne"
        >
          <option value="" selected>Selecione o ponto</option>
          <option
            v-for="pontoCarne in listaPontosCarne"
            :key="pontoCarne.id"
            :value="pontoCarne"
          >
            {{ pontoCarne.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <label id="opcionais-titulo"> Selecione os opcionais</label>
        <label id="opcionais-subtitulo"> Selecione os complementos</label>

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
export default {
  name: "PedidoComponent",
  props: {
    burguer: null,
  },
  data() {
    return {
      listaPontosCarne: [],
      listaComplementos: [],
      listaBebidas: [],
      nomeCliente: "",
      pontoCarneSelecionado: "",
      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],
    };
  },
  methods: {
    async getTiposPontos() {
      const response = await fetch("http://localhost:3000/tipos_pontos");
      const dados = await response.json();
      this.listaPontosCarne = dados;
    },
    async getOpcionais() {
      const response = await fetch("http://localhost:3000/opcionais");
      const dados = await response.json();
      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },
    async criarPedido(e) {
      e.preventDefault();

      const dadosPedido = {
        nome: this.nomeCliente,
        ponto: this.pontoCarneSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        burguer: this.burguer,
        statusId: 5,
      };

      console.log(dadosPedido);

      const dadosJson = JSON.stringify(dadosPedido);

      const req = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });
    },
  },
  mounted() {
    this.getTiposPontos();
    this.getOpcionais();
  },
};
</script>

<style scoped></style>
