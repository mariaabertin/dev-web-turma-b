<template>
    <div class="lista-pedidos-container">
        <AlertComponent :mensagem="alertaMenssagem" :tipo="alertaTipo" :icone="alertaIcone" :visivel="alertaVisivel" />
        <div v-if="listaPedidosRealizados.length === 0" class="empty-state">
            <p>Nenhuma encomenda recebida ainda.</p>
            <router-link to="/catalogo" class="btn-voltar">Ver Catálogo</router-link>
        </div>

        <div class="pedidos-grid" v-else>
            <div class="pedido-card" v-for="pedido in listaPedidosRealizados" :key="pedido.id">

                <div class="pedido-header">
                    <span class="pedido-id"># {{ pedido.id }}</span>
                    <select @change="atualizarStatusPedido($event, pedido.id)" name="status" class="status-select">
                        <option value="">Status...</option>
                        <option v-for="status in listaStatusPedido" :key="status.id" :value="status.id"
                            :selected="status.id == pedido.statusId">
                            {{ status.descricao }}
                        </option>
                    </select>
                </div>

                <div class="pedido-body">
                    <div class="info-row">
                        <span class="label">Cliente:</span>
                        <span class="value font-bold">{{ pedido.nome }}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Setup:</span>
                        <span class="value text-primary">{{ pedido.produto_principal ? pedido.produto_principal.nome :
                            'N/A' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Frete:</span>
                        <span class="value">{{ pedido.frete ? pedido.frete.descricao : 'N/A' }}</span>
                    </div>

                    <div class="adicionais-section"
                        v-if="(pedido.hardware_extra && pedido.hardware_extra.length) || (pedido.perifericos && pedido.perifericos.length)">
                        <p class="adicionais-titulo">Itens Adicionais:</p>
                        <ul class="adicionais-lista">
                            <li v-for="(hardware, index) in pedido.hardware_extra" :key="'hw-' + index">
                                + {{ hardware.nome }}
                            </li>
                            <li v-for="(periferico, index) in pedido.perifericos" :key="'perif' + index">
                                + {{ periferico.nome }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="pedido-footer">
                    <button class="btn-deletar" @click="deletarPedido(pedido.id)">
                        🗑️ Eliminar Pedido
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AlertComponent from './AlertComponent.vue';

export default {
    name: "ListaPedidoComponent",

    components: {
        AlertComponent,
    },

    data() {
        return {
            listaPedidosRealizados: [],
            listaStatusPedido: [],
            alertaMenssagem: "",
            alertaTipo: "",
            alertaIcone: "",
            alertaVisivel: false
        };
    },

    methods: {
        exibirAlerta(mensagem, tipo, icone) {
            this.alertaMenssagem = mensagem;
            this.alertaTipo = tipo;
            this.alertaIcone = icone;
            this.alertaVisivel = true;

            setTimeout(() => {
                this.alertaVisivel = false;
            }, 5000);
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
            try {
                await fetch(`${process.env.VUE_APP_API_URL}/pedidos/${idPedido}`, {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: atualizacaoJson,
                });
                this.exibirAlerta("Estado de encomenda atualizado!", "success", "circle-check");
                this.consultarPedidos();
            }
            catch (error) {
                this.exibirAlerta("Erro ao atualizar estado.", "error", "circle-xmark");
            }
        },

        async deletarPedido(idPedido) {
            try {
                await fetch(`${process.env.VUE_APP_API_URL}/pedidos/${idPedido}`, {
                    method: "DELETE",
                });
                this.listaPedidosRealizados;
                this.exibirAlerta("Pedido eliminado permanentemente.", "warning", "warning")
                this.consultarPedidos();
            }
            catch (error) {
                this.exibirAlerta("Erro ao eliminar.", "error", "circle-xmark");
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
.lista-pedidos-container {
    width: 100%;
}

.empty-state {
    text-align: center;
    padding: 3rem;
    background: var(--color-surface);
    border-radius: 8px;
    border: 1px dashed var(--color-border);
}

.empty-state p {
    color: var(--color-text-muted);
    margin-bottom: 1.5rem;
}

.btn-voltar {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: var(--color-primary);
    color: var(--color-text-on-dark);
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
}

.pedidos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
}

.pedido-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px var(--color-shadow);
    transition: transform 0.2s ease;
}

.pedido-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px var(--color-shadow);
}

.pedido-header {
    background-color: var(--color-navbar);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px 8px 0 0;
}

.pedido-id {
    color: var(--color-text-on-dark);
    font-weight: bold;
    font-size: 1.1rem;
}

.status-select {
    padding: 0.4rem;
    border-radius: 4px;
    border: none;
    background-color: var(--color-surface);
    font-family: inherit;
    font-size: 0.9rem;
    cursor: pointer;
}

.pedido-body {
    padding: 1.5rem;
    flex-grow: 1;
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.4rem;
}

.info-row .label {
    color: var(--color-text-muted);
    font-size: 0.9rem;
}

.info-row .value {
    color: var(--color-text-main);
    text-align: right;
    max-width: 60%;
}

.font-bold {
    font-weight: bold;
}

.text-primary {
    color: var(--color-primary);
    font-weight: bold;
}

.adicionais-section {
    margin-top: 1rem;
    background-color: var(--color-bg);
    padding: 1rem;
    border-radius: 6px;
}

.adicionais-titulo {
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--color-text-main);
    margin-bottom: 0.5rem;
}

.adicionais-lista {
    list-style: none;
    padding: 0;
    margin: 0;
}

.adicionais-lista li {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-bottom: 0.3rem;
}

.pedido-footer {
    padding: 1rem;
    border-top: 1px solid var(--color-border);
}

.btn-deletar {
    width: 100%;
    padding: 0.8rem;
    background-color: var(--color-surface);
    color: var(--color-error);
    border: 1px solid var(--color-error);
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-deletar:hover {
    background-color: var(--color-error);
    color: var(--color-text-on-dark);
}
</style>
