<template>
    <div>
        <footer>
            <p>Bem vindo, <b> meu Devzinho {{ nome }} </b></p>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "HomeComponent",
        data() {
            return {
                nome: "Gabriel",
            };
        },
    };
</script>