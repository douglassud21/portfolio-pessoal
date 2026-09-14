
/* =========================================================
   DSN — DIGITAL STREET DEVELOPER
   PORTFÓLIO — INTERAÇÕES
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================================
   PRELOADER
   ========================================================= */

const preloader =
    document.querySelector(".preloader");

window.addEventListener("load", () => {

    document.body.classList.add("site-loaded");

    if (!preloader) {
        return;
    }

    setTimeout(() => {

        preloader.classList.add("loaded");

    }, prefersReducedMotion ? 300 : 1800);

});


/* =========================================================
   NAVEGAÇÃO SUAVE
   ========================================================= */

const linksInternos =
    document.querySelectorAll('a[href^="#"]');

linksInternos.forEach((link) => {

    link.addEventListener("click", (evento) => {

        const destino =
            link.getAttribute("href");

        /*
         * Links temporários com href="#"
         * não devem gerar erro.
         */

        if (
            !destino ||
            destino === "#"
        ) {
            return;
        }

        const elemento =
            document.querySelector(destino);

        if (!elemento) {
            return;
        }

        evento.preventDefault();

        elemento.scrollIntoView({

            behavior: prefersReducedMotion
                ? "auto"
                : "smooth"

        });

    });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const elementosAnimados =
    document.querySelectorAll(
        "main section, " +
        ".project-poster, " +
        ".servico-item, " +
        ".blog-post, " +
        ".video-apresentacao"
    );

if (!prefersReducedMotion) {

    const observer =
        new IntersectionObserver(

            (entradas, observerAtual) => {

                entradas.forEach((entrada) => {

                    if (!entrada.isIntersecting) {
                        return;
                    }

                    entrada.target.classList.add(
                        "visible"
                    );

                    observerAtual.unobserve(
                        entrada.target
                    );

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }

        );

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add(
            "scroll-hidden"
        );

        observer.observe(elemento);

    });

}


/* =========================================================
   BARRA DE PROGRESSO
   ========================================================= */

const barraProgresso =
    document.createElement("div");

barraProgresso.className =
    "scroll-progress";

document.body.appendChild(
    barraProgresso
);

let tickingProgresso = false;

function atualizarProgresso() {

    const alturaPagina =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (alturaPagina <= 0) {

        barraProgresso.style.width = "0%";

        return;
    }

    const progresso =
        (window.scrollY / alturaPagina) * 100;

    barraProgresso.style.width =
        `${Math.min(progresso, 100)}%`;

}

window.addEventListener(
    "scroll",

    () => {

        if (tickingProgresso) {
            return;
        }

        window.requestAnimationFrame(() => {

            atualizarProgresso();

            tickingProgresso = false;

        });

        tickingProgresso = true;

    },

    {
        passive: true
    }
);

atualizarProgresso();


/* =========================================================
   MENU ATIVO
   ========================================================= */

const secoes =
    document.querySelectorAll(
        "header[id], main section[id]"
    );

const linksMenu =
    document.querySelectorAll(
        "nav a[href^='#']"
    );

function atualizarMenu() {

    let secaoAtual = "";

    secoes.forEach((secao) => {

        const limite =
            secao.offsetTop - 220;

        if (window.scrollY >= limite) {

            secaoAtual =
                secao.id;

        }

    });

    linksMenu.forEach((link) => {

        const destino =
            link.getAttribute("href");

        link.classList.remove(
            "active"
        );

        if (
            destino ===
            `#${secaoAtual}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    atualizarMenu,
    {
        passive: true
    }
);

atualizarMenu();


/* =========================================================
   PARALLAX DO HERO
   ========================================================= */

const imagemHero =
    document.querySelector(
        ".imagem-apresentacao img"
    );

let parallaxFrame = null;

function atualizarParallax() {

    if (
        !imagemHero ||
        prefersReducedMotion ||
        window.innerWidth <= 700
    ) {
        return;
    }

    const movimento =
        window.scrollY * 0.035;

    imagemHero.style.setProperty(
        "--hero-parallax",
        `${movimento}px`
    );

    parallaxFrame = null;

}

window.addEventListener(

    "scroll",

    () => {

        if (parallaxFrame !== null) {
            return;
        }

        parallaxFrame =
            window.requestAnimationFrame(
                atualizarParallax
            );

    },

    {
        passive: true
    }

);


/* =========================================================
   CURSOR PERSONALIZADO
   ========================================================= */

let cursor = null;
let cursorRing = null;
let cursorLabel = null;

const cursorDisponivel =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;

if (
    cursorDisponivel &&
    !prefersReducedMotion
) {

    cursor =
        document.createElement("div");

    cursor.className =
        "cursor";


    cursorRing =
        document.createElement("div");

    cursorRing.className =
        "cursor-ring";


    cursorLabel =
        document.createElement("div");

    cursorLabel.className =
        "cursor-label";

    cursorLabel.textContent =
        "OPEN";


    document.body.appendChild(
        cursor
    );

    document.body.appendChild(
        cursorRing
    );

    document.body.appendChild(
        cursorLabel
    );


    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    document.addEventListener(

        "mousemove",

        (evento) => {

            mouseX =
                evento.clientX;

            mouseY =
                evento.clientY;


            cursor.style.left =
                `${mouseX}px`;

            cursor.style.top =
                `${mouseY}px`;


            cursorLabel.style.left =
                `${mouseX}px`;

            cursorLabel.style.top =
                `${mouseY}px`;

        },

        {
            passive: true
        }

    );


    function atualizarCursor() {

        ringX +=
            (mouseX - ringX) * 0.16;

        ringY +=
            (mouseY - ringY) * 0.16;


        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            atualizarCursor
        );

    }

    atualizarCursor();


    /* -----------------------------------------
       ELEMENTOS INTERATIVOS
       ----------------------------------------- */

    const elementosInterativos =
        document.querySelectorAll(
            "a, button, " +
            ".project-poster, " +
            ".servico-item"
        );


    elementosInterativos.forEach(
        (elemento) => {

            elemento.addEventListener(

                "mouseenter",

                () => {

                    cursor.classList.add(
                        "cursor-hover"
                    );

                    cursorRing.classList.add(
                        "cursor-hover"
                    );


                    if (
                        elemento.matches(
                            ".project-poster"
                        )
                    ) {

                        cursorLabel.textContent =
                            "VIEW";

                        cursorLabel.classList.add(
                            "visible"
                        );

                    }

                }

            );


            elemento.addEventListener(

                "mouseleave",

                () => {

                    cursor.classList.remove(
                        "cursor-hover"
                    );

                    cursorRing.classList.remove(
                        "cursor-hover"
                    );

                    cursorLabel.classList.remove(
                        "visible"
                    );

                    cursorLabel.textContent =
                        "OPEN";

                }

            );

        }
    );


    /* -----------------------------------------
       CURSOR FORA DA JANELA
       ----------------------------------------- */

    document.addEventListener(

        "mouseleave",

        () => {

            cursor.style.opacity =
                "0";

            cursorRing.style.opacity =
                "0";

            cursorLabel.style.opacity =
                "0";

        }

    );


    document.addEventListener(

        "mouseenter",

        () => {

            cursor.style.opacity =
                "1";

            cursorRing.style.opacity =
                "1";

            cursorLabel.style.opacity =
                "1";

        }

    );

}


/* =========================================================
   EFEITO MAGNÉTICO
   ========================================================= */

if (!prefersReducedMotion) {

    const elementosMagneticos =
        document.querySelectorAll(
            ".apresentacao button, " +
            ".apresentacao > div a"
        );


    elementosMagneticos.forEach(
        (elemento) => {

            elemento.addEventListener(

                "mousemove",

                (evento) => {

                    if (
                        window.innerWidth <= 700
                    ) {
                        return;
                    }


                    const rect =
                        elemento.getBoundingClientRect();


                    const x =
                        evento.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        evento.clientY -
                        rect.top -
                        rect.height / 2;


                    elemento.style.transform =
                        `translate(
                            ${x * 0.10}px,
                            ${y * 0.10}px
                        )`;

                }

            );


            elemento.addEventListener(

                "mouseleave",

                () => {

                    elemento.style.transform =
                        "";

                }

            );

        }
    );

}


/* =========================================================
   TILT DOS CARDS
   ========================================================= */

if (!prefersReducedMotion) {

    const cardsProjeto =
        document.querySelectorAll(
            ".project-poster"
        );


    cardsProjeto.forEach(
        (card) => {

            card.addEventListener(

                "mousemove",

                (evento) => {

                    if (
                        window.innerWidth <= 700
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        evento.clientX -
                        rect.left;


                    const y =
                        evento.clientY -
                        rect.top;


                    const centroX =
                        rect.width / 2;


                    const centroY =
                        rect.height / 2;


                    const rotacaoX =
                        (
                            (y - centroY) /
                            centroY
                        ) * -2;


                    const rotacaoY =
                        (
                            (x - centroX) /
                            centroX
                        ) * 2;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotacaoX}deg)
                         rotateY(${rotacaoY}deg)
                         translateY(-8px)`;

                }

            );


            card.addEventListener(

                "mouseleave",

                () => {

                    card.style.transform =
                        "";

                }

            );

        }
    );

}


/* =========================================================
   STREET ART — MARCAS DECORATIVAS
   ========================================================= */

function criarMarca(
    elementoPai,
    classe,
    texto
) {

    if (!elementoPai) {
        return;
    }


    const marca =
        document.createElement("span");


    marca.className =
        `street-mark ${classe}`;


    marca.textContent =
        texto;


    elementoPai.appendChild(
        marca
    );

}


/* =========================================================
   MARCAS
   ========================================================= */

/* HERO */

criarMarca(
    document.querySelector("header"),
    "mark-01",
    "MAKE / BREAK / CREATE"
);


/* SOBRE */

criarMarca(
    document.querySelector(".sobre"),
    "mark-02",
    "NO RULES"
);


/* CONTATO */

criarMarca(
    document.querySelector(".contato"),
    "mark-03",
    "LET'S BUILD"
);


/* =========================================================
   MICROINTERAÇÃO DOS BOTÕES
   ========================================================= */

const botoes =
    document.querySelectorAll(
        "button"
    );


botoes.forEach(
    (botao) => {

        botao.addEventListener(

            "mousedown",

            () => {

                if (
                    prefersReducedMotion
                ) {
                    return;
                }

                botao.classList.add(
                    "button-pressed"
                );

            }

        );


        botao.addEventListener(

            "mouseup",

            () => {

                botao.classList.remove(
                    "button-pressed"
                );

            }

        );


        botao.addEventListener(

            "mouseleave",

            () => {

                botao.classList.remove(
                    "button-pressed"
                );

            }

        );

    }
);


/* =========================================================
   TECLADO — ACESSIBILIDADE
   ========================================================= */

document.addEventListener(

    "keydown",

    (evento) => {

        if (
            evento.key === "Escape"
        ) {

            document.activeElement?.blur();

        }

    }

);


/* =========================================================
   RESIZE
   ========================================================= */

let resizeTimeout;

window.addEventListener(

    "resize",

    () => {

        clearTimeout(
            resizeTimeout
        );


        resizeTimeout =
            setTimeout(() => {

                atualizarMenu();

                atualizarProgresso();

            }, 150);

    }

);


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(

    "%c DSN ",

    `
        background:#e85d04;
        color:#111;
        font-size:22px;
        font-weight:bold;
        padding:5px 12px;
    `

);


console.log(

    "%c DIGITAL STREET DEVELOPER ",

    `
        color:#e85d04;
        font-size:12px;
        font-weight:bold;
    `

);


console.log(

    "%c Código também pode ser uma forma de arte. ",

    `
        color:#858581;
        font-size:11px;
    `

);

// =========================================================
// TEMA — DARK / LIGHT
// =========================================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const themeIcon = themeToggle.querySelector(".theme-icon");
    const themeText = themeToggle.querySelector(".theme-text");

    // Recupera o tema salvo
    const savedTheme = localStorage.getItem("dsn-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    function updateThemeButton() {

        const isLight = document.body.classList.contains("light-mode");

        if (isLight) {

            themeIcon.textContent = "☾";
            themeText.textContent = "DARK";

            themeToggle.setAttribute(
                "aria-label",
                "Ativar modo escuro"
            );

        } else {

            themeIcon.textContent = "☼";
            themeText.textContent = "LIGHT";

            themeToggle.setAttribute(
                "aria-label",
                "Ativar modo claro"
            );

        }

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        // Salva a escolha do usuário
        localStorage.setItem(
            "dsn-theme",
            isLight ? "light" : "dark"
        );

        updateThemeButton();

    });


    updateThemeButton();

}