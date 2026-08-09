/* =========================================
   ELEMENTOS
========================================= */

const botonAbrir = document.getElementById("botonAbrir");
const botonCerrar = document.getElementById("botonCerrar");
const modal = document.getElementById("modal");
const particles = document.querySelector(".particles");


/* =========================================
   ABRIR MODAL
========================================= */

botonAbrir.addEventListener("click", () => {

    modal.classList.add("activo");

});


/* =========================================
   CERRAR MODAL
========================================= */

botonCerrar.addEventListener("click", () => {

    modal.classList.remove("activo");

});


/* =========================================
   CERRAR HACIENDO CLICK FUERA
========================================= */

modal.addEventListener("click", (evento) => {

    if (evento.target === modal) {

        modal.classList.remove("activo");

    }

});


/* =========================================
   CERRAR CON ESC
========================================= */

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        modal.classList.remove("activo");

    }

});


/* =========================================
   CREAR PARTÍCULAS
========================================= */

function crearParticula() {

    const particula = document.createElement("span");

    particula.classList.add("particula");

    /*
     * Posición horizontal aleatoria
     */

    particula.style.left =
        Math.random() * 100 + "%";


    /*
     * Posición vertical inicial
     */

    particula.style.top =
        (60 + Math.random() * 40) + "%";


    /*
     * Tamaño aleatorio
     */

    const tamaño =
        Math.random() * 3 + 1;

    particula.style.width =
        tamaño + "px";

    particula.style.height =
        tamaño + "px";


    /*
     * Duración aleatoria
     */

    const duracion =
        Math.random() * 5 + 5;

    particula.style.animationDuration =
        duracion + "s";


    /*
     * Retraso aleatorio
     */

    particula.style.animationDelay =
        Math.random() * 5 + "s";


    particles.appendChild(particula);


    /*
     * Eliminar después de la animación
     */

    setTimeout(() => {

        particula.remove();

    }, (duracion + 6) * 1000);

}


/* =========================================
   GENERADOR CONTINUO
========================================= */

setInterval(() => {

    crearParticula();

}, 450);


/* =========================================
   CREAR PARTÍCULAS INICIALES
========================================= */

for (let i = 0; i < 25; i++) {

    setTimeout(() => {

        crearParticula();

    }, i * 180);

}


/* =========================================
   EFECTO DE SONIDO SUTIL
   (SIN ARCHIVOS EXTERNOS)
========================================= */

let audioContext = null;

function crearSonido() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }

        const oscilador =
            audioContext.createOscillator();

        const ganancia =
            audioContext.createGain();


        oscilador.type = "sine";

        oscilador.frequency.value = 523.25;


        ganancia.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        ganancia.gain.exponentialRampToValueAtTime(
            0.025,
            audioContext.currentTime + 0.02
        );

        ganancia.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.4
        );


        oscilador.connect(ganancia);

        ganancia.connect(
            audioContext.destination
        );


        oscilador.start();

        oscilador.stop(
            audioContext.currentTime + 0.4
        );

    } catch (error) {

        console.log(
            "Audio no disponible"
        );

    }

}


/* =========================================
   SONIDO AL ABRIR
========================================= */

botonAbrir.addEventListener(
    "click",
    crearSonido
);


/* =========================================
   PEQUEÑO EFECTO AL CERRAR
========================================= */

botonCerrar.addEventListener(
    "click",
    () => {

        botonAbrir.blur();

    }
);


/* =========================================
   MENSAJE EN CONSOLA
========================================= */

console.log(
    "🌷 Para la señorita de lentes 👓"
);

console.log(
    "🐝 La abejita encontró sus tulipanes."
);