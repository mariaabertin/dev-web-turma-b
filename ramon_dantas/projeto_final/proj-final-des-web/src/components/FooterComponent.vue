<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-info">
                <h3>Pichado</h3>
                <p>Os melhores hardwares e periféricos com o pior... quer dizer, melhor custo-benefício! Compre na nossa
                    loja para seu pc durar menos de um ano.</p>
            </div>

            <div>
                <a href="https://github.com/RamonDantasPolicarpo">
                    <img src="https://img.icons8.com/?size=100&id=eCjsieVBiUg6&format=png&color=42b883"
                        alt="link github" style="width: 60px;">
                </a>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2026 Pichado. Todos os direitos reservados.</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComponent",
}
</script>

<style scoped>
.footer {
    background-color: var(--color-navbar);
    color: var(--color-text-on-dark);
    padding: 2.5rem 1rem 1rem 1rem;
    margin-top: 1em;
    box-shadow: 0 -4px 6px var(--color-shadow);
}

.footer-content {
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    gap: 2em;
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin: 0 auto;
}

.footer-info {
    flex: 1;
    min-width: 250px;
}

.footer-info h3 {
    color: var(--color-primary);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: left;
}

.footer-info p {
    color: #cbd5e1;
    line-height: 1.6;
    max-width: 400px;
    text-align: left;
}

.footer-bottom {
    text-align: center;
    padding-top: 1.5rem;
    color: #94a3b8;
    font-size: 0.9rem;
}

@media (max-width: 600px) {
    .footer-content {
        flex-direction: column;
    }
}
</style>