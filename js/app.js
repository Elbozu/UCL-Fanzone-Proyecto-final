/**
 * Script Principal de la Web de la Fan Page UEFA Champions League
 * Organizado por secciones: Estado Global, Funciones de Utilidad, Inicializacion de Paginas, Escuchadores de Eventos
 */

// ==========================================================================
// 1. ESTADO GLOBAL Y CONSTANTES
// ==========================================================================

// Lista de muestra de clubes para la pagina de Equipos
const DATOS_CLUBES = [
  {
    id: "real-madrid",
    name: "Real Madrid CF",
    titles: 15,
    country: "España",
    founded: "1902",
    stadium: "Santiago Bernabéu",
    logo: "images/Real_Madrid_CF.svg",
    desc: "El club más laureado en la historia de la competición. Conocido por sus remontadas legendarias y su dominio absoluto en las noches europeas."
  },
  {
    id: "ac-milan",
    name: "AC Milan",
    titles: 7,
    country: "Italia",
    founded: "1899",
    stadium: "San Siro",
    logo: "images/Logo_of_AC_Milan.svg",
    desc: "El gigante italiano de San Siro, caracterizado históricamente por leyendas como Maldini y Baresi, ostenta la segunda mayor cantidad de títulos continentales."
  },
  {
    id: "bayern-munich",
    name: "FC Bayern München",
    titles: 6,
    country: "Alemania",
    founded: "1900",
    stadium: "Allianz Arena",
    logo: "images/Logo_FC_Bayern_München_(2002–2017).svg",
    desc: "El gigante de Baviera, representante de la potencia y consistencia del fútbol alemán, con múltiples tripletes en su glorioso historial."
  },
  {
    id: "liverpool",
    name: "Liverpool FC",
    titles: 6,
    country: "Inglaterra",
    founded: "1892",
    stadium: "Anfield",
    logo: "images/Liverpool_FC.svg",
    desc: "El club inglés más exitoso de la competición, famoso por noches mágicas en Anfield y la milagrosa final de Estambul en 2005."
  },
  {
    id: "barcelona",
    name: "FC Barcelona",
    titles: 5,
    country: "España",
    founded: "1899",
    stadium: "Spotify Camp Nou",
    logo: "images/FC_Barcelona_(crest).svg",
    desc: "Cuna del 'Fútbol Total' y la mítica era del sextete. Han enamorado al mundo con su estilo de juego de pases y posesión."
  },
  {
    id: "ajax",
    name: "AFC Ajax",
    titles: 4,
    country: "Países Bajos",
    founded: "1900",
    stadium: "Johan Cruyff ArenA",
    logo: "images/Ajax_Amsterdam.svg",
    desc: "Leyenda del fútbol neerlandés, famoso por su academia de jóvenes talentos y por liderar el fútbol europeo en los años 70 con Johan Cruyff."
  },
   {
    id: "manchester-united",
    name: "Manchester United FC",
    titles: 3,
    country: "Inglaterra",
    founded: "1878 ",
    stadium: "Old Trafford",
    logo: "images/Manchester_United_FC_crest.svg",
    desc: "Club histórico de Inglaterra, conocido como los “Red Devils”. Destaca por su rica tradición, su enorme base de aficionados y una era dorada bajo Sir Alex Ferguson, donde ganó múltiples títulos nacionales e internacionales, incluyendo varias Champions League."
  },
  {
    id: "juventus",
    name: "Juventus FC",
    titles: 2,
    country: "Italia",
    founded: "1897",
    stadium: "Allianz Stadium",
    logo: "images/Juventus_Turin.svg",
    desc: "La 'Vecchia Signora' de Turín, uno de los clubes más prestigiosos de Italia que busca constantemente volver al trono europeo."
  },
  {
    id: "manchester-city",
    name: "Manchester City FC",
    titles: 1,
    country: "Inglaterra",
    founded: "1880",
    stadium: "Etihad Stadium",
    logo: "images/Manchester_City_FC_badge.svg",
    desc: "El gigante de Manchester que alcanzó la gloria continental de la mano de Pep Guardiola en 2023 tras un fútbol espectacular de posesión."
  }
];

// Preguntas de la Trivia interactiva (Pagina de Inicio)
const DATOS_TRIVIA = [
  {
    question: "¿Qué club ha ganado más títulos de la UEFA Champions League?",
    options: ["AC Milan", "Bayern Múnich", "Real Madrid", "Liverpool"],
    correctIndex: 2
  },
  {
    question: "¿Quién es el máximo goleador histórico de la competición?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Raúl González"],
    correctIndex: 1
  },
  {
    question: "¿En qué ciudad se obró el 'Milagro de Estambul' en la final de 2005?",
    options: ["Atenas", "Múnich", "Estambul", "Londres"],
    correctIndex: 2
  },
  {
    question: "¿Qué equipo ganó el torneo en la temporada del Triplete en 2023?",
    options: ["Real Madrid", "Inter de Milán", "Manchester City", "Bayern Múnich"],
    correctIndex: 2
  }
];

let indiceQuizActual = 0; // Que pregunta va ahora
let puntajeQuiz = 0; // Puntos acumulados
let quizRespondido = false; // Evita responder dos veces

// Clave de localStorage para los aficionados registrados, los guarda en el Navegador
const CLAVE_LOCAL_STORAGE = 'ucl_registros_aficionados';

// ==========================================================================
// 2. FUNCIONES REQUERIDAS CON PARÁMETROS Y VALORES DE RETORNO
// ==========================================================================

/**
 * Función 1: Valida si una cadena de texto tiene el formato correcto de correo
 * @param {string} correo - El correo electrónico a validar
 * @returns {boolean} - Verdadero si es válido, falso de lo contrario
 */
function validateEmail(correo) {
  /* /^[^\s@]+@[^\s@]+\.[^\s@]+$/ seria: Texto_sin_arroba_ni_espacios + @ + Texto_sin_arroba_ni_espacios + . + Texto_sin_arroba_ni_espacios.*/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Aquí se crea una Expresión Regular (Regex), que es como una plantilla o molde para buscar patrones de texto.
  return emailRegex.test(correo); // Devuelve true o false, si el correo cumple con la estructura de un correo o no
}

/**
 * Función 2: Genera estrellas visuales basadas en el número de títulos del club
 * @param {number} cantidadTitulos - Cantidad de trofeos de Champions ganados
 * @returns {string} - Código HTML con caracteres de estrella (★)
 */
function getClubStars(cantidadTitulos) {
  if (typeof cantidadTitulos !== 'number' || cantidadTitulos <= 0) {
    return '<span>-</span>';
  }
  let estrellas = '';
  // Limitar estrellas visuales a 5 para evitar desbordamientos, añadiendo el resto en texto
  const estrellasVisuales = Math.min(cantidadTitulos, 5);
  for (let i = 0; i < estrellasVisuales; i++) {
    estrellas += '★';
  }
  if (cantidadTitulos > 5) {
    estrellas += ` (+${cantidadTitulos - 5})`;
  }
  return `<span>${estrellas}</span>`;
}

/**
 * Función 3: Genera una notificación emergente con estilos y la agrega al DOM
 * @param {string} mensaje - El mensaje a mostrar al usuario
 * @param {string} tipo - Tipo de notificación ('success', 'error', 'info')
 * @returns {HTMLElement} - El elemento HTML de notificación creado
 */
function showNotification(mensaje, tipo = 'info') {
  // Buscar o crear el contenedor de notificaciones en el documento
  let contenedor = document.querySelector('.contenedor-notificaciones');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.className = 'contenedor-notificaciones';
    document.body.appendChild(contenedor);
  }

  // Crear el nodo de la notificación individual
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion ${tipo}`;
  notificacion.innerHTML = `
    <span class="notificacion-mensaje">${mensaje}</span>
    <span class="notificacion-cerrar">&times;</span>
  `;

  // Insertar la notificación en el contenedor
  contenedor.appendChild(notificacion);

  // Programar la eliminación automática de la notificación
  const temporizadorEliminar = setTimeout(() => {
    eliminarNotificacion(notificacion);
  }, 4000);

  // Escuchador de clic en el botón cerrar (x)
  notificacion.querySelector('.notificacion-cerrar').addEventListener('click', () => {
    clearTimeout(temporizadorEliminar);
    eliminarNotificacion(notificacion);
  });

  return notificacion;
}

// Función auxiliar para eliminar notificaciones con una animación de salida
function eliminarNotificacion(notificacion) {
  notificacion.style.animation = 'slideOut 0.3s ease-in forwards';
  notificacion.addEventListener('animationend', () => {
    notificacion.remove();
  });
}

// ==========================================================================
// 3. LÓGICA PRINCIPAL / INICIALIZACIÓN DE LA PÁGINA
// ==========================================================================

// Esto evita que JavaScript intente acceder a elementos que todavía no existen. el evento se dispara cuando carga todo el html
document.addEventListener('DOMContentLoaded', () => {
  // Configuración del resaltado de navegación activa
  configurarNavegacion();

  // Feedback visual en el encabezado según el desplazamiento vertical (scroll)
  window.addEventListener('scroll', () => {
    const cabecera = document.querySelector('header');
    if (window.scrollY > 20) {
      cabecera.classList.add('desplazado');
    } else {
      cabecera.classList.remove('desplazado');
    }
  });

  // Inicializar secciones según los elementos que existan en el documento actual
  if (document.getElementById('quiz-wrapper')) {
    inicializarQuiz();
  }
  if (document.getElementById('contenedor-equipos')) {
    inicializarPaginaEquipos();
  }
  if (document.getElementById('formulario-registro')) {
    inicializarPaginaRegistro();
  }
});

// Resalta el enlace activo en la barra de navegación
function configurarNavegacion() {
  const rutaActual = window.location.pathname;
  const enlacesNav = document.querySelectorAll('.nav-link');
  
  enlacesNav.forEach(enlace => {
    const href = enlace.getAttribute('href');
    // Verificar si coincide con la página actual
    if (rutaActual.endsWith(href) || (rutaActual.endsWith('/') && href === 'index.html')) {
      enlace.classList.add('active');
    } else {
      enlace.classList.remove('active');
    }
  });

  // Menú colapsable para dispositivos móviles
  const botonAlternador = document.querySelector('.nav-toggle');
  const menuNav = document.querySelector('.nav-menu');
  if (botonAlternador && menuNav) {
    botonAlternador.addEventListener('click', () => {
      botonAlternador.classList.toggle('open');
      menuNav.classList.toggle('open');
    });
    // Cerrar menú al hacer clic en cualquier enlace
    menuNav.querySelectorAll('.nav-link').forEach(enlace => {
      enlace.addEventListener('click', () => {
        botonAlternador.classList.remove('open');
        menuNav.classList.remove('open');
      });
    });
  }
}

// ==========================================================================
// 4. PÁGINA DE INICIO: LÓGICA DE LA TRIVIA (Eventos y manipulación del DOM)
// ==========================================================================

// Inicializa el quiz estableciendo los valores iniciales,
// mostrando la primera pregunta y configurando el botón
// para avanzar entre preguntas o mostrar el resultado final.
function inicializarQuiz() {
  indiceQuizActual = 0;
  puntajeQuiz = 0;
  renderizarPreguntaQuiz();

  const botonSiguiente = document.getElementById('quiz-next-btn');
  if (botonSiguiente) {
    botonSiguiente.addEventListener('click', () => {
      indiceQuizActual++;
      if (indiceQuizActual < DATOS_TRIVIA.length) {
        renderizarPreguntaQuiz();
      } else {
        renderizarResultadosQuiz();
      }
    });
  }
}

// Muestra la pregunta actual en pantalla, actualiza el marcador,
// genera dinamicamente las opciones de respuesta y asigna
// los eventos necesarios para procesar la selección del usuario.
function renderizarPreguntaQuiz() {
  quizRespondido = false;
  const datosPregunta = DATOS_TRIVIA[indiceQuizActual];
  
  const elementoPregunta = document.getElementById('quiz-question');
  const elementoOpciones = document.getElementById('quiz-options');
  const elementoTextoPuntaje = document.getElementById('quiz-score-text');
  const botonSiguiente = document.getElementById('quiz-next-btn');

  if (!elementoPregunta || !elementoOpciones) return;

  elementoPregunta.textContent = datosPregunta.question;

   // Limpiar las opciones anteriores
  elementoOpciones.innerHTML = ''; 
  botonSiguiente.style.display = 'none';

  // Actualiza la informacion de progreso y puntaje
  if (elementoTextoPuntaje) {
    elementoTextoPuntaje.innerHTML = `Pregunta: <span>${indiceQuizActual + 1}/${DATOS_TRIVIA.length}</span> | Puntos: <span>${puntajeQuiz}</span>`;
  }

  // Genera un boton para cada opcion
  datosPregunta.options.forEach((opcion, indice) => {
    const boton = document.createElement('button');
    boton.className = 'quiz-option';
    boton.textContent = opcion;
    
    // Escuchar el evento clic para procesar la respuesta seleccionada
    boton.addEventListener('click', () => {
      if (quizRespondido) return;
      procesarRespuestaQuiz(indice, boton);
    });

    elementoOpciones.appendChild(boton);
  });
}

// Evalua la respuesta seleccionada por el usuario,
// actualiza el puntaje, resalta la respuesta correcta
// e incorrecta y muestra una notificación de feedback.
function procesarRespuestaQuiz(indiceSeleccionado, botonSeleccionado) {
  quizRespondido = true;
  const datosPregunta = DATOS_TRIVIA[indiceQuizActual];
  const botonSiguiente = document.getElementById('quiz-next-btn');
  const opciones = document.querySelectorAll('.quiz-option');

   // Si respondiste bien
  if (indiceSeleccionado === datosPregunta.correctIndex) {
    botonSeleccionado.classList.add('correct');
    puntajeQuiz += 10;
    showNotification('¡Correcto! +10 puntos', 'success');
  } // Si respondiste mal
  else {
    botonSeleccionado.classList.add('wrong');
    opciones[datosPregunta.correctIndex].classList.add('correct'); // Resaltar la respuesta correcta
    showNotification('Incorrecto. La respuesta correcta está resaltada.', 'error');
  }

  // Actualizar el texto del puntaje actual
  const elementoTextoPuntaje = document.getElementById('quiz-score-text');
  if (elementoTextoPuntaje) {
    elementoTextoPuntaje.innerHTML = `Pregunta: <span>${indiceQuizActual + 1}/${DATOS_TRIVIA.length}</span> | Puntos: <span>${puntajeQuiz}</span>`;
  }

  // Mostrar el botón Siguiente
  if (botonSiguiente) {
    botonSiguiente.style.display = 'block';
    botonSiguiente.textContent = indiceQuizActual === DATOS_TRIVIA.length - 1 ? 'Ver Resultado Final' : 'Siguiente Pregunta';
  }
}

// Muestra la pantalla final del quiz con la puntuación obtenida,
// genera un mensaje personalizado según el rendimiento del usuario
// y permite reiniciar la trivia.
function renderizarResultadosQuiz() {
  const contenedor = document.getElementById('quiz-wrapper');
  if (!contenedor) return;

  const maximoPuntaje = DATOS_TRIVIA.length * 10;
  let mensajeResumen = '';
  if (puntajeQuiz === maximoPuntaje) {
    mensajeResumen = '¡Perfecto! Eres un auténtico experto de la UEFA Champions League.';
  } else if (puntajeQuiz >= maximoPuntaje / 2) {
    mensajeResumen = '¡Buen trabajo! Sabes bastante de la máxima competición europea.';
  } else {
    mensajeResumen = 'Sigue practicando, la Champions League es para los mejores.';
  }

  // Reemplazar el contenido del quiz por la pantalla de resultados
  contenedor.innerHTML = `
    <span class="quiz-badge">Resultados</span>
    <h3 class="quiz-question" style="font-size: 1.8rem; margin-top:20px;">¡Trivia Completada!</h3>
    <div style="text-align: center; margin-bottom: 30px;">
      <p style="font-size: 1.25rem; font-weight: 700; color: var(--color-accent); margin-bottom: 10px;">
        Puntuación Final: ${puntajeQuiz} / ${maximoPuntaje} puntos
      </p>
      <p style="color: var(--text-muted); font-size: 0.95rem;">${mensajeResumen}</p>
    </div>
    <button id="quiz-restart-btn" class="btn btn-primary" style="display: block; width: 100%;">Intentar de nuevo</button>
  `;

  // Reiniciar la trivia recargando la página
  document.getElementById('quiz-restart-btn').addEventListener('click', () => {
    // Recargar la página para reiniciar los valores de la trivia
    location.reload();
  });
}

// ==========================================================================
// 5. PAGINA DE EQUIPOS: RENDERIZADO, FILTRADO Y MODAL DE DETALLES
// ==========================================================================

// Inicializa la página de equipos configurando el renderizado inicial,
// la búsqueda, los filtros por categoría y los eventos del modal.
function inicializarPaginaEquipos() {
  const contenedor = document.getElementById('contenedor-equipos');
  const buscadorInput = document.getElementById('team-search');
  const botonesFiltro = document.querySelectorAll('.filter-btn');

  if (!contenedor) return;

  // Renderizado inicial de todos los equipos
  renderizarEquipos(DATOS_CLUBES);

  // Escuchador de entrada de texto para buscar (Evento 2 - input)
  if (buscadorInput) {
    buscadorInput.addEventListener('input', (e) => {
      const consulta = e.target.value.toLowerCase().trim();
      const filtroActivo = document.querySelector('.filter-btn.active').dataset.filter;
      
      const filtrados = DATOS_CLUBES.filter(club => {
        const coincideBusqueda = club.name.toLowerCase().includes(consulta) || club.stadium.toLowerCase().includes(consulta);
        const coincideCategoria = filtroActivo === 'all' || club.country === filtroActivo;
        return coincideBusqueda && coincideCategoria;
      });
      renderizarEquipos(filtrados);
    });
  }

  // Escuchador de clics en los botones de filtrado, filtra por pais/categoria (Evento 1 - click)
  botonesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const valorFiltro = btn.dataset.filter;
      const consulta = buscadorInput ? buscadorInput.value.toLowerCase().trim() : '';

      const filtrados = DATOS_CLUBES.filter(club => {
        const coincideCategoria = valorFiltro === 'all' || club.country === valorFiltro;
        const coincideBusqueda = club.name.toLowerCase().includes(consulta);
        return coincideCategoria && coincideBusqueda;
      });
      renderizarEquipos(filtrados);
    });
  });

  // Configuración de eventos para cerrar la ventana modal
  const cerrarModal = document.getElementById('modal-close');
  const capaModal = document.getElementById('modal-overlay');
  
  if (cerrarModal && capaModal) {
    cerrarModal.addEventListener('click', () => {
      capaModal.classList.remove('active');
    });
    // Cerrar al hacer clic fuera del recuadro del modal
    capaModal.addEventListener('click', (e) => {
      if (e.target === capaModal) {
        capaModal.classList.remove('active');
      }
    });
  }
}

// Genera dinámicamente las tarjetas de los clubes y las muestra
// en pantalla según los filtros o búsquedas aplicados.
function renderizarEquipos(equipos) {
  const contenedor = document.getElementById('contenedor-equipos');
  if (!contenedor) return;

   // Mostrar mensaje cuando no existen resultados
  if (equipos.length === 0) {
    contenedor.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px 0;">
        No se encontraron clubes con los criterios de búsqueda.
      </div>
    `;
    return;
  }

  contenedor.innerHTML = ''; // Limpiar el contenido anterior

  equipos.forEach(club => {
    // Crear el contenedor de la tarjeta del club
    const tarjeta = document.createElement('div');
    tarjeta.className = 'team-card';
    tarjeta.dataset.id = club.id;

    // Llamada a la funcion getClubStars que tiene la representacion visual de los titulos del club
    const estrellasHtml = getClubStars(club.titles);

    tarjeta.innerHTML = `
      <div class="team-logo-container">
        <img src="${club.logo}" alt="Logotipo de ${club.name}" loading="lazy">
      </div>
      <h3 class="team-name">${club.name}</h3>
      <p class="team-country">${club.country}</p>
      <div class="team-stars">${estrellasHtml}</div>
    `;

    // Clic en la tarjeta para abrir el modal con los detalles
    tarjeta.addEventListener('click', () => {
      abrirModalClub(club);
    });

    contenedor.appendChild(tarjeta);
  });
}

// Carga la información del club seleccionado en el modal
// y lo muestra al usuario.
function abrirModalClub(club) {
  const capaModal = document.getElementById('modal-overlay');
  if (!capaModal) return;

  // Insertar datos dinamicamente en el modal
  document.getElementById('modal-logo').src = club.logo;
  document.getElementById('modal-logo').alt = `Escudo de ${club.name}`;
  document.getElementById('modal-title').textContent = club.name;
  document.getElementById('modal-country').textContent = `${club.country} | Fundado en ${club.founded}`;
  document.getElementById('modal-titles-count').textContent = club.titles;
  document.getElementById('modal-stadium').textContent = club.stadium;
  document.getElementById('modal-desc').textContent = club.desc;

  // Mostrar el modal agregando la clase active
  capaModal.classList.add('active');
}

// ==========================================================================
// 6. PAGINA DE REGISTRO: VALIDACION DE FORMULARIO Y ALMACENAMIENTO JSON (Eventos y DOM)
// ==========================================================================

// Configura el formulario de registro de aficionados
function inicializarPaginaRegistro() {
   // Obtener los datos del formulario
  const formulario = document.getElementById('formulario-registro');
  const inputNombre = document.getElementById('fan-name');
  const inputCorreo = document.getElementById('fan-email');
  const selectClub = document.getElementById('fan-club');
  const inputLema = document.getElementById('fan-slogan');
  const botonExportar = document.getElementById('export-json');

   // Salir si el formulario no existe
  if (!formulario) return;

  // Renderizar la lista inicial de registros guardados
  renderizarRegistros();

  // Validaciones en tiempo real sobre los campos del formulario (Evento 2 - input)
  inputNombre.addEventListener('input', () => validarCampo(inputNombre, inputNombre.value.trim().length >= 3));
  inputCorreo.addEventListener('input', () => validarCampo(inputCorreo, validateEmail(inputCorreo.value.trim())));
  selectClub.addEventListener('change', () => validarCampo(selectClub, selectClub.value !== ''));
  inputLema.addEventListener('input', () => validarCampo(inputLema, inputLema.value.trim().length >= 10));

  // Manejar el envío del formulario (Evento 3 - submit)
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Comprobar la validez de todos los campos
    const esNombreValido = inputNombre.value.trim().length >= 3;
    const esCorreoValido = validateEmail(inputCorreo.value.trim());
    const esClubValido = selectClub.value !== '';
    const esLemaValido = inputLema.value.trim().length >= 10;

    validarCampo(inputNombre, esNombreValido);
    validarCampo(inputCorreo, esCorreoValido);
    validarCampo(selectClub, esClubValido);
    validarCampo(inputLema, esLemaValido);

    if (esNombreValido && esCorreoValido && esClubValido && esLemaValido) {
      // Estructurar los datos del nuevo aficionado
      const nuevoAficionado = {
        id: Date.now().toString(),
        name: inputNombre.value.trim(),
        email: inputCorreo.value.trim(),
        club: selectClub.value,
        slogan: inputLema.value.trim(),
        date: new Date().toLocaleDateString()
      };

      // Guardar el registro y limpiar el formulario
      guardarRegistro(nuevoAficionado);
      showNotification('¡Registro completado! Te has unido al club de fans.', 'success');
      
      // Restablecer el formulario y los bordes visuales de validación
      formulario.reset();
      [inputNombre, inputCorreo, selectClub, inputLema].forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
    } else {
      showNotification('Por favor, corrige los campos erróneos en el formulario.', 'error');
    }
  });

  // Exportar datos como JSON (Evento 1 - click)
  if (botonExportar) {
    botonExportar.addEventListener('click', () => {
      const registros = obtenerRegistros();
      if (registros.length === 0) {
        showNotification('No hay datos guardados para exportar.', 'error');
        return;
      }
      const cadenaJson = JSON.stringify(registros, null, 2);
      descargarArchivoJSON('registrations.json', cadenaJson);
      showNotification('Archivo registrations.json descargado con éxito.', 'success');
    });
  }
}

// Aplica clases CSS correspondientes a la validación de un campo o Muestra visualmente si un campo es válido o no
function validarCampo(elementoInput, esValido) {
  const elementoMensaje = elementoInput.nextElementSibling;
  
  if (esValido) {
    elementoInput.classList.remove('invalid');
    elementoInput.classList.add('valid');
    if (elementoMensaje && elementoMensaje.classList.contains('validation-msg')) {
      elementoMensaje.style.display = 'none';
    }
  } else {
    elementoInput.classList.remove('valid');
    elementoInput.classList.add('invalid');
    if (elementoMensaje && elementoMensaje.classList.contains('validation-msg')) {
      elementoMensaje.style.display = 'block';
    }
  }
}

// Obtiene los datos acumulados de localStorage
function obtenerRegistros() {
  const guardados = localStorage.getItem(CLAVE_LOCAL_STORAGE);
  return guardados ? JSON.parse(guardados) : [];
}

// Guarda un aficionado registrado en localStorage e inicia el re-renderizado
function guardarRegistro(nuevoAficionado) {
  const registros = obtenerRegistros();
  registros.push(nuevoAficionado);
  localStorage.setItem(CLAVE_LOCAL_STORAGE, JSON.stringify(registros));
  renderizarRegistros();
}

// Renderiza visualmente la lista de aficionados y gestiona su eliminación (manipulación del DOM)
function renderizarRegistros() {
  const lista = document.getElementById('registrations-list');
  if (!lista) return;

  const registros = obtenerRegistros();

  if (registros.length === 0) {
    lista.innerHTML = `<div class="no-registrations">Aún no hay aficionados registrados. ¡Sé el primero!</div>`;
    return;
  }

  lista.innerHTML = ''; // Limpiar la lista anterior


  // Crear una tarjeta para cada aficionado
  registros.forEach(aficionado => {
    const item = document.createElement('div');
    item.className = 'registration-item';
    item.dataset.id = aficionado.id;

    // Buscar los detalles del club seleccionado para mostrar una etiqueta limpia
    const clubSeleccionado = DATOS_CLUBES.find(c => c.id === aficionado.club);
    const nombreClub = clubSeleccionado ? clubSeleccionado.name : aficionado.club;

   
    item.innerHTML = `
      <div class="reg-name">${aficionado.name}</div>
      <div class="reg-club">Aficionado del ${nombreClub}</div>
      <div class="reg-slogan">"${aficionado.slogan}"</div>
      <span class="reg-delete" title="Eliminar registro">&times;</span>
    `;

    // Clic para eliminar un registro individual (manipulación del DOM)
    item.querySelector('.reg-delete').addEventListener('click', () => {
      eliminarRegistro(aficionado.id);
    });

    lista.appendChild(item);
  });
}

// Elimina el registro del listado de memoria y actualiza localStorage
function eliminarRegistro(id) {
  let registros = obtenerRegistros();
  registros = registros.filter(r => r.id !== id);
  localStorage.setItem(CLAVE_LOCAL_STORAGE, JSON.stringify(registros));
  
  // Ejecutar animación de salida y remover elemento del DOM
  const tarjeta = document.querySelector(`.registration-item[data-id="${id}"]`);
  if (tarjeta) {
    tarjeta.style.animation = 'slideOut 0.3s ease-in forwards';
    tarjeta.addEventListener('animationend', () => {
      renderizarRegistros();
    });
  }
  showNotification('Registro eliminado del archivo local.', 'info');
}

/**
 * Fuerza al navegador a descargar una cadena de texto como un archivo en disco
 * @param {string} nombreArchivo - Nombre del archivo de salida
 * @param {string} texto - Contenido en cadena (JSON estructurado)
 */
function descargarArchivoJSON(nombreArchivo, texto) {
  const blob = new Blob([texto], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  
  // Limpieza de objetos de la memoria para evitar fugas de rendimiento
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
