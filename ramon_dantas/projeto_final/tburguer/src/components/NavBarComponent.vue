<template>
    <div>
        <nav id="navbar">
            <div class="logo-div">
                <router-link to="/" id="logo-url">
                    <img src="/img/logo-tburguer.svg" alt="logo tburguer" id="logo">
                </router-link>
            </div>
            <div class="links-div">
                <router-link to="/" id="logo-url">Home</router-link>
                <router-link to="/menu">Menu</router-link>
                <router-link to="/pedidos">Pedidos</router-link>
            </div>
            <div class="botao-div">
                <button class="botao">
                    Pedir Agora
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavBarComponent',
}
</script>

<style scoped>
#navbar {
    color: #F2E8CF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5em;
    align-items: center;
}

.logo-div {
    padding: 0.5em 2em 0.5em 1em;
}

.links-div {
    display: flex;
    justify-content: space-between;
    gap: 1em;
}

.botao-div {
    padding: 0 1em;
}

.botao {
    padding: 0.7em 1em;
    font-weight: bold;
    border: none;
    border-radius: 50vh;
    background-color: #D95D39;
    color: #F2E8CF;
    transition: 0.5s;
}

.botao:hover {
    background: #ad4a2e;
}

nav {
    padding: 10px;
}

nav a {
    transition: 0.5s;
    color: #F2E8CF;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: #D95D39;
}

nav a:hover {
    opacity: 80%;
}

#logo {
    width: 50px;
}
</style>