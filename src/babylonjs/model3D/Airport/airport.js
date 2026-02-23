// Exporta una función llamada "airport" que toma un parámetro llamado "scene".
export function airport(scene) {
    // La función ImportMesh de Babylon.js carga un modelo 3D desde un archivo "airport.glb" que lo busca en assets y agarra el nombre.
    // El primer parámetro (cadena vacía "") indica que se cargarán todas las mallas y esqueletos disponibles.
    BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "airport.glb", scene, function (meshes) {

        // Ajusta la escala de la malla en los ejes x, y, y z.
        const mesh = meshes[0]
        mesh.scaling.x = 0.015;
        mesh.scaling.y = 0.120;
        mesh.scaling.z = 0.015;

        // Establece la posición de la malla en los ejes x, y, y z.
        mesh.position.x = 1.5;
        mesh.position.y = 330;
        mesh.position.z = -3100;

        // Rota la malla alrededor del eje y por un ángulo de 45 grados (Math.PI / 4).
        mesh.rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
        mesh.checkCollisions = true


    });
}