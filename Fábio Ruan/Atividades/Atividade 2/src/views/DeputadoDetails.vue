<template>
  <section class="page-container">
    <button class="back-button" @click="$router.push('/')">← Voltar</button>

    <div v-if="error" class="message error">Não foi possível carregar os detalhes.</div>
    <div v-if="loading" class="message">Carregando dados do deputado...</div>

    <div v-if="deputado && !loading" class="detail-card">
      <div class="profile-card">
        <img :src="deputado.urlFoto" :alt="`Foto de ${deputado.nome}`" />
        <div>
          <h2>{{ deputado.nome }}</h2>
          <p class="tag">{{ deputado.siglaPartido }} - {{ deputado.siglaUf }}</p>
          <p class="email">{{ deputado.email || 'Sem e-mail disponível' }}</p>
        </div>
      </div>

      <h3>Últimas Despesas Declaradas</h3>
      <div v-if="despesas.length === 0" class="message">Nenhuma despesa encontrada.</div>
      <div class="expense-grid">
        <article v-for="item in despesas" :key="item.id">
          <p class="expense-type">{{ item.tipoDespesa }}</p>
          <p class="expense-date">{{ item.dataDocumento }}</p>
          <p class="expense-value">{{ item.valorDespesa }}</p>
          <a :href="item.urlDocumento" target="_blank" rel="noreferrer">Ver Documento Original</a>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'DeputadoDetails',
  setup() {
    const route = useRoute();
    const deputado = ref(null);
    const despesas = ref([]);
    const loading = ref(false);
    const error = ref(false);

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    };

    const fetchDetails = async () => {
      loading.value = true;
      error.value = false;

      try {
        const id = route.params.id;
        const responseDeputado = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`);
        const dataDeputado = await responseDeputado.json();
        const info = dataDeputado.dados;

        deputado.value = {
          nome: info.nome,
          siglaPartido: info.siglaPartido,
          siglaUf: info.siglaUf,
          email: info.email,
          urlFoto: info.urlFoto,
        };

        const responseDespesas = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ordem=DESC&ordenarPor=ano&itens=15`);
        const dataDespesas = await responseDespesas.json();

        despesas.value = dataDespesas.dados.map((item) => ({
          id: item.id,
          tipoDespesa: item.tipoDespesa,
          dataDocumento: formatDate(item.dataDocumento),
          valorDespesa: formatCurrency(Number(item.valorDespesa)),
          urlDocumento: item.urlDocumento,
        }));
      } catch (err) {
        console.error(err);
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchDetails);

    return {
      deputado,
      despesas,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.page-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 1.6rem 1rem 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  padding: 0.85rem 1.1rem;
  border-radius: 0.75rem;
  border: 1px solid #ced4da;
  background: white;
  cursor: pointer;
}

.detail-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
}

.profile-card img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
}

.profile-card h2 {
  margin: 0;
}

.tag {
  margin: 0.5rem 0;
  color: #0e7135;
  font-weight: 700;
}

.email {
  margin: 0;
  color: #555;
}

.expense-grid {
  display: grid;
  gap: 1rem;
}

.expense-grid article {
  background: #f8fafc;
  border-radius: 0.85rem;
  border: 1px solid #e5e7eb;
  padding: 1rem;
}

.expense-type {
  margin: 0;
  font-weight: 700;
  color: #111827;
}

.expense-date,
.expense-value {
  margin: 0.45rem 0;
  color: #4b5563;
}

.expense-grid a {
  display: inline-block;
  margin-top: 0.8rem;
  padding: 0.7rem 1rem;
  background: #034f32;
  color: white;
  border-radius: 0.75rem;
  text-decoration: none;
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
