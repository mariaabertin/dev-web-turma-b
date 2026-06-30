Wendel Nascimento Cavalcante
22510078


# Loja de Açaí 🍇

Projeto final da matéria de Desenvolvimento Web. Peguei o sistema T-Burguer que fizemos em aula e transformei em uma loja de açaí.

## O que mudei

- Identidade visual toda roxa com tema de açaí
- Troquei os campos de hambúrguer por: Tamanho, Recheios e Adicionais
- Adicionei validação nos campos obrigatórios (nome e tamanho)
- Criei alertas coloridos para feedback do usuário
- O sistema redireciona automaticamente para os pedidos após confirmar

## Alertas

Usei classes dinâmicas do Vue para mudar a cor do alerta dependendo da situação:

```vue
<div v-if="alerta.visivel" :class="['alerta', alerta.tipo]">
  {{ alerta.mensagem }}
</div>
```

- Vermelho → erro de preenchimento
- Laranja → aviso
- Azul → informação
- Verde → sucesso

## Links

- Site: https://wendellcavalcante.github.io/loja_acai/
- API: https://loja-acai-db.onrender.com