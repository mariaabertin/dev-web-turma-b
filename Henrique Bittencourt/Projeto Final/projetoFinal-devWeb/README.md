Bella Pizza

Projeto final da disciplina de Desenvolvimento Web. É um site de pedidos de uma pizzaria, feito em Vue 3. Foi desenvolvido a partir do projeto base T-Burguer passado pelo professor, transformando a hamburgueria em uma pizzaria.

No site é possível ver o cardápio, montar um pedido escolhendo a pizza, a massa/borda, o tamanho e os adicionais (incluindo a opção de pizza meio a meio) e acompanhar a lista de pedidos.

Tecnologias usadas


Vue 3 (Options API)
Vue Router
json-server (usado como banco de dados)
HTML e CSS


Como rodar o projeto

É necessário ter o Node.js instalado.

Instalar as dependências:

npm install

Rodar o banco de dados na porta 3000:

npm run bancojson

Em outro terminal, criar um arquivo chamado .env.local na raiz do projeto com a linha abaixo, para o site usar o banco local:

VUE_APP_API_URL=http://localhost:3000

Rodar o projeto:

npm run serve

Depois é só abrir o endereço http://localhost:8080 no navegador.

Organização do projeto

A pasta src contém os componentes (barra de navegação, banner, formulário de pedido, lista de pedidos e o alerta) e as telas. O arquivo src/config.js guarda o nome da pizzaria e o endereço do banco de dados.

A pasta db contém o arquivo db.json com os dados (pizzas, bebidas, adicionais e pedidos) e o arquivo index.js, que inicia o servidor.

Funcionalidades


Cardápio com as pizzas disponíveis
Formulário de pedido com escolha de massa/borda, tamanho, meio a meio, adicionais e bebidas
Validação dos campos obrigatórios antes de confirmar o pedido
Mensagens de alerta com cores diferentes para erro, aviso, informação e sucesso
Lista de pedidos atualizada na hora ao adicionar ou remover um pedido