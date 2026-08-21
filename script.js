document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. Atualização Dinâmica do Ano no Rodapé
    // =========================================================================
    const spanAnoAtual = document.getElementById('ano-atual');
    if (spanAnoAtual) {
        spanAnoAtual.textContent = new Date().getFullYear();
    }

    // =========================================================================
    // 2. Alternador de Tema (Cinematic Switcher)
    // =========================================================================
    const btnAlternarTema = document.getElementById('alternar-tema');
    
    // Recuperar preferência salva no LocalStorage
    const temaSalvo = localStorage.getItem('portfolio-tema');
    if (temaSalvo === 'claro') {
        document.body.classList.add('tema-claro');
    }

    if (btnAlternarTema) {
        btnAlternarTema.addEventListener('click', () => {
            document.body.classList.toggle('tema-claro');
            const ehTemaClaro = document.body.classList.contains('tema-claro');
            localStorage.setItem('portfolio-tema', ehTemaClaro ? 'claro' : 'escuro');
        });
    }

    // =========================================================================
    // 3. Botão "Baixar CV" (Salvar página como PDF)
    // =========================================================================
    const btnBaixarCV = document.getElementById('btn-baixar-cv');
    if (btnBaixarCV) {
        btnBaixarCV.addEventListener('click', () => {
            window.print();
        });
    }

    // =========================================================================
    // 4. Botão "Conheça mais" & Ativação do Card de Sobre Mim + Digitação
    // =========================================================================
    const btnSobre = document.getElementById('btn-sobre');
    const containerPerfil = document.getElementById('intro-container-perfil');
    const codigoElemento = document.getElementById('codigo-animado');
    let digitacaoIniciada = false;

    function iniciarDigitacaoCodigo() {
        if (!codigoElemento || digitacaoIniciada) return;
        digitacaoIniciada = true;

        const textoCodigo = `const dev = {
  nome: "João Pedro",
  formacao: "Técnico em ADS (SENAI)",
  foco: "Full Stack & Design",
  paixao: "Criar interfaces modernas"
};`;
        let indiceCaractere = 0;
        const velocidadeDigitacao = 30; // ms por caractere
        codigoElemento.textContent = '';

        function digitar() {
            if (indiceCaractere < textoCodigo.length) {
                codigoElemento.textContent += textoCodigo.charAt(indiceCaractere);
                indiceCaractere++;
                setTimeout(digitar, velocidadeDigitacao);
            }
        }
        digitar();
    }

    if (btnSobre && containerPerfil) {
        btnSobre.addEventListener('click', () => {
            containerPerfil.classList.toggle('ativo');

            if (containerPerfil.classList.contains('ativo')) {
                iniciarDigitacaoCodigo();
            }
        });
    }

    // =========================================================================
    // 5. Carrossel de Projetos (Autoplay 5s + Navegação por Setas)
    // =========================================================================
    const trilho = document.getElementById('trilho-carrossel');
    const viewport = document.getElementById('viewport-carrossel');
    const btnAnt = document.getElementById('btn-projeto-ant');
    const btnProx = document.getElementById('btn-projeto-prox');
    const cartoes = document.querySelectorAll('.cartao-projeto');

    if (trilho && viewport && cartoes.length > 0) {
        let indiceAtual = 0;
        let intervaloAutoPlay = null;
        const tempoTransicaoAutoPlay = 5000; // 5 segundos

        // Identifica quantos cards cabem na tela
        function obterCartoesVisiveis() {
            const larguraJanela = window.innerWidth;
            if (larguraJanela <= 640) return 1;
            if (larguraJanela <= 1024) return 2;
            return 3;
        }

        function obterTotalPassos() {
            const visiveis = obterCartoesVisiveis();
            return Math.max(1, cartoes.length - visiveis + 1);
        }

        function atualizarPosicaoCarrossel() {
            const totalPassos = obterTotalPassos();
            if (indiceAtual >= totalPassos) {
                indiceAtual = 0;
            } else if (indiceAtual < 0) {
                indiceAtual = totalPassos - 1;
            }

            // Largura do card + gap (24px)
            const larguraCard = cartoes[0].offsetWidth;
            const espacamentoGap = 24;
            const deslocamento = indiceAtual * (larguraCard + espacamentoGap);

            trilho.style.transform = `translateX(-${deslocamento}px)`;
        }

        function proximoCard() {
            const totalPassos = obterTotalPassos();
            indiceAtual = (indiceAtual + 1) % totalPassos;
            atualizarPosicaoCarrossel();
        }

        function cardAnterior() {
            const totalPassos = obterTotalPassos();
            indiceAtual = (indiceAtual - 1 + totalPassos) % totalPassos;
            atualizarPosicaoCarrossel();
        }

        if (btnProx) {
            btnProx.addEventListener('click', () => {
                proximoCard();
                reiniciarAutoPlay();
            });
        }

        if (btnAnt) {
            btnAnt.addEventListener('click', () => {
                cardAnterior();
                reiniciarAutoPlay();
            });
        }

        // Iniciar Autoplay a cada 5 segundos
        function iniciarAutoPlay() {
            if (!intervaloAutoPlay) {
                intervaloAutoPlay = setInterval(proximoCard, tempoTransicaoAutoPlay);
            }
        }

        function pararAutoPlay() {
            if (intervaloAutoPlay) {
                clearInterval(intervaloAutoPlay);
                intervaloAutoPlay = null;
            }
        }

        function reiniciarAutoPlay() {
            pararAutoPlay();
            iniciarAutoPlay();
        }

        iniciarAutoPlay();

        // Pausa quando o mouse está sobre o carrossel
        viewport.addEventListener('mouseenter', pararAutoPlay);
        viewport.addEventListener('mouseleave', iniciarAutoPlay);

        // Recalcular posições em redimensionamento de janela
        window.addEventListener('resize', () => {
            atualizarPosicaoCarrossel();
        });
    }
});