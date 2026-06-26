<template>
    <Transition name="fade">
        <div v-if="visivel" :class="['alert-container', tipo]">
            <i :class="['fa-solid', `fa-${icone}`]"></i>
            <p>{{ mensagem }}</p>
        </div>
    </Transition>
</template>

<script>
export default {
    name: "AlertComponent",
    props: {
        mensagem: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            default: "info"
        },
        visivel: {
            type: Boolean,
            default: false
        },
        icone: {
            type: String,
            default: "circle-info"
            // circle-check
            // circle-xmark
            // warning
        }
    }
}
</script>

<style>
.alert-container {
    display: flex;
    gap: 1em;
    align-items: center;
    padding: 1em;
    margin: 1.5em;
    border-radius: 8px;
    font-weight: bold;
    text-align: start;
    transition: all 0.3s ease;
}

.alert-container i {
    font-size: 1.5em;
}

.success {
    background-color: #d1fae5;
    color: var(--color-success);
    border: 1px solid var(--color-success);
}

.error {
    background-color: #fee2e2;
    color: var(--color-error);
    border: 1px solid var(--color-error);
}

.warning {
    background-color: #fef3c7;
    color: var(--color-warning);
    border: 1px solid var(--color-warning);
}

.info {
    background-color: #dbeafe;
    color: var(--color-info);
    border: 1px solid var(--color-info);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>