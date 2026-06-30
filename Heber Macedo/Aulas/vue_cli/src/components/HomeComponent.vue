<template>
    <div>
     <footer>
        <p>Bem Vindo de Novo! {{ nome }} Olá mundo do <b>Vue com CLI</b></p>
     </footer>
    </div>
</template>

<script>
export default {
    name: "HomeComponet", 
    data() {
        return {
            nome: "Heber",
        };
    },
};
</script>

