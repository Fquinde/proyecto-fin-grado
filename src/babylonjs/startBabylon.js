import { createScene } from "./scene/scene.js";

const canvas = document.getElementById("renderCanvas"); // Obtén el elemento canvas
const engine = new BABYLON.Engine(canvas, true); // Genera el motor 3D de BABYLON
const scene = await createScene(canvas, engine); //llama a la función createScene(); 

// Registra un bucle de renderización para actualizar y mostrar la escena continuamente
engine.runRenderLoop(function () {
    scene.render();
});

// Observa eventos de redimensionamiento del navegador/canvas
window.addEventListener("resize", function () {
    engine.resize();
});