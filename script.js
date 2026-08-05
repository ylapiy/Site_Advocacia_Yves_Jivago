document.addEventListener('DOMContentLoaded', () => {

    /* ---------------------------------------------------------
       1) NAVBAR — muda de estilo ao rolar a página
       --------------------------------------------------------- */
    const navbar = document.getElementById('navbar');

    const onScrollNavbar = () => {
        // Acima de 60px de rolagem, aplica o estado "scrolled"
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScrollNavbar);
    onScrollNavbar(); // verifica o estado inicial


    /* ---------------------------------------------------------
       2) BARRA DE PROGRESSO DE LEITURA (topo da tela)
       --------------------------------------------------------- */
    const progress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
        const percentual = (window.scrollY / alturaTotal) * 100;
        progress.style.width = percentual + '%';
    });


    /* ---------------------------------------------------------
       3) MENU MOBILE — abre/fecha com o botão hambúrguer
       --------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // Fecha o menu ao clicar em qualquer link interno
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });


    /* ---------------------------------------------------------
       4) SCROLL REVEAL — elementos surgem ao entrar na tela
       --------------------------------------------------------- */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // para de observar depois de revelar (anima só uma vez)
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));


    /* ---------------------------------------------------------
       5) CASCATA NOS CARDS DE ATUAÇÃO
          define um atraso progressivo (--i) para cada card
       --------------------------------------------------------- */
    document.querySelectorAll('.atuacoes-grid .area-card').forEach((card, i) => {
        card.style.setProperty('--i', i);
    });


    /* ---------------------------------------------------------
       6) CONTADOR ANIMADO DAS ESTATÍSTICAS (4+, 6, 100%)
       --------------------------------------------------------- */
    const contadores = document.querySelectorAll('.stat-num[data-count]');

    const animarContador = (el) => {
        const alvo = parseInt(el.dataset.count, 10);
        const sufixo = el.dataset.suffix || '';
        const duracao = 1500;          // milissegundos
        const inicio = performance.now();

        const passo = (agora) => {
            const progresso = Math.min((agora - inicio) / duracao, 1);
            // easing suave (ease-out)
            const eased = 1 - Math.pow(1 - progresso, 3);
            el.textContent = Math.floor(eased * alvo) + sufixo;
            if (progresso < 1) requestAnimationFrame(passo);
        };
        requestAnimationFrame(passo);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(c => statObserver.observe(c));


    /* ---------------------------------------------------------
       7) PARALLAX SUAVE NA FOTO DO HERO
          a imagem desloca levemente conforme a rolagem
       --------------------------------------------------------- */
    const heroImg = document.getElementById('heroImg');

    if (heroImg) {
        window.addEventListener('scroll', () => {
            const deslocamento = window.scrollY * 0.15;
            // só aplica enquanto o hero está visível
            if (window.scrollY < window.innerHeight) {
                heroImg.style.transform = `translateY(${deslocamento}px) scale(1.05)`;
            }
        });
    }


    /* ---------------------------------------------------------
       8) ROLAGEM SUAVE COMPENSANDO A ALTURA DA NAVBAR FIXA
       --------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const alvo = document.querySelector(link.getAttribute('href'));
            if (alvo) {
                e.preventDefault();
                const topo = alvo.getBoundingClientRect().top + window.scrollY - 64;
                window.scrollTo({ top: topo, behavior: 'smooth' });
            }
        });
    });

});
