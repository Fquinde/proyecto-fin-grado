// ESTILOS PANTALLA DE CARGA

// Crear un elemento <style>
const style = document.createElement('style');
style.type = 'text/css';

// Definir el CSS como una cadena
const css = `
    /* Loader */
    #finish {
        z-index: 200;
        position: absolute;
        width: 100%;
        height: 100vh;
        left: 0%;
        top: 0%;
        background: #000000;

    }

    #loadingText {
        position: absolute;
        color: white;
        display: inline-block;
        box-sizing: border-box;
        text-align: center;
        font-size: x-small;
        font-size: 2em; /* Tamaño de la fuente aumentado */

        width: 100%;
        top: 40%;
        left: 50%;
        height: 50px;
        transform: translate(-50%, -50%);
        margin-top: 40px;
        letter-spacing: 0.5rem;
    }

    .loader {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 48px;
        height: 48px;
        display: inline-block;
        position: relative;
    }

    .loader::after,
    .loader::before {
        content: '';
        box-sizing: border-box;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 2px solid #FFF;
        position: absolute;
        left: 0;
        top: 0;
        animation: animloader 2s linear infinite;
    }

    .loader::after {
        animation-delay: 1s;
    }

    @keyframes rotar {
        0% {
            transform: rotateY(0deg) rotateX(0deg);
        }

        50% {
            transform: rotateY(360deg) rotateX(360deg);
        }

        100% {
            transform: rotateY(0deg) rotateX(0deg);
        }
    }


    .cubo {
        height: 60%;
        transform-style: preserve-3d;
        animation: rotar 8s linear infinite;
    }

    .cubo>span {
        position: absolute;
        width: 4em;
        height: 4em;
        border: 2px solid white;
        box-shadow: inset 0px 0px 15px 5px rgba(67, 195, 225, 0.2), 0px 0px 40px 1px rgba(67, 195, 255, 0.15);
        border-radius: 4px;
    }

    .cubo>span:nth-child(1) {
        transform: rotateY(90deg) translateZ(2em);
    }

    .cubo>span:nth-child(2) {
        transform: rotateY(90deg) translateZ(-2em);
    }

    .cubo>span:nth-child(3) {
        transform: rotateY(90deg) translateZ(-2em);
    }

    .cubo>span:nth-child(4) {
        transform: rotateY(90deg) translateZ(2em);
    }

    .cubo>span:nth-child(5) {
        transform: translateZ(-2em);
    }

    .cubo>span:nth-child(6) {
        transform: translateZ(2em);
    }
`;

// Agregar el CSS al elemento <style>
style.appendChild(document.createTextNode(css));

// Agregar el elemento <style> al <head> del documento
document.head.appendChild(style);

// Creando pantalla de carga

const windowLoading = document.getElementById("finish")

windowLoading.innerHTML = `
    <h1 id="loadingText" class="font-weight-light" style="display: block;">SIMULACIÓN  ACABADA </h1>
    <div class="cubo">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
`;