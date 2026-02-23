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
# ■■ Estructura del proyecto
proyecto-fin-grado/
■
■■■ index.html # Escena principal XR
■■■ index2.html # Variante / pruebas XR
■
■■■ src/
■ ■■■ scene/ # Configuración de escena 3D
■ ■■■ camera/ # Control de cámara y XR
■ ■■■ input/ # Controles de usuario
■ ■■■ objects/ # Elementos 3D del simulador
■ ■■■ main.js # Punto de entrada
■
■■■ assets/
■ ■■■ models/ # Modelos 3D
■ ■■■ textures/ # Texturas
■ ■■■ ui/ # Recursos interfaz
■
■■■ README.md
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
