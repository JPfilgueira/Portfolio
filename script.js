document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualização dinâmica do ano no footer
    const spanAnoAtual = document.getElementById('ano-atual');
    if (spanAnoAtual) {
        spanAnoAtual.textContent = new Date().getFullYear();
    }

    // 2. Alternador de Tema (Ying Yang)
    const btnAlternarTema = document.getElementById('alternar-tema');
    if (btnAlternarTema) {
        btnAlternarTema.addEventListener('click', () => {
            document.body.classList.toggle('tema-claro');
        });
    }

    // 3. Botão "Conheça mais / Sobre mim"
    const btnSobre = document.getElementById('btn-sobre');
    const containerSvgIntro = document.getElementById('intro-container-svg');

    if (btnSobre && containerSvgIntro) {
        btnSobre.addEventListener('click', () => {
            containerSvgIntro.classList.toggle('svg-ativo');
        });
    }
});