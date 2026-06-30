<template>
  <div>
    <AlertaComponent
      :tipo="alerta.tipo"
      :titulo="alerta.titulo"
      :mensagem="alerta.mensagem"
    />

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Arranjo</div>
          <div>Tamanho</div>
          <div>Opções</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <div v-if="carregandoPedidos" class="estado-lista">Carregando pedidos...</div>

    <div v-else-if="listaPedidosRealizados.length === 0" class="estado-lista">
      Nenhuma encomenda cadastrada.
    </div>

    <div
      v-else
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.arranjo.nome }}</div>
      <div>{{ pedido.tamanho.descricao }}</div>
      <div>
        <ul>
          <li v-for="(flor, index) in pedido.flores" :key="index">
            {{ flor.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <p>{{ pedido.embalagem.nome }}</p>
        <p>{{ pedido.entrega.nome }}</p>
        <p v-if="pedido.mensagem">Cartão: {{ pedido.mensagem }}</p>
      </div>
      <div>
        <select
          @change="atualizarStatusPedido($event, pedido)"
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
        <button
          class="botao-excluir"
          type="button"
          title="Excluir pedido"
          aria-label="Excluir pedido"
          @click="deletarPedido(pedido.id)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm0 6h2v9H9V9Zm4 0h2v9h-2V9ZM7 9h10l-1 12H8L7 9Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import AlertaComponent from "./AlertaComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    AlertaComponent,
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      carregandoPedidos: false,
      alerta: {
        tipo: "",
        titulo: "",
        mensagem: "",
      },
    };
  },
  methods: {
    definirAlerta(tipo, titulo, mensagem) {
      this.alerta = { tipo, titulo, mensagem };
    },
    usarPersistenciaLocal() {
      return String(this.$apiUrl).includes("my-json-server.typicode.com");
    },
    buscarPedidosLocais() {
      if (!this.usarPersistenciaLocal()) {
        return [];
      }

      return JSON.parse(localStorage.getItem("tflor_pedidos") || "[]");
    },
    salvarPedidosLocais(pedidos) {
      if (this.usarPersistenciaLocal()) {
        localStorage.setItem("tflor_pedidos", JSON.stringify(pedidos));
      }
    },
    async consultarPedidos() {
      this.carregandoPedidos = true;

      try {
        const response = await fetch(`${this.$apiUrl}/pedidos`);
        const pedidosApi = await response.json();
        this.listaPedidosRealizados = [
          ...pedidosApi,
          ...this.buscarPedidosLocais(),
        ];

        if (this.$route.query.atualizado) {
          this.definirAlerta(
            "info",
            "Lista atualizada",
            "A encomenda recém-cadastrada já aparece no monitoramento."
          );
        } else if (this.listaPedidosRealizados.length === 0) {
          this.definirAlerta(
            "aviso",
            "Sem pedidos",
            "Cadastre uma encomenda no menu para iniciar o acompanhamento."
          );
        }
      } catch (error) {
        this.definirAlerta(
          "erro",
          "Falha ao consultar",
          "Confira se o JSON Server está ativo e tente novamente."
        );
      } finally {
        this.carregandoPedidos = false;
      }
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, pedido) {
      const idStatusAtualizado = Number(event.target.value);

      if (!idStatusAtualizado) {
        return;
      }

      const atualizacaoJson = JSON.stringify({ statusId: idStatusAtualizado });
      await fetch(`${this.$apiUrl}/pedidos/${pedido.id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });

      pedido.statusId = idStatusAtualizado;
      const pedidosLocais = this.buscarPedidosLocais().map((pedidoLocal) =>
        pedidoLocal.id === pedido.id
          ? { ...pedidoLocal, statusId: idStatusAtualizado }
          : pedidoLocal
      );
      this.salvarPedidosLocais(pedidosLocais);
      this.definirAlerta(
        "sucesso",
        "Status atualizado",
        `Pedido #${pedido.id} atualizado com sucesso.`
      );
    },
    async deletarPedido(idPedido) {
      try {
        await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
          method: "DELETE",
        });

        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (pedido) => pedido.id !== idPedido
        );
        const pedidosLocais = this.buscarPedidosLocais().filter(
          (pedido) => pedido.id !== idPedido
        );
        this.salvarPedidosLocais(pedidosLocais);
        this.definirAlerta(
          "sucesso",
          "Pedido excluído",
          `Pedido #${idPedido} removido da listagem.`
        );

        if (this.listaPedidosRealizados.length === 0) {
          this.definirAlerta(
            "aviso",
            "Fila vazia",
            "Todos os pedidos foram removidos do monitoramento."
          );
        }
      } catch (error) {
        this.definirAlerta(
          "erro",
          "Falha ao excluir",
          "Não foi possível remover o pedido agora."
        );
      }
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
  width: min(1100px, 96%);
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
  border-bottom: 2px solid #24473c;
  color: #24473c;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
  text-align: left;
  padding-right: 10px;
}

.pedidos-tabela-linha {
  width: min(1100px, 96%);
  margin: 0 auto;
  padding: 12px;
  border-bottom: 1px dotted #24473c;
  align-items: center;
}

.pedidos-tabela-linha ul {
  margin: 0 0 8px;
  padding-left: 18px;
}

.pedidos-tabela-linha p {
  margin: 4px 0;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

.status {
  padding: 8px;
  border-radius: 8px;
  width: 100%;
}

.botao-excluir {
  border: none;
  background: #fff1f0;
  color: #b42318;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  cursor: pointer;
}

.botao-excluir svg {
  width: 23px;
  height: 23px;
  fill: currentColor;
}

.estado-lista {
  width: min(1100px, 96%);
  margin: 20px auto;
  background: white;
  border: 1px solid #dfe7df;
  border-radius: 8px;
  padding: 18px;
  color: #66736e;
}

@media (max-width: 800px) {
  #pedidos-tabela-cabecalho {
    display: none;
  }

  .pedidos-tabela-linha {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    background: white;
    border: 1px solid #dfe7df;
    border-radius: 8px;
    margin-bottom: 14px;
  }

  #pedidos-tabela-cabecalho div,
  .pedidos-tabela-linha div,
  #pedidos-tabela-cabecalho #ordem-id,
  .pedidos-tabela-linha #ordem-numero,
  .pedidos-tabela-linha #div-acoes,
  #pedidos-tabela-cabecalho #div-acoes {
    width: 100%;
  }
}
</style>
