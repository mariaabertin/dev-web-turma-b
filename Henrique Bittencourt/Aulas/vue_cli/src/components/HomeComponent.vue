<template>
    <div>
        <footer>
           <p>Bem vindo! {{ nome }} </p>
        </footer>
    </div>
</template>

<script>
    export default{
        name: "HomeComponent",
        data() {
            return{
                nome:"Henrique",
            };
        },
    };
</script>

