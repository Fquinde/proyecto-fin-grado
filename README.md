# ✈■ Simulador de Vuelo WebXR — Proyecto Fin de Grado
Simulador de vuelo interactivo desarrollado con Babylon.js y WebXR, diseñado para ejecutarse dir
ectamente en el navegador y ser compatible con dispositivos de realidad extendida (XR) como Met
a Quest 3 y Pico 4.
Este proyecto forma parte de un Trabajo de Fin de Grado (TFG) enfocado en el desarrollo de expe
riencias inmersivas web y simulación interactiva en entornos 3D.
---
# ■ Demo
https://fquinde.github.io/proyecto-fin-grado/
---
# ■ Descripción
El proyecto implementa un simulador de vuelo 3D accesible desde navegador, permitiendo:
- Visualización de entorno 3D en tiempo real
- Control de cámara y movimiento
- Interacción en modo inmersivo XR
- Compatibilidad con gafas VR/MR standalone
- Experiencia ejecutable sin instalación
El simulador está construido completamente en cliente usando tecnologías web modernas y el mot
or gráfico Babylon.js, integrando soporte WebXR para realidad virtual y aumentada.
---
# ■ Compatibilidad XR
Dispositivos probados:
- Meta Quest 3
- Pico 4
Modos soportados:
- VR inmersivo
- AR inmersivo (según dispositivo)
- Modo pantalla (desktop/mobile)
---
# ■ Tecnologías utilizadas
- Babylon.js
- WebXR API
- JavaScript (ES6)
-  HTML5
- CSS3
---
## 🗂️ Estructura del proyecto

```
project/
├── assets/
│   ├── ground/                 → carpeta dedicada a recursos del suelo/terreno (texturas, mapas de altura, splatmaps, etc.)
│   ├── image/                  → carpeta para imágenes 2D no relacionadas con texturas 3D (posiblemente UI, iconos, logos, fondos 2D, pantallazos…)
│   ├── models/                 → carpeta con modelos 3D importables (.glb, .gltf, .fbx, .obj…)
│   ├── sounds/                 → carpeta con archivos de sonido y música (mp3, wav, ogg…)
│   ├── style/                  → carpeta con archivos de estilos (CSS, SCSS o similar para la interfaz HTML)
│   └── textures/
│       ├── mountain-texture.jpg   → textura principal para montañas
│       └── waterbump.png          → mapa de normales/bump para simular agua con ondulaciones
│
├── src/
│   └── babylonjs/
│       ├── controller/            → lógica de controles de usuario (teclado, ratón, gamepad, touch…)
│       ├── initXRExperience/      → código específico para inicializar y gestionar modo WebXR (entrada/salida de sesión, manejo de controladores XR…)
│       ├── model3D/
│       │   ├── Aircraft/          → todo lo relacionado con la aeronave (modelo, animaciones, behaviours, sonidos asociados…)
│       │   ├── Airport/           → modelo y lógica del aeropuerto (pista, terminal, hangares…)
│       │   ├── Mountain/          → modelo y posiblemente colliders/zonas de la montaña
│       │   ├── Ocean/             → lógica y/o geometría del océano (plano con shader de agua, reflejos…)
│       │   └── Skybox/            → configuración del cielo (6 texturas, procedural, .env…)
│       ├── physics/               → inicialización del motor de física, creación de cuerpos rígidos, colliders, gravedad, eventos de colisión…
│       └── scene/                 → creación y configuración general de la escena Babylon (luces, sombras, cámara base, ground, sky, post-procesos…)
│
│   └── startBabylon.js            → archivo principal de entrada: crea el engine, canvas, escena inicial, arranca el render loop y carga lo demás
│
├── Loading/
│   ├── finish.js                  → lógica que se ejecuta cuando termina la carga (oculta loader, muestra menú o inicia experiencia)
│   ├── loading.js                 → lógica de la pantalla de carga (barra de progreso, animaciones, precarga de assets…)
│   └── (posiblemente otros archivos relacionados con estados de carga)
│
├── index.html                     → página HTML principal del proyecto
└── index2.html                    → segunda página HTML (probable variante de prueba, debug, sin XR, mobile, etc.)
```
---
# ■ Ejecución
## Opción 1 — Navegador (rápido)
Abrir:
index.html
## Opción 2 — Servidor local (recomendado para WebXR)
Python:
python -m http.server
Node:
npx serve
Luego abrir:
http://localhost:8000
---
# ■ Uso en gafas XR
1. Abrir la URL en el navegador del visor (Meta Browser / Pico Browser)
2. Pulsar botón ENTRAR XR / VR
3. Interactuar en entorno inmersivo
---
# ■ Controles
Desktop:
Movimiento de aeronave:

- W → avanzar / acelerar
- S → retroceder / desacelerar
- A → girar a la izquierda (yaw)
- D → girar a la derecha (yaw)

Control de velocidad:

- Shift → aumentar velocidad (throttle)
- Space → frenar / reducir velocidad

Rotación adicional:

- Q → rotación izquierda (roll)
- E → rotación derecha (roll)

Cámara:

- Ratón → orientación de vista
XR:
- Controladores VR → interacción
- Movimiento de cabeza → orientación
- Espacio físico → desplazamiento (room-scale)
---
# ■ Objetivos académicos
- Desarrollo de simulación 3D en navegador
- Integración de WebXR en aplicaciones web
- Implementación de interacción inmersiva
- Compatibilidad con dispositivos XR standalone
- Arquitectura modular en Babylon.js
- Renderizado en tiempo real
---
# ■ Características técnicas
- Renderizado 3D en tiempo real
- Cámara XR con transición dinámica
- Escena optimizada para WebXR
- Interfaz 3D interactiva
- Arquitectura modular ES6
- Ejecución sin instalación
