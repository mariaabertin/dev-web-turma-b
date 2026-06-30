# Marmitas Fitness 🍱

## 1. Visão Geral
Este projeto consiste em um sistema de gerenciamento e pedidos de marmitas fitness, desenvolvido utilizando o framework **Vue 3** para o ecossistema frontend e integrado a uma API mockada (**JSON Server**). 

A estrutura visual e os fluxos de dados foram adaptados e refinados com base no modelo estrutural trabalhado em sala de aula (*T-Burguer*), aplicando conceitos de reatividade, componentização e gerenciamento de estado.

---

## 2. Solução Técnica dos Alertas (Feedback Visual)
A comunicação visual e a integridade dos dados foram implementadas através de um componente dinâmico de alertas (`AlertaComponent.vue`). Ele foi estruturado para receber mensagens e tipos semânticos, alterando sua paleta de cores e ícones conforme a ação realizada pelo usuário:

* 🔴 **Vermelho (`erro`):** Utilizado para falhas críticas de comunicação com o servidor ou respostas de erro da API.
* 🟡 **Laranja (`aviso`):** Acionado no bloqueio semântico do formulário, impedindo o envio caso campos essenciais (como *Nome do Cliente* ou *Tamanho*) estejam vazios.
* 🔵 **Azul (`info`):** Mensagens contextuais e informativas sobre o estado do sistema.
* 🟢 **Verde (`sucesso`):** Exibido imediatamente após a confirmação positiva de operações como cadastrar um pedido, editar dados ou excluir registros da listagem.

---

## 3. Diretrizes de Experiência do Usuário (UX)
O fluxo da aplicação foi projetado para ser natural e contínuo:
* **Redirecionamento Inteligente:** Logo após a confirmação com sucesso do pedido, a aplicação realiza de forma automática a navegação para a tela de monitoramento de pedidos através do `vue-router`.
* **Atualização de Estado em Tempo Real:** A tela de destino faz uma nova requisição à API assim que é carregada, garantindo a exibição imediata do novo registro.
* **Feedback de Remoção:** Ao clicar na lixeira para excluir um pedido, a interface re-renderiza o estado local na mesma hora, refletindo a ausência do registro instantaneamente para o usuário.

---

## 4. Links do Projeto

* **Link da API :** https://db-marmitasfitness.onrender.com
* **Link de Produção pages:** https://ThayLSS.github.io/marmitasFitness
* **Link do Repositório projeto:** https://github.com/ThayLSS/marmitasFitness.git
* **Link do Repositório api:** https://github.com/ThayLSS/db.marmitasfitness.git