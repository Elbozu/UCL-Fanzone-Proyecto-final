# UCL Fanzone ⚽

¡Bienvenido a **UCL Fanzone**! Una plataforma web interactiva e independiente diseñada especialmente para los apasionados de la UEFA Champions League. Este sitio permite a los usuarios explorar la historia de los clubes más laureados de Europa, poner a prueba sus conocimientos con una trivia dinámica y registrarse en un club de fans con exportación de datos en tiempo real.

Este proyecto está desarrollado con tecnologías web estándar (**HTML5, CSS3 y JavaScript**), ofreciendo una interfaz moderna, responsiva y con efectos visuales atractivos (como tarjetas con estilo *glassmorphism*).

---

## 🚀 Características Principales

El proyecto se divide en tres secciones principales completamente interactivas:

* **Inicio (`index.html`):** Presentación del sitio con un diseño inmersivo. Incluye una sección informativa sobre los elementos icónicos del torneo (La Orejona, el Himno, las Estrellas) y una **Trivia Express** interactiva gestionada dinámicamente con JavaScript.
* **Equipos (`equipos.html`):** Un catálogo completo de "Los Reyes de Europa". Cuenta con un sistema de filtrado por país (España, Inglaterra, Italia, Alemania, Países Bajos) y un buscador en tiempo real. Al hacer clic en cualquier tarjeta, se despliega un **diálogo modal** con estadísticas detalladas del club (títulos, estadio, descripción).
* **Registro Fans (`registro.html`):** Un formulario de inscripción completo con validación interactiva nativa (nombre, correo electrónico, club favorito y lema). Los usuarios registrados se muestran dinámicamente en una lista integrada y se incluye la opción de **exportar el registro de aficionados en formato JSON**.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica avanzada para garantizar una buena accesibilidad (`<header>`, `<main>`, `<nav>`, `<section>`, `<dialog>`).
* **CSS3:** Estilos personalizados, diseño adaptivo mediante Flexbox y CSS Grid, variables globales para una fácil gestión de temas y efectos visuales avanzados (*glassmorphism*, transiciones).
* **JavaScript (Vanilla JS):** Lógica dinámica del lado del cliente encargada de:
    * La carga y actualización de las preguntas de la trivia.
    * El motor de búsqueda y filtros de la sección de equipos.
    * La manipulación del DOM para abrir/cerrar el modal de detalles.
    * La validación del formulario y la generación/descarga del archivo JSON con los datos de los usuarios.

---

## 📂 Estructura del Proyecto

El código está organizado de la siguiente manera:

```text
├── index.html          # Página de inicio y Trivia interactiva
├── equipos.html        # Buscador, filtros y modal de equipos históricos
├── registro.html       # Formulario de registro y lista de aficionados
├── css/
│   └── style.css       # Hoja de estilos compartida (Layout, componentes, media queries)
├── js/
│   └── app.js          # Lógica de JavaScript (Trivia, filtros, modal, formulario y JSON)
└── images/
    └── logo.svg        # Logotipo del sitio en formato vectorial
```

## 🔧 Instalación y Vista Local

Para ejecutar este proyecto de forma local, no necesitas instalar ningún framework ni base de datos externa:

Clona o descarga este repositorio en tu máquina local.

Asegúrate de mantener la estructura de carpetas (css/, js/, e images/).

Abre el archivo index.html en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

💡 Nota: Para una mejor experiencia de desarrollo y asegurar que algunas rutas relativas funcionen a la perfección, se recomienda abrir el proyecto utilizando la extensión Live Server en Visual Studio Code o cualquier servidor web local.

## 📜 Créditos y Derechos

Desarrollador: Desarrollado con pasión futbolística por Sandy Jr Perez Mendoza (2026).

## Aviso Legal: Esta es una plataforma independiente con fines educativos y de entretenimiento. Todos los derechos del logo oficial y marcas registradas pertenecen a la UEFA.

