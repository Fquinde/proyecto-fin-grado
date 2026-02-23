// Función para configurar las físicas en la escena
export function setupPhysics(scene) {
    // Crear un plugin de físicas utilizando CannonJS
    const cnjs = new BABYLON.CannonJSPlugin();

    // Habilitar físicas en la escena con un vector de gravedad
    scene.enablePhysics(new BABYLON.Vector3(0, -0.20, 0), cnjs);

    // Habilitar colisiones en la escena
    scene.collisionsEnabled = true;
    scene.gravity = true;
}
