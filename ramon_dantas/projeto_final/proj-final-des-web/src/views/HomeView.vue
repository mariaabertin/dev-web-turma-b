<template>
    <div>
        <BannerComponent />
    </div>
    <div class="destaques">
        <h2>🔥 Lançamentos Pichados</h2>
        <p class="subtitulo">As melhores novidades para o seu setup</p>

        <div class="container-vitrine">
            <div class="card-produto" v-for="produto in produtosDestaque" :key="produto.id">
                <img :src="produto.foto" :alt="produto.nome" />
                <div class="card-info">
                    <h3>{{ produto.nome }}</h3>
                    <p class="preco">R$ {{ produto.valor }},00</p>
                    <button class="btn-comprar" @click="irParaCheckout(produto)">Comprar Agora</button>
                </div>
            </div>
        </div>

        <button class="btn-catalogo" @click="$router.push('/catalogo')">
            Ver Catálogo Completo
        </button>
    </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
export default {
    name: "HomeView",
    components: {
        BannerComponent,
        AlertComponent
    },
    data() {
        return {
            produtosDestaque: []
        };
    },
    methods: {
        async carregarDestaques() {
            const response = await fetch(`${process.env.VUE_APP_API_URL}/catalogo`);
            const dados = await response.json();

            const todosProdutos = [...dados.desktops, ...dados.notebooks];
            this.produtosDestaque = todosProdutos.filter(produto => produto.eh_novidade === true);
        },
        irParaCheckout(produtoSelecionado) {
            const parametroProduto = JSON.stringify(produtoSelecionado);
            const encodedProduto = encodeURIComponent(parametroProduto);
            this.$router.push({ path: "/checkout", query: { produto: encodedProduto } });
        }
    },
    mounted() {
        this.carregarDestaques();
    }

};
</script>

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;
}

.destaques {
    margin: 0 auto;
    margin-top: 2rem;
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
    box-sizing: border-box;
}

.destaques h2 {
    color: var(--color-text-main);
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.subtitulo {
    color: var(--color-text-muted);
    margin-bottom: 2rem;
}

.container-vitrine {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.card-produto {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px var(--color-shadow);
    transition: transform 0.2s;
}

.card-produto:hover {
    transform: translateY(-5px);
}

.card-produto img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-info {
    padding: 1.5rem;
}

.card-info h3 {
    font-size: 1.1rem;
    color: var(--color-text-main);
    margin-bottom: 0.5rem;
}

.preco {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 1rem;
}

.btn-comprar,
.btn-catalogo {
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    border-radius: 6px;
    border: none;
    transition: background 0.3s;
}

.btn-comprar {
    width: 100%;
    padding: 0.8rem;
    background-color: var(--color-primary);
    color: var(--color-text-on-dark);
}

.btn-comprar:hover {
    background-color: var(--color-primary-hover);
}

.btn-catalogo {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background-color: var(--color-navbar);
    color: var(--color-text-on-dark);
}

.btn-catalogo:hover {
    background-color: var(--color-text-main);
}
</style>