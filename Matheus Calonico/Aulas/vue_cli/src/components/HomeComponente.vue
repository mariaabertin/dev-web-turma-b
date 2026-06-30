<template>
    <div>
        <footer>
            <p>
                Bem-vindo, {{ nome }}! Você tem {{ idade }} anos.
            </p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'HomeComponente',
    data() {
        return {
           nome: 'Matheus',
           idade: 21,       
        }
    },
    components: { 

    }
}
</script>