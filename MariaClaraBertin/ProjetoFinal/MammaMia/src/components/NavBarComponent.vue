<template>
    <div>
    <nav>
        <router-link to="/" id="logo-url">
    <img :src="'/img/logo_mammamia.png'" id="logo" alt="Mamma Mia Logo" />
</router-link>
        <router-link to="/menu">Menu</router-link> |
        <router-link to="/pedidos">Pedidos</router-link>
    </nav>
    </div>
</template>

<script>
export default {
    name: 'NavBarComponent', 
};
</script>

<style scoped>
#logo {
    width: 60px;
    height: 60px;
    clip-path: circle(46% at 50% 50%);
    object-fit: cover;
}

nav #logo-url {
    margin-right: auto;
    margin-left: 0;
}

nav a {
    color: darkgoldenrod;
    text-decoration: none;
    margin: 12px;
    transition: 0.3s; 
}

nav a:hover {
    color: white;
    font-size: 20px;
}

#logo-url:hover{
    transform: rotate(360deg);
    transition: 0.5s;
}

nav {
    background-color: #333;
    border-bottom: 3px solid darkgoldenrod;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>