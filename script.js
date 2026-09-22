document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       DATOS GLAM
    ========================================= */

    if (typeof glam !== "undefined") {

        const nombreNovia = document.getElementById("nombreNovia");
        const nombreNovio = document.getElementById("nombreNovio");

        if (nombreNovia) {
            nombreNovia.textContent = glam.nombre;
        }

        if (nombreNovio) {
            nombreNovio.textContent = glam.servicio;
        }

        const numeroDia = document.getElementById("numeroDia");

        if (numeroDia) {
            numeroDia.textContent = glam.slogan;
        }

        const mensajePortada = document.querySelector(".portada .mensaje");

        if (mensajePortada && glam.mensajePortada) {

            const partes = glam.mensajePortada.split(" ");

            if (partes.length > 4) {

                const mitad = Math.ceil(partes.length / 2);

                mensajePortada.innerHTML =
                    partes.slice(0, mitad).join(" ") +
                    "<br>" +
                    partes.slice(mitad).join(" ");

            } else {

                mensajePortada.textContent = glam.mensajePortada;

            }
        }

        const telefonos = document.querySelectorAll(".contacto-datos span");

        if (telefonos.length > 0 && glam.telefono) {
            telefonos[0].textContent = glam.telefono;
        }
    }


    /* =========================================
       ABRIR GLAM
    ========================================= */

    const botonAbrir = document.getElementById("abrirInvitacion");
    const contenido = document.getElementById("contenido");

    if (botonAbrir && contenido) {

        botonAbrir.addEventListener("click", function () {

            contenido.classList.remove("oculto");

            contenido.scrollIntoView({
                behavior: "smooth"
            });

        });
    }


    /* =========================================
       GALERÍA
    ========================================= */

    const fotos = [
        "imagenes/momento1.jpg",
        "imagenes/momento2.jpg",
        "imagenes/momento3.jpg",
        "imagenes/momento4.jpg",
        "imagenes/momento5.jpg",
        "imagenes/momento6.jpg"
    ];

    const visor = document.getElementById("visorFoto");
    const fotoGrande = document.getElementById("fotoGrande");
    const cerrarFoto = document.getElementById("cerrarFoto");
    const anterior = document.getElementById("fotoAnterior");
    const siguiente = document.getElementById("fotoSiguiente");

    let indiceActual = 0;


    function mostrarFoto(indice) {

        if (!fotoGrande || !visor) {
            return;
        }

        indiceActual =
            (indice + fotos.length) % fotos.length;

        fotoGrande.src = fotos[indiceActual];

        visor.classList.add("activo");

        document.body.style.overflow = "hidden";
    }


    function cerrarVisor() {

        if (!visor) {
            return;
        }

        visor.classList.remove("activo");

        document.body.style.overflow = "";
    }


    document.querySelectorAll(".foto-glam").forEach(function (foto, indice) {

        foto.addEventListener("click", function () {
            mostrarFoto(indice);
        });

    });


    if (cerrarFoto) {

        cerrarFoto.addEventListener("click", cerrarVisor);

    }


    if (anterior) {

        anterior.addEventListener("click", function () {

            mostrarFoto(indiceActual - 1);

        });

    }


    if (siguiente) {

        siguiente.addEventListener("click", function () {

            mostrarFoto(indiceActual + 1);

        });

    }


    if (visor) {

        visor.addEventListener("click", function (e) {

            if (e.target === visor) {
                cerrarVisor();
            }

        });

    }


    /* =========================================
       TECLADO
    ========================================= */

    document.addEventListener("keydown", function (e) {

        if (
            !visor ||
            !visor.classList.contains("activo")
        ) {
            return;
        }

        if (e.key === "Escape") {
            cerrarVisor();
        }

        if (e.key === "ArrowLeft") {
            mostrarFoto(indiceActual - 1);
        }

        if (e.key === "ArrowRight") {
            mostrarFoto(indiceActual + 1);
        }

    });


    /* =========================================
       MÚSICA
    ========================================= */

    const musica = document.getElementById("musicaBoda");
    const botonMusica = document.getElementById("botonMusica");

    if (musica && botonMusica) {

        botonMusica.addEventListener("click", function () {

            if (musica.paused) {

                musica.play();

                botonMusica.textContent = "🔊";

            } else {

                musica.pause();

                botonMusica.textContent = "🔇";

            }

        });

    }


    /* =========================================
       MODAL DE CONTACTO PERSONALIZADO
    ========================================= */

    const abrirCotizacion =
        document.getElementById("abrirCotizacion");

    const modalCotizacion =
        document.getElementById("modalCotizacion");

    const cerrarCotizacion =
        document.getElementById("cerrarCotizacion");

    const formulario =
        document.getElementById("formularioCotizacion");


    function abrirModal() {

        if (modalCotizacion) {

            modalCotizacion.classList.add("activo");

            document.body.style.overflow = "hidden";

        }
    }


    function cerrarModal() {

        if (modalCotizacion) {

            modalCotizacion.classList.remove("activo");

            document.body.style.overflow = "";

        }
    }


    if (abrirCotizacion) {

        abrirCotizacion.addEventListener(
            "click",
            abrirModal
        );

    }


    if (cerrarCotizacion) {

        cerrarCotizacion.addEventListener(
            "click",
            cerrarModal
        );

    }


    if (modalCotizacion) {

        modalCotizacion.addEventListener(
            "click",
            function (e) {

                if (e.target === modalCotizacion) {
                    cerrarModal();
                }

            }
        );

    }


    /* =========================================
       EVENTOS GLAM
    ========================================= */

    const eventosGrid =
        document.getElementById("eventosGrid");


    function obtenerEtiquetaEvento(titulo) {

        const etiquetas = {

            "BODAS": "CELEBRA EL AMOR",

            "CUMPLEAÑOS": "CELEBRA A LO GRANDE",

            "XV AÑOS": "UNA NOCHE PARA BRILLAR",

            "GRADUACIONES": "CELEBRA TU LOGRO",

            "EMPRESARIALES": "TU MARCA TAMBIÉN CELEBRA",

            "EVENTOS PRIVADOS": "TU MOMENTO, TU ESTILO"

        };

        return etiquetas[titulo] || "MOMENTOS GLAM";
    }


    if (
        eventosGrid &&
        typeof glam !== "undefined" &&
        Array.isArray(glam.eventos)
    ) {

        eventosGrid.innerHTML = "";


        glam.eventos.forEach(function (evento, indice) {

            const tarjeta =
                document.createElement("article");


            tarjeta.className =
                "evento-glam-card";


            const numero =
                String(indice + 1).padStart(2, "0");


            tarjeta.innerHTML =

                '<div class="evento-glam-imagen">' +

                    '<img src="' +
                    evento.imagen +
                    '" alt="' +
                    evento.titulo +
                    '">' +

                    '<div class="evento-glam-numero">' +
                    numero +
                    '</div>' +

                '</div>' +

                '<div class="evento-glam-info">' +

                    '<p class="evento-glam-etiqueta">' +
                    obtenerEtiquetaEvento(evento.titulo) +
                    '</p>' +

                    '<h3>' +
                    evento.titulo +
                    '</h3>' +

                    '<p>' +
                    evento.descripcion +
                    '</p>' +

                '</div>';


            eventosGrid.appendChild(tarjeta);

        });

    }


    /* =========================================
       GENERAR PAQUETES
    ========================================= */

    const paquetesGrid =
        document.getElementById("paquetesGrid");


    if (
        paquetesGrid &&
        typeof glam !== "undefined" &&
        Array.isArray(glam.paquetes)
    ) {

        paquetesGrid.innerHTML = "";


        glam.paquetes.forEach(function (paquete, indice) {

            const tarjeta =
                document.createElement("article");


            tarjeta.className =
                "paquete-card";


            if (indice === 1) {

                tarjeta.classList.add(
                    "paquete-destacado"
                );

            }


            const badge =
                indice === 1
                    ? '<div class="paquete-badge">MÁS ELEGIDO</div>'
                    : "";


            const numero =
                String(indice + 1).padStart(2, "0");


            const incluye =
                paquete.incluye
                    .map(function (item) {

                        return (
                            "<li>✓ " +
                            item +
                            "</li>"
                        );

                    })
                    .join("");


            tarjeta.innerHTML =

                badge +

                '<div class="paquete-numero">' +
                numero +
                '</div>' +

                '<p class="paquete-etiqueta">' +
                'EXPERIENCIA' +
                '</p>' +

                '<h3>' +
                paquete.nombre +
                '</h3>' +

                '<div class="paquete-duracion">' +
                paquete.duracion +
                '</div>' +

                '<div class="paquete-precio">' +
                paquete.precio +
                '</div>' +

                '<p class="paquete-descripcion">' +
                paquete.descripcion +
                '</p>' +

                '<ul>' +
                incluye +
                '</ul>' +

                '<button ' +
                'class="boton-paquete" ' +
                'data-paquete="' +
                paquete.nombre +
                '" ' +
                'type="button">' +
                'COTIZAR' +
                '</button>';


            paquetesGrid.appendChild(tarjeta);

        });

    }


    /* =========================================
       COTIZACIÓN DE PAQUETES → WHATSAPP
    ========================================= */

    document
        .querySelectorAll(".boton-paquete")
        .forEach(function (boton) {

            boton.addEventListener("click", function () {

                const paquete =
                    boton.dataset.paquete || "";

                abrirFormularioWhatsApp(paquete);

            });

        });


    /* =========================================
       FORMULARIO PARA WHATSAPP
    ========================================= */

    function abrirFormularioWhatsApp(paquete) {

        const nombre =
            prompt(
                "✨ COTIZACIÓN GLAM\n\n¿Cuál es tu nombre?"
            );


        if (!nombre) {
            return;
        }


        const fecha =
            prompt(
                "📅 ¿Cuál es la fecha de tu evento?"
            );


        if (!fecha) {
            return;
        }


        const evento =
            prompt(
                "🎉 ¿Qué tipo de evento realizarás?\n\nEjemplo: Boda, cumpleaños, XV años, graduación..."
            );


        if (!evento) {
            return;
        }


        const lugar =
            prompt(
                "📍 ¿Dónde se realizará tu evento?\n\nEjemplo: La Paz, Salón Los Álamos"
            );


        if (!lugar) {
            return;
        }


        const mensaje =
            "Hola GLAM ✨\n\n" +

            "Quiero cotizar el servicio de Espejo Mágico.\n\n" +

            "👤 Nombre: " +
            nombre +
            "\n\n" +

            "📅 Fecha del evento: " +
            fecha +
            "\n\n" +

            "🎉 Tipo de evento: " +
            evento +
            "\n\n" +

            "📍 Lugar: " +
            lugar +
            "\n\n" +

            "✨ Paquete: " +
            paquete +
            "\n\n" +

            "Quisiera conocer la disponibilidad y realizar la cotización.";


        const numeroWhatsApp =
            "59172514906";


        const url =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(mensaje);


        window.open(
            url,
            "_blank"
        );

    }


    /* =========================================
       ENVIAR SOLICITUD PERSONALIZADA
       GOOGLE SHEETS
    ========================================= */

    if (formulario) {

        formulario.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const nombre =
                    document.getElementById(
                        "nombreCliente"
                    ).value.trim();


                const telefono =
                    document.getElementById(
                        "telefonoCliente"
                    ).value.trim();


                const tipoEvento =
                    document.getElementById(
                        "tipoEvento"
                    ).value;


                const fechaEvento =
                    document.getElementById(
                        "fechaEvento"
                    ).value;


                const ciudadEvento =
                    document.getElementById(
                        "ciudadEvento"
                    ).value.trim();


                const propuesta =
                    document.getElementById(
                        "propuestaEvento"
                    ).value.trim();


                /* =========================================
                   URL GOOGLE APPS SCRIPT
                ========================================= */

                const URL_GOOGLE_APPS_SCRIPT =
                    "https://script.google.com/macros/s/AKfycbxxGWxVhq-ogSxtXAQHJYPza7lf24XMMZDGcE8Tg7SmTLfepyEgZPn2nGpUd43Akj1Fpw/exec";


                /* =========================================
                   PREPARAR DATOS
                ========================================= */

                const datos =
                    new URLSearchParams();


                datos.append(
                    "tipoSolicitud",
                    "glam"
                );

                datos.append(
                    "nombre",
                    nombre
                );

                datos.append(
                    "telefono",
                    telefono
                );

                datos.append(
                    "tipoEvento",
                    tipoEvento
                );

                datos.append(
                    "fechaEvento",
                    fechaEvento
                );

                datos.append(
                    "ciudadEvento",
                    ciudadEvento
                );

                datos.append(
                    "propuesta",
                    propuesta
                );


                /* =========================================
                   BOTÓN ENVIAR
                ========================================= */

                const botonEnviar =
                    formulario.querySelector(
                        'button[type="submit"]'
                    );


                if (botonEnviar) {

                    botonEnviar.disabled = true;

                    botonEnviar.textContent =
                        "ENVIANDO...";

                }


                /* =========================================
                   ENVIAR A GOOGLE SHEETS
                ========================================= */

                fetch(
                    URL_GOOGLE_APPS_SCRIPT,
                    {
                        method: "POST",
                        body: datos
                    }
                )

                    .then(function () {

                        cerrarModal();

                        formulario.reset();


                        if (botonEnviar) {

                            botonEnviar.disabled =
                                false;

                            botonEnviar.textContent =
                                "ENVIAR SOLICITUD";

                        }


                        alert(
                            "¡RECIBIMOS TU IDEA! ✨\n\n" +

                            "Gracias por confiar en GLAM " +
                            "y contarnos sobre tu evento.\n\n" +

                            "Nuestro equipo se comunicará " +
                            "contigo dentro de las próximas " +
                            "24 horas.\n\n" +

                            "💫 NUESTRO COMPROMISO\n\n" +

                            "Si no te llamamos dentro de las " +
                            "próximas 24 horas, recibirás un " +
                            "10% de descuento en tu experiencia GLAM."
                        );

                    })

                    .catch(function (error) {

                        console.error(
                            "Error al enviar:",
                            error
                        );


                        if (botonEnviar) {

                            botonEnviar.disabled =
                                false;

                            botonEnviar.textContent =
                                "ENVIAR SOLICITUD";

                        }


                        alert(
                            "No pudimos registrar tu solicitud.\n\n" +
                            "Por favor intenta nuevamente."
                        );

                    });

            }
        );

    }

});