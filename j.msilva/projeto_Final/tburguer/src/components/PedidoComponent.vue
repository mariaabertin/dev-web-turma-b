<template>
    <div>
        <form id="pedidoForm">
            <div>
                <p id="nome-hamburguer-component">
                    {{ burguer && burguer.nome ? burguer.nome : '--' }}
                </p>
                <img id="foto-content" :src="burguer && burguer.foto ? burguer.foto : ''">
            </div>
        </form>
    </div>
    <div class="inputs" id="form-pedido">
            <label>Nome:</label>
            <input v-model="nomeCliente" type="text" placeholder="Digite seu Nome" id="nome-cliente"> 
    </div>
    <div class="inputs">
            <label>Ponto da carne:</label>
            <select v-model="pontoCarneSelecionado" name="ponto-carne" id="ponto-carne">
                <option value="ao-ponto" selected v-for="pontoCarne in listaPontosCarne" :key="pontoCarne.id" :value="pontoCarne">
                    {{ pontoCarne.descricao }}
                </option>
            </select>
    </div>
    <div class="inputs">
            <label id="label-opcionais">Selecione os opcionais:</label>
            <label id="label-opcionais-subtitulo">Selecione os complementos:</label>

            <div v-for="complemento in listaComplementos" :key="complemento.id" class="checkbox-container">
                <input v-model="listaComplementosSelecionados" type="checkbox" :name="complemento.nome" :value="complemento" />
                <span>{{ complemento.nome }}</span>
            </div>

            <label>Adicione uma bebida:</label>

            <div v-for="bebida in listaBebidas" :key="bebida.id" class="checkbox-container">
                <input v-model="listaBebidasSelecionadas" type="checkbox" :name="bebida.nome" :value="bebida" />
                <span>{{ bebida.nome }}</span>
            </div>

            <div class="inputs">
                <input type="submit" class="submit-btn" value="Finalizar Pedido" />
            </div>

    </div>
</template>


<script> 
export default {
     name: "PedidoComponent",
     props:{
        burguer: null,
    },
    data() {
        return {
            listaPontosCarne: [],
            listaComplementos: [],
            listaBebidas: [],
            nomeCliente: "",
            pontoCarneSelecionado: null,
            listaComplementosSelecionados: [],
            listaBebidasSelecionadas: [],
        };
    },
    methods:{
        async getTiposPontosCarne() {
            const response = await fetch("http://localhost:3000/pontos-carne");
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
                nomeCliente: this.nomeCliente,
                pontoCarne: this.pontoCarneSelecionado,
                bebidas: Array.from(this.listaBebidasSelecionadas),
                complementos: Array.from(this.listaComplementosSelecionados),
                burguer: this.burguer,
                statusId: 5, // Status "Pedido pendente"
            };
            console.log(dadosPedido);

            const dadosJson = JSON.stringify(dadosPedido);
            const response = await fetch("http://localhost:3000/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: dadosJson,
            });
        }
    },
    mounted() {
        this.getTiposPontosCarne();
        this.getOpcionais();
    }
}; 
</script>

<style scoped></style>