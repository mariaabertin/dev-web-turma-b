<template>
    <div>
        <footer>
            <p>Bem vinda, {{ nome }}! <br> Olá, mundo do <b>Vue com CLI</b></p>
        </footer>

    </div>
</template>

<script>
    export default {
        name: "HomeComponent",
        data() {
            return{
                nome: "Maria",
            }
        }
    }
</script>