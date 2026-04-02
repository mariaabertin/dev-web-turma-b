<template>
    <div>
        <h2>Usuário: {{ nome }}</h2>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="InterChamp">Internacional Campeão</h1>
    </div>
</template>

<script>
export default {
    name: 'UsuarioComponent',
    data() {
        return {
           nome: 'Matheus Calonico',
           email: 'Matheusscalonico@gmail.com',
           InterChamp: true,
        }
    }
} 
</script>

<style>

</style>