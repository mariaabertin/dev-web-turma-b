<template>
  <section class="page-container">
    <div class="search-box">
      <input
        type="text"
        v-model="query"
        @input="debouncedSearch"
        placeholder="Buscar deputado pelo nome..."
        aria-label="Buscar deputado"
      />
      <button @click="fetchDeputados">Buscar</button>
    </div>

    <div v-if="error" class="message error">Erro ao carregar deputados.</div>
    <div v-if="loading" class="message">Carregando deputados...</div>
    <div v-if="!loading && deputados.length === 0" class="message">Nenhum deputado encontrado.</div>

    <div class="grid-list" v-if="deputados.length">
      <article
        v-for="deputado in deputados"
        :key="deputado.id"
        class="card"
        @click="openDeputado(deputado.id)"
      >
        <img :src="deputado.urlFoto" :alt="`Foto de ${deputado.nome}`" />
        <div class="card-body">
          <h3>{{ deputado.nome }}</h3>
          <p class="tag">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</p>
          <p class="email">{{ deputado.email || 'Sem e-mail disponível' }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

let timeoutId = null;

export default {
  name: 'DeputadosList',
  setup() {
    const router = useRouter();
    const deputados = ref([]);
    const query = ref('');
    const loading = ref(false);
    const error = ref(false);

    const fetchDeputados = async () => {
      loading.value = true;
      error.value = false;

      try {
        const filter = query.value.trim() ? `&nome=${encodeURIComponent(query.value.trim())}` : '';
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome${filter}`);
        const data = await response.json();
        deputados.value = data.dados.map((item) => ({
          id: item.id,
          nome: item.nome,
          siglaPartido: item.siglaPartido,
          siglaUf: item.siglaUf,
          email: item.email,
          urlFoto: item.urlFoto,
        }));
      } catch (err) {
        console.error(err);
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    const debouncedSearch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchDeputados, 450);
    };

    const openDeputado = (id) => {
      router.push({ name: 'DeputadoDetails', params: { id } });
    };

    onMounted(fetchDeputados);

    return {
      deputados,
      query,
      loading,
      error,
      fetchDeputados,
      debouncedSearch,
      openDeputado,
    };
  },
};
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.6rem 1rem 2rem;
}

.search-box {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  margin-bottom: 1.4rem;
}

.search-box input,
.search-box button {
  padding: 0.95rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #ced4da;
  font-size: 1rem;
}

.search-box input {
  width: 100%;
}

.search-box button {
  background: #034f32;
  color: white;
  border: none;
  cursor: pointer;
}

.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
  gap: 1rem;
}

.card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.09);
}

.card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-body h3 {
  margin: 0;
  font-size: 1.05rem;
}

.tag {
  margin: 0.5rem 0;
  color: #0e7135;
  font-weight: 700;
}

.email {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
}

.message {
  padding: 1rem;
  border-radius: 0.75rem;
  background: #f8fafc;
  color: #333;
  margin-bottom: 1rem;
}

.error {
  background: #fee2e2;
  color: #b91c1c;
}
</style>
