<template>
  <div>
    <footer>
      <p>Bem Vindo! De novo {{ nome }} Olá mundo do <b>Vue com CLI</b></p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeComponent",
  data() {
    return {
      nome: "Ramon",
    };
  },
};
</script>