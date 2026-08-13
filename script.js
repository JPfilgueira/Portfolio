document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualização dinâmica do ano no footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Alternador de Tema (Ying Yang)
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-light');
        });
    }

    // 3. Botão "Conheça mais / Sobre mim"
    const btnSobre = document.getElementById('btn-sobre');
    const introSvgContainer = document.getElementById('intro-svg-container');

    if (btnSobre && introSvgContainer) {
        // Ativação por padrão ou por clique no botão
        btnSobre.addEventListener('click', () => {
            introSvgContainer.classList.toggle('svg-active');
        });
    }
});
