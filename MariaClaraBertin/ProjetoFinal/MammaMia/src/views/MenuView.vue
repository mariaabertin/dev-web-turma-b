<template>
  <div class="menu-container">
    <h1 class="menu-titulo">Menu Mamma Mia</h1>
    <p class="menu-subtitulo">Tradizione e Passione in Ogni Fetta</p>
    
    <div id="scroll-horizontal">
      <div id="card-content" v-for="pizza in listaMenuPizzas" :key="pizza.id">
        <div class="card-inner">
          <div class="foto-pizza">
            <img 
              width="300"
              height="200"
              :src="pizza.foto"
              :alt="pizza.nome"
            />
          </div>
          <div class="card-coluna">
            <p id="nome-content">{{ pizza.nome }}</p>
            <p id="preco-content">R$ {{ pizza.valor }},00</p>
            <p id="descricao-content">{{ pizza.descricao }}</p>
            <button class="btn-selecionar" @click="selecionarPizza(pizza)">
              Selecionar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data(){
    return{
      listaMenuPizzas: [],
    };
  },
  methods: {
    async consultarMenu() {
      try {
        const response = await fetch("https://api-mammamia.onrender.com/menu"); 
        const dados = await response.json();
        if (dados && dados.pizzas) {
          this.listaMenuPizzas = dados.pizzas;
        } else {
          this.listaMenuPizzas = dados;
        }
        console.log("Dados carregados com sucesso!", this.listaMenuPizzas);
      } catch (error) {
        console.error("Erro ao buscar o menu", error);
      }
    },
    selecionarPizza(pizzaSelecionada) {
      const param = JSON.stringify(pizzaSelecionada);
      const pizzaJson = encodeURIComponent(param);
      this.$router.push({path: "/config-pedido", query: {pizza: pizzaJson}})
    }
  },
  mounted() {
    this.consultarMenu();
  }
};
</script>

<style scoped>
.menu-container {
  background-color: #faf9f6;
  padding: 40px 0;
  min-height: 100vh;
}

.menu-titulo {
  font-family: 'Playfair Display', 'Georgia', serif;
  font-size: 38px;
  color: #5c1d24; 
  margin-bottom: 5px;
  font-weight: bold;
}

.menu-subtitulo {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #b8860b; 
  margin-bottom: 30px;
}

#scroll-horizontal {
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  gap: 10px;
  width: 95% ;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 10px;
  scrollbar-width: thin;
  scrollbar-color: #b8860b #faf9f6;
}

#card-content {
  flex: 0 0 auto;
  display: inline-block;
  width: 290px;
  min-height: 520px;
  background-color: #ffffff;
  border: 1px solid #eae6df;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(92, 29, 36, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#card-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(92, 29, 36, 0.12);
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}


.foto-pizza {
  width: 100%;
  height: 190px;
  overflow: hidden;
  border-bottom: 3px solid #b8860b; 
}

.foto-pizza img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

#card-content:hover .foto-pizza img {
  transform: scale(1.05);
}

.card-coluna {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

#nome-content {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #333333;
  margin: 0 0 8px 0;
  white-space: normal;
}

#preco-content {
  font-family: 'Montserrat', sans-serif;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #5c1d24; 
  margin: 0 0 12px 0;
}

#descricao-content {
  font-size: 14px;
  text-align: center; 
  color: #666666;
  margin-bottom: 20px;
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}

.btn-selecionar {
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #435424;
  color: #ffffff;
  background-color: #556b2f; 
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.btn-selecionar:hover {
  background-color: #435424;
  border-color: #2b3617;
  box-shadow: 0 4px 8px rgba(85, 107, 47, 0.3);
}
</style>