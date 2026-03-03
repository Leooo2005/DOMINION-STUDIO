/* --- 1. LÓGICA DEL MENÚ Y BOTÓN HAMBURGUESA --- */
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const menuEnlaces = document.getElementById('menu-enlaces');
const enlacesMenuMovil = document.querySelectorAll('.menu-links a, .btn-cotiza');

// Activar/Desactivar Menú Móvil
if (btnHamburguesa) {
    btnHamburguesa.addEventListener('click', () => {
        menuEnlaces.classList.toggle('activo');
        btnHamburguesa.textContent = menuEnlaces.classList.contains('activo') ? '✕' : '☰';
    });
}

// Cerrar Menú Móvil al hacer clic en un enlace
enlacesMenuMovil.forEach(enlace => {
    enlace.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            menuEnlaces.classList.remove('activo');
            btnHamburguesa.textContent = '☰';
        }
    });
});

/* --- 2. ROTACIÓN INTELIGENTE DEL TEXTO CIRCULAR --- */
const textoCircular = document.querySelector('.texto-circular');
let rotacionBase = 0;
let ultimoScroll = window.pageYOffset;

// Giro constante
function animarRotacion() {
    rotacionBase -= 0.2; 
    if (textoCircular) {
        textoCircular.style.transform = `rotate(${rotacionBase}deg)`;
    }
    requestAnimationFrame(animarRotacion);
}
animarRotacion(); 

// Acelerar giro al hacer scroll
window.addEventListener('scroll', () => {
    let desplazamientoActual = window.pageYOffset;
    let diferencia = desplazamientoActual - ultimoScroll;
    rotacionBase += diferencia * 0.4;
    ultimoScroll = desplazamientoActual;
});

/* --- 3. LÍNEA ACTIVA SEGÚN EL PANEL --- */ 
const secciones = document.querySelectorAll('.panel');
const linksMenuNav = document.querySelectorAll('.menu-links a');

const observadorMenu = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            let idActual = entrada.target.getAttribute('id');

            if(idActual === 'nosotros' || idActual === 'sobre-mi') { idActual = 'inicio'; }
            if(idActual === 'diseno-web-cafeteria' || idActual === 'comidas-rapidas') { idActual = 'proyectos'; }

            linksMenuNav.forEach(link => {
                link.classList.remove('activo-link');
                if (link.getAttribute('href') === "#" + idActual) {
                    link.classList.add('activo-link');
                }
            });
        }
    });
}, {threshold: 0.4});

secciones.forEach(seccion => { observadorMenu.observe(seccion); });

/* --- 4. LÓGICA DEL ACORDEÓN --- */
const botonesAcordeon = document.querySelectorAll('.acordeon-btn');

botonesAcordeon.forEach(boton => {
    boton.addEventListener('click', function() {
        const contenido = this.nextElementSibling;
        const simbolo = this.querySelector('.simbolo');

        if (contenido.style.maxHeight) {
            contenido.style.maxHeight = null;
            simbolo.textContent = "[+]";
        } else {
            document.querySelectorAll('.acordeon-contenido').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.simbolo').forEach(s => s.textContent = "[+]");

            contenido.style.maxHeight = contenido.scrollHeight + "px";
            simbolo.textContent = "[-]";
        }
    });
});

/* --- 5. ANIMACIÓN DEL TEXTO REVELADO LÍNEA POR LÍNEA --- */
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            const textos = entrada.target.querySelectorAll('.texto-animado');
            textos.forEach(texto => texto.classList.add('aparecer'));
        }
    });
}, { threshold: 0.3});

const zonaTexto = document.getElementById('zona-texto');
if (zonaTexto) {
    observador.observe(zonaTexto);
}

/* --- 6. ANIMACIÓN SUAVE PARA SECCIONES --- */
const elementosScroll = document.querySelectorAll('.animar-scroll');

const observadorScroll = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

elementosScroll.forEach(el => observadorScroll.observe(el));

/* =========================================
   LÓGICA ESPECÍFICA PARA SECCIÓN SERVICIOS
   ========================================= */
const tarjetasServicios = document.querySelectorAll('.servicios .tarjeta-servicio');

tarjetasServicios.forEach((tarjeta, index) => {
    const luminosidad = 100 - (index * 8.5); 
    tarjeta.style.backgroundColor = `hsl(70, 80%, ${luminosidad}%)`;
    tarjeta.style.color = 'var(--texto-oscuro)'; 
});

const observadorServicios = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, index) => {
        if (entrada.isIntersecting) {
            entrada.target.style.transitionDelay = `${index * 0.1}s`;
            entrada.target.classList.add('aparecer');
        }
    });
}, { threshold: 0.1 }); 

tarjetasServicios.forEach(tarjeta => observadorServicios.observe(tarjeta));