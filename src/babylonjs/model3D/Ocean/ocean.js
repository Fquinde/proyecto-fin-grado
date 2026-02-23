// Función para crear un océano en la escena
const ocean = function (scene) {
    // Crear y aplicar un material estándar con textura al terreno
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 7000, height: 7000, subdivisions: 15 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/waterbump.png", scene);
    // Cambiar el color del terreno para que sea más azul
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.7, 1.0); // Color más azul
    groundMaterial.specularColor = new BABYLON.Color3(0.5, 0.7, 1.0); // Reflejos azulados
    ground.material = groundMaterial;

}

// Exportar la función ocean para que pueda ser importada en otros módulos
export default ocean;
