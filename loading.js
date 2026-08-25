document.addEventListener('DOMContentLoaded', () => {
    const CHAVE_LOADING_VISTO = 'portfolio-carregamento-visto';
    const DURACAO_CARREGAMENTO = 3200; // duração da barra em ms

    const barraPreenchimento = document.getElementById('barra-preenchimento');
    const textoPorcentagem = document.getElementById('texto-porcentagem');
    const pontosCarregando = document.getElementById('pontos-carregando');

    // =========================================================================
    // 1. Pontinhos animados ao lado de "Carregando"
    // =========================================================================
    let quantidadePontos = 0;
    const intervaloPontos = setInterval(() => {
        quantidadePontos = (quantidadePontos + 1) % 4;
        pontosCarregando.textContent = '.'.repeat(quantidadePontos);
    }, 400);

    // =========================================================================
    // 2. Porcentagem numérica sincronizada com a duração da barra
    // =========================================================================
    let inicioAnimacao = null;

    function animarPorcentagem(timestamp) {
        if (!inicioAnimacao) inicioAnimacao = timestamp;
        const decorrido = timestamp - inicioAnimacao;
        const progresso = Math.min(decorrido / DURACAO_CARREGAMENTO, 1);

        textoPorcentagem.textContent = `${Math.floor(progresso * 100)}%`;

        if (progresso < 1) {
            requestAnimationFrame(animarPorcentagem);
        }
    }
    requestAnimationFrame(animarPorcentagem);

    // =========================================================================
    // 3. Anima a barra de 0% até 100% (via transition do CSS)
    // =========================================================================
    requestAnimationFrame(() => {
        barraPreenchimento.style.transition = `width ${DURACAO_CARREGAMENTO}ms cubic-bezier(0.65, 0, 0.35, 1)`;
        barraPreenchimento.style.width = '100%';
    });

    // =========================================================================
    // 4. Quando a barra chegar na extremidade direita: marca o LocalStorage
    //    como true e redireciona o usuário para o index
    // =========================================================================
    barraPreenchimento.addEventListener('transitionend', (evento) => {
        if (evento.propertyName !== 'width') return;

        clearInterval(intervaloPontos);
        textoPorcentagem.textContent = '100%';

        try {
            localStorage.setItem(CHAVE_LOADING_VISTO, 'true');
        } catch (erro) {
            // Se o navegador bloquear o LocalStorage, apenas segue para o index
            // (nesse caso, a tela de loading aparecerá novamente na próxima visita)
        }

        setTimeout(() => {
            window.location.replace('index.html');
        }, 300);
    });
});
