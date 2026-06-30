<template>
  <div>
    <div id="alerta-lista">
      <AlertComponent :tipo="alertaAtivo.tipo" :mensagem="alertaAtivo.mensagem" />
    </div>

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Teclado</div>
          <div>Switch</div>
          <div>Opcionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.teclado.nome }}</div>
      <div>{{ pedido.tipoSwitch.descricao }}</div>
      <div>
        <ul>
          <li v-for="(acessorio, index) in pedido.acessorios" :key="index">
            {{ acessorio.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(cabo, index) in pedido.cabos" :key="index">
            {{ cabo.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select
          @change="atualizarStatusPedido($event, pedido.id)"
          name="status"
          class="status"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img
          @click="deletarPedido(pedido)"
          src="/img/icone_lixeira.png"
          width="35px"
          height="35px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    AlertComponent,
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      alerta: {
        tipo: "",
        mensagem: "",
      },
    };
  },
  computed: {
    alertaAtivo() {
      if (this.alerta.mensagem) return this.alerta;
      if (this.listaPedidosRealizados.length === 0) {
        return {
          tipo: "info",
          mensagem: "Nenhum pedido encontrado. Acesse o Menu para fazer seu primeiro pedido.",
        };
      }
      return { tipo: "", mensagem: "" };
    },
  },
  methods: {
    exibirAlerta(tipo, mensagem) {
      this.alerta.tipo = tipo;
      this.alerta.mensagem = mensagem;
      this.$nextTick(() => {
        const el = document.getElementById("alerta-lista");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      if (tipo === "sucesso") {
        setTimeout(() => {
          this.alerta.mensagem = "";
          this.alerta.tipo = "";
        }, 3000);
      }
    },
    async consultarPedidos() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/pedidos`);
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
      await fetch(`${process.env.VUE_APP_API_URL}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });
      await this.consultarPedidos();
      this.exibirAlerta("sucesso", "Status do pedido atualizado!");
    },
    async deletarPedido(pedido) {
      const statusBloqueados = [2, 3, 4, 6];
      if (statusBloqueados.includes(Number(pedido.statusId))) {
        const nomeStatus = this.listaStatusPedido.find(
          (s) => s.id == pedido.statusId
        )?.descricao;
        this.exibirAlerta(
          "erro",
          `Não é possível excluir este pedido. Status atual: "${nomeStatus}".`
        );
        return;
      }

      await fetch(`${process.env.VUE_APP_API_URL}/pedidos/${pedido.id}`, {
        method: "DELETE",
      });
      await this.consultarPedidos();
      this.exibirAlerta("sucesso", "Pedido removido com sucesso.");
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #7c3aed;
  color: #e2e8f0;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #7c3aed;
  color: #e2e8f0;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

.status {
  background-color: #16213e;
  color: #e2e8f0;
  border: 1px solid #7c3aed;
  border-radius: 6px;
  padding: 4px;
  cursor: pointer;
}

.pedidos-tabela-linha img {
  cursor: pointer;
  transition: 0.3s;
  filter: brightness(0) invert(1);
}

.pedidos-tabela-linha img:hover {
  filter: brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(1872%) hue-rotate(245deg) brightness(87%) contrast(96%);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.divider {
  height: 4px;
}
</style>
