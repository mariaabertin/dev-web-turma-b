<template>
    <div class="min-h-screen bg-mist-900 p-10">
        <div class="mx-auto bg-emerald-900 p-8 rounded-lg shadow-md">
            <h1 class="text-3xl font-bold text-white mb-6 text-center">
                Álbum de Figurinhas ⚽
            </h1>
            <p v-if="paisSelecionado" class="text-white text-center text-xl">
                Seleção: <span class="font-bold">{{ paisSelecionado }}</span>
            </p>
        </div>
        <div v-if="listaPaises.length === 0" class="text-center text-gray-400 mt-6">
            <p>Carregando base de dados...</p>
        </div>
        <div v-else class="flex flex-col gap-2 mt-6">
            <label for="paises" class="font-semibold text-gray-200"> Escolha um País</label>
            <select id="paises" 
                v-model="paisSelecionado"
                @change="carregarSelecoes()"
                class="p-3 border border-mist-600 rounded-3xl bg-mist-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white">
                <option value="" disabled>Selecione uma opção...</option>
                <option v-for="pais in listaPaises" :key="pais.name" :value="pais.name">
                    {{ pais.name }}
                </option>
            </select>
        </div>
        <div v-if="listaSelecao.length > 0">
            <h2 class="text-2xl text-white font-bold my-6 text-center">Elenco Convocado</h2>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                <FigurinhaComponent 
                    v-for="jogador in listaSelecao" 
                    :key="jogador.id" 
                    :jogador="jogador"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { getPaises } from '../service/apiFootball';
import { getSelecao } from '../service/apiFootball';
import FigurinhaComponent from '../components/FigurinhaComponent.vue';

export default {
    name: "HomeView",
    components: {
        FigurinhaComponent,
    },
    data() {
        return {
            listaPaises: [],
            paisSelecionado: "",
            listaSelecao: []
        }
    },
    methods: {
        async carregarPaises() {
            try {
                const dados = await getPaises();
                this.listaPaises = dados;
                console.log("Países carregados com sucesso");
            } catch (erro) {
                console.error("Erro ao carregar países:", erro);
            }
        },

        async carregarSelecoes() {
            try {
                const dados = await getSelecao(this.paisSelecionado);
                this.listaSelecao = dados;
                console.log("Seleção carregadas com sucesso");
            } catch (erro) {
                console.error("Erro ao carregar seleção:", erro);
            }
        }
    },
    mounted() {
        this.carregarPaises();
    }
}

</script>

<style scoped></style>