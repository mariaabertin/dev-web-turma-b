<template>
    <div class="pedido-container">
        <form @submit="criarPedido($event)">
            <div class="produto-resumo">
                <p>
                    {{ produto && produto.nome ? produto.nome : "--" }}
                </p>
                <img :src="produto && produto.foto ? produto.foto : ''" />
            </div>
            <AlertComponent :mensagem="alertaMenssagem" :tipo="alertaTipo" :icone="alertaIcone"
                :visivel="alertaVisivel" />
            <div class="form-group">
                <label>Nome</label>
                <input v-model="nomeCliente" type="text" placeholder="Digite seu Nome" />
            </div>
            <div class="form-group">
                <label>Opcoes de frete</label>
                <select v-model="opcaoFreteSelecionada" name="opcao-frete">
                    <option value="" selected>Selecione a opcao de frete</option>
                    <option v-for="opcaoFrete in listaOpcoesFrete" :key="opcaoFrete.id" :value="opcaoFrete">
                        {{ opcaoFrete.descricao }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label>Selecione hardwares extras</label>
                <div class="checkbox-container" v-for="hardwares in listaHardwareExtras" :key="hardwares.id">
                    <input type="checkbox" :name="hardwares.nome" :value="hardwares"
                        v-model="hardwareExtraSelecionado" />
                    <span>{{ hardwares.nome }}</span>
                </div>

                <label>Adicione um periférico</label>
                <div class="checkbox-container" v-for="periferico in listaPerifericos" :key="periferico.id">
                    <input type="checkbox" :name="periferico.nome" :value="periferico"
                        v-model="perifericosSelecionados" />
                    <span>{{ periferico.nome }}</span>
                </div>

                <div class="form-group">
                    <input class="btn-submit" type="submit" value="Confirmar Pedido" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import AlertComponent from './AlertComponent.vue';

export default {
    name: "PedidoComponent",
    components: {
        AlertComponent,
    },

    props: {
        produto: null,
    },

    data() {
        return {
            listaOpcoesFrete: [],
            listaHardwareExtras: [],
            listaPerifericos: [],
            nomeCliente: "",
            opcaoFreteSelecionada: "",
            hardwareExtraSelecionado: [],
            perifericosSelecionados: [],
            alertaMenssagem: "",
            alertaTipo: "",
            alertaIcone: "",
            alertaVisivel: false
        };
    },

    methods: {

        async getOpcoesFrete() {
            const response = await fetch(`${process.env.VUE_APP_API_URL}/opcoes_frete`);
            const dados = await response.json();
            this.listaOpcoesFrete = dados;
        },

        async getOpcionais() {
            const response = await fetch(`${process.env.VUE_APP_API_URL}/opcionais`);
            const dados = await response.json();
            this.listaHardwareExtras = dados.hardware_extra;
            this.listaPerifericos = dados.perifericos;
        },

        exibirAlerta(mensagem, tipo, icone) {
            this.alertaMenssagem = mensagem;
            this.alertaTipo = tipo;
            this.alertaIcone = icone;
            this.alertaVisivel = true;

            setTimeout(() => {
                this.alertaVisivel = false;
            }, 5000);
        },

        async criarPedido(e) {
            e.preventDefault();

            if (!this.produto) {
                this.exibirAlerta("Por favor, volte ao catálogo e selecione um produto principal.", "error", "circle-xmark");
                return;
            }
            if (this.nomeCliente.trim() === "" || this.opcaoFreteSelecionada === "") {
                this.exibirAlerta("O nome do cliente e frete são campos obrigatórios!", "warning", "warning");
                return;
            }

            const dadosPedido = {
                nome: this.nomeCliente,
                frete: this.opcaoFreteSelecionada,
                hardware_extra: Array.from(this.hardwareExtraSelecionado),
                perifericos: Array.from(this.perifericosSelecionados),
                produto_principal: this.produto,
                statusId: 1,
            };
            console.log("Enviando dados payload: ", dadosPedido);
            const dadosJson = JSON.stringify(dadosPedido);

            try {
                const req = await fetch(`${process.env.VUE_APP_API_URL}/pedidos`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dadosJson,
                });

                this.exibirAlerta("Pedido Realizado com sucesso! A Redirecionar...", "success", "circle-check")

                this.nomeCliente = "";
                this.opcaoFreteSelecionada = "";
                this.hardwareExtraSelecionado = [];
                this.perifericosSelecionados = [];

                setTimeout(() => {
                    this.$router.push('/pedidos');
                }, 5000);
            }

            catch (error) {
                this.exibirAlerta("Ocorreu um erro de conexão com o servidor.", "error", "circle-xmark");
            }
        },
    },

    mounted() {
        this.getOpcoesFrete();
        this.getOpcionais();
    },
};
</script>

<style scoped>
.pedido-container {
    max-width: 600px;
    margin: 0 auto;
    background: var(--color-surface);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px var(--color-shadow);
}

.produto-resumo {
    text-align: center;
    margin-bottom: 2rem;
}

.produto-resumo img {
    max-width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
    text-align: left;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--color-text-main);
}

.form-group input[type="text"],
.form-group select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    box-sizing: border-box;
    font-family: inherit;
}

.checkbox-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.checkbox-container input {
    margin-right: 0.5rem;
    transform: scale(1.2);
}

.btn-submit {
    width: 100%;
    padding: 1rem;
    background-color: var(--color-primary);
    color: var(--color-text-on-dark);
    font-weight: bold;
    font-size: 1.1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-submit:hover {
    background-color: var(--color-primary-hover);
}
</style>
