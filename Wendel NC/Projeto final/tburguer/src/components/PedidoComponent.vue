<template>
  <div>
    <div v-if="alerta.visivel" :class="['alerta', alerta.tipo]">
      {{ alerta.mensagem }}
    </div>

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-acai-content">
          {{ acai && acai.nome ? acai.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="acai && acai.foto ? acai.foto : ''"
        />
      </div>

      <div class="inputs" id="form-pedido">
        <label>Nome do Cliente *</label>
        <input
          v-model="nomeCliente"
          type="text"
          placeholder="Digite seu nome"
          id="nome-cliente"
        />
      </div>

      <div class="inputs" id="form-pedido">
        <label>Tamanho do Açaí *</label>
        <select v-model="tamanhoSelecionado" name="tamanho" id="tamanho">
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

      <div class="inputs" id="form-pedido">
        <label id="opcionais-titulo">Selecione os Recheios</label>
        <label id="opcionais-subtitulo">Escolha o que vai dentro do açaí</label>

        <div
          v-for="recheio in listaRecheios"
          :key="recheio.id"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :name="recheio.nome"
            :value="recheio"
            v-model="listaRecheiosSelecionados"
          />
          <span>{{ recheio.nome }}</span>
        </div>

        <label>Adicionais</label>

        <div
          v-for="adicional in listaAdicionais"
          :key="adicional.id"
          class="checkbox-container"
        >
          <input
            type="checkbox"
            :name="adicional.nome"
            :value="adicional"
            v-model="listaAdicionaisSelecionados"
          />
          <span>{{ adicional.nome }}</span>
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
    acai: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaRecheios: [],
      listaAdicionais: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaRecheiosSelecionados: [],
      listaAdicionaisSelecionados: [],
      alerta: {
        visivel: false,
        mensagem: "",
        tipo: "",
      },
    };
  },
  methods: {
    exibirAlerta(mensagem, tipo) {
      this.alerta.mensagem = mensagem;
      this.alerta.tipo = tipo;
      this.alerta.visivel = true;
      setTimeout(() => {
        this.alerta.visivel = false;
      }, 3000);
    },
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tamanhos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaRecheios = dados.recheios;
      this.listaAdicionais = dados.adicionais;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente.trim()) {
        this.exibirAlerta("Por favor, informe o seu nome!", "vermelho");
        return;
      }
      if (!this.tamanhoSelecionado) {
        this.exibirAlerta("Por favor, selecione o tamanho do açaí!", "laranja");
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        recheios: Array.from(this.listaRecheiosSelecionados),
        adicionais: Array.from(this.listaAdicionaisSelecionados),
        acai: this.acai,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      this.exibirAlerta("Enviando pedido...", "azul");

      const req = await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      if (req.ok) {
        this.exibirAlerta("Pedido realizado com sucesso! 🍇", "verde");
        setTimeout(() => {
          this.$router.push("/pedidos");
        }, 2000);
      } else {
        this.exibirAlerta("Erro ao realizar pedido. Tente novamente.", "vermelho");
      }
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();
  },
};
</script>

<style scoped>
.alerta {
  padding: 14px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  margin: 16px auto;
  max-width: 750px;
  text-align: center;
}
.vermelho { background-color: #ffebee; color: #c62828; border: 2px solid #c62828; }
.laranja  { background-color: #fff3e0; color: #e65100; border: 2px solid #e65100; }
.azul     { background-color: #e3f2fd; color: #1565c0; border: 2px solid #1565c0; }
.verde    { background-color: #e8f5e9; color: #2e7d32; border: 2px solid #2e7d32; }

#foto-content {
  display: none;
}

#nome-acai-content {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #4a148c;
  padding: 24px 16px 8px;
  margin: 0;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
}

label {
  font-weight: bold;
  margin-bottom: 12px;
  color: #222;
  padding: 5px 12px;
  display: flex;
  border-left: 4px solid #6a1b9a;
  border-radius: 0;
}

input[type="text"],
select {
  padding: 12px;
  width: 100%;
  max-width: 400px;
  border: solid #ccc 1px;
  border-radius: 8px;
  font-size: 14px;
  height: auto;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
  font-size: 16px;
}

#opcionais-subtitulo {
  width: 100%;
  font-size: 13px;
  font-weight: normal;
  color: #666;
  border-left: 4px solid #ce93d8;
  margin-bottom: 16px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #f3e5f5;
  max-width: 400px;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #6a1b9a;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-container span {
  font-weight: 600;
  color: #4a148c;
  font-size: 15px;
}

.submit-btn {
  background-color: #4a148c;
  color: #ffe082;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 16px auto 0;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: #ffe082;
  color: #4a148c;
}
</style>